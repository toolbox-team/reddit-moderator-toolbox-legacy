function commentlock() {
    var self = new TB.Module('Comment Lock');
    self.shortname = 'CommentLock';

    //Default settings
    self.settings['enabled']['default'] = true;


    self.init = function() {
        if (TBUtils.isModmail) {
            return;
        }
        if (!TB.utils.isMod) {
                return;
        }

        $('body').on('click', '.comment-lock-button', async function (event) {
            var $lockButton = $(event.target);

            var action = $lockButton.attr('tb-action');
            var info = TB.utils.getThingInfo(this, true),
            data = 'id='+info.id;
            try{
                await TBUtils.apiOauthPOST('api/'+action,data);
                var newAction = action == 'lock' ? 'unlock' : 'lock';
                $lockButton.attr('tb-action', newAction);
                $lockButton.text(newAction);
            }
            catch(error){
                self.log(`Error toggling lock on comment: ${error}`);
            }
        });

        // NER support.
        window.addEventListener('TBNewThings', function () {
            self.run();
        });

        self.run();
    };

    self.processComment = function (comment) {
        var $comment = $(comment);
        if (!$comment.hasClass('lock-button')) {
        // Add the class so we don't add buttons twice.
            $comment.addClass('lock-button');
            var action = 'lock';
            if($comment.find('.locked-tagline').length > 0){
                action = 'unlock';
            }
           
            $comment.find('ul.buttons li:last')
                .after(`<li><a href="javascript:;" tb-action="${action}" class="comment-lock-button">${action}</a></li>`)
        }
    };

    // need this for RES NER support
    self.run = function () {

        var $comments = $('div.comment:not(.lock-button)');
        TB.utils.forEachChunked($comments, 15, 650, self.processComment);
    };


    TB.register_module(self);
}

(function() {
    window.addEventListener('TBModuleLoaded', function () {
        commentlock();
    });
})();
