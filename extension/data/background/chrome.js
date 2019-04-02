/**
 * Retrieves the user's OAuth tokens from cookies.
 * @param {number?} [tries=1] Number of tries to get the token (recursive)
 * @returns {Promise<Object>} An object with properties `accessToken`,
 * `refreshToken`, `scope`, and some others
 */
function getOAuthTokens(tries = 1) {
    return new Promise((resolve, reject) => {
        // This function will fetch the cookie and if there is no cookie attempt to create one by visiting modmail.
        // http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
        chrome.cookies.get({url: 'https://www.reddit.com', name: 'token'}, rawCookie => {
            // If no cookie is returned it is probably expired and we will need to generate a new one.
            // Instead of trying to do the oauth refresh thing ourselves we just do a GET request for modmail.
            // We trie this three times, if we don't have a cookie after that the user clearly isn't logged in.
            if (!rawCookie && tries < 3) {
                $.get('https://mod.reddit.com/mail/all').done(function(data) {
                    console.log('data:', data);
                    // Ok we have the data, let's give this a second attempt.
                    getOAuthTokens(tries++).then(resolve);
                });
            } else if (!rawCookie && tries > 2) {
                reject(new Error('user not logged into new modmail'));
            } else {
                console.log('raw cookie:', rawCookie);
                // The cookie we grab has a base64 encoded string with data. Sometimes is invalid data at the end.
                // This RegExp should take care of that.
                const invalidChar = new RegExp('[^A-Za-z0-9+/].*?$');
                const base64Cookie = rawCookie.value.replace(invalidChar, '');
                const tokenData = atob(base64Cookie);
                resolve(JSON.parse(tokenData));
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);

    // Request to reload the extension. Let's do so.
    if(request.action === 'tb-reload') {
        console.log('reloading');
        chrome.runtime.reload();
        console.log('reloaded');
        sendResponse();
    }

    if(request.action === 'tb-global') {
        console.log('global event');
        const message = {
            action: request.globalEvent,
            payload: request.payload
        };
        chrome.tabs.query({}, function(tabs) {
            for (let i=0; i<tabs.length; ++i) {
                if(sender.tab.id !== tabs[i].id) {
                    chrome.tabs.sendMessage(tabs[i].id, message);
                }
            }
        });
        // return true; // disabled because we don't send a response (mistake?)
    }

    if(request.action === 'tb-send-oauth-request') {
        const {url, method, data} = request;
        getOAuthTokens().then(tokens => {
            $.ajax({
                url,
                method,
                data,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', `bearer ${tokens.accessToken}`);
                },
            }).then((data, textStatus, jqXHR) => {
                sendResponse({data, textStatus, jqXHR});
            }, (jqXHR, textStatus, errorThrown) => {
                sendResponse({jqXHR, textStatus, errorThrown});
            });
        }).catch(error => {
            sendResponse(error);
        });
        return true;
    }
});
