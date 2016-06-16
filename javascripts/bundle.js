/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _ChatApp = __webpack_require__(4);
	
	var _ChatApp2 = _interopRequireDefault(_ChatApp);
	
	var _Storage = __webpack_require__(108);
	
	var _Storage2 = _interopRequireDefault(_Storage);
	
	var _Settings = __webpack_require__(109);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _EventBus = __webpack_require__(110);
	
	var _EventBus2 = _interopRequireDefault(_EventBus);
	
	var _ExtensionSync = __webpack_require__(111);
	
	var _ExtensionSync2 = _interopRequireDefault(_ExtensionSync);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	(function loadApp() {
		// Don't run on reddit API pages such as the oauth login page
		if (window.location.href.indexOf('reddit.com/api/') > -1 || window.location.href.indexOf('reddit.com/login') > -1) {
			return;
		}
	
		var body = document.querySelector('body');
		var extension_detected = false;
		var extension = null;
	
		// The extension adds an __ocext to the body, remove it as it's only needed
		// for us to detect the precense of the extension.
		if (body.getAttribute('__ocext')) {
			body.removeAttribute('__ocext');
			extension_detected = true;
		}
	
		// Lets not swallow all errors. This causes headaches
		m.deferred.onerror = function (err) {
			console.error(err.stack);
		};
	
		var event_bus = initEventBus();
		var app_state = null;
	
		initState(event_bus).then(function (state) {
			app_state = state;
		}).then(initUi);
	
		function initUi() {
			var $app = $('<div>').appendTo($('#chat'));
			m.mount($app[0], Helpers.subModule(_ChatApp2.default, {
				bus: event_bus,
				state: app_state,
				has_extension: extension_detected
			}));
		}
	
		function initEventBus() {
			var event_bus = new _EventBus2.default();
			event_bus.on('all', function (event_name) {
				//console.log('[event bus] ' + event_name);
			});
	
			return event_bus;
		}
	
		function initState(bus) {
			var deferred = m.deferred();
	
			// Keep application state in one place so that page refreshing keeps
			// the most important things consistent (minimised, active channel, etc)
			var state_obj = _Storage2.default.get('oc-state');
			if ((typeof state_obj === 'undefined' ? 'undefined' : _typeof(state_obj)) !== 'object') {
				state_obj = {
					// is_open = render the whole app. false = minimised
					is_open: true,
	
					// Current subscribed channels
					channel_list: [],
	
					// Active channel name
					active_channel: '',
	
					// state of the sidebar
					is_sidebar_open: true
				};
			}
	
			var state = new _Settings2.default(state_obj);
			var state_fully_loaded = false;
			state.onChange = function (changed, new_value, old_value, values) {
				//console.log('state.onChange()', changed, new_value, old_value);
				// We only want to deal with state changes once it has been fully loaded as
				// the extension may modify/sync it's state first
				if (!state_fully_loaded) {
					return;
				}
	
				// If we're syncing state from the extension, don't save it to storage yet.
				// It will be stored when the page is closed or refreshed
				if (changed === 'channel_list' && extension && extension.is_syncing) {} else {
					_Storage2.default.set('oc-state', values);
				}
	
				bus.trigger('state.change', changed, new_value, old_value, values);
			};
	
			if (extension_detected) {
				extension = new _ExtensionSync2.default(state, bus, body);
				extension.init(function () {
					state_fully_loaded = true;
					deferred.resolve(state);
				});
			} else {
				state_fully_loaded = true;
				deferred.resolve(state);
			}
	
			return deferred.promise;
		}
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(m, module) {;(function (global, factory) { // eslint-disable-line
		"use strict"
		/* eslint-disable no-undef */
		var m = factory(global)
		if (typeof module === "object" && module != null && module.exports) {
			module.exports = m
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return m }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
		} else {
			global.m = m
		}
		/* eslint-enable no-undef */
	})(typeof window !== "undefined" ? window : {}, function (global, undefined) { // eslint-disable-line
		"use strict"
	
		m.version = function () {
			return "v0.2.3"
		}
	
		var hasOwn = {}.hasOwnProperty
		var type = {}.toString
	
		function isFunction(object) {
			return typeof object === "function"
		}
	
		function isObject(object) {
			return type.call(object) === "[object Object]"
		}
	
		function isString(object) {
			return type.call(object) === "[object String]"
		}
	
		var isArray = Array.isArray || function (object) {
			return type.call(object) === "[object Array]"
		}
	
		function noop() {}
	
		var voidElements = {
			AREA: 1,
			BASE: 1,
			BR: 1,
			COL: 1,
			COMMAND: 1,
			EMBED: 1,
			HR: 1,
			IMG: 1,
			INPUT: 1,
			KEYGEN: 1,
			LINK: 1,
			META: 1,
			PARAM: 1,
			SOURCE: 1,
			TRACK: 1,
			WBR: 1
		}
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame
	
		// self invoking function needed because of the way mocks work
		function initialize(mock) {
			$document = mock.document
			$location = mock.location
			$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
			$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
		}
	
		// testing API
		m.deps = function (mock) {
			initialize(global = mock || window)
			return global
		}
	
		m.deps(global)
	
		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		function parseTagAttrs(cell, tag) {
			var classes = []
			var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
			var match
	
			while ((match = parser.exec(tag))) {
				if (match[1] === "" && match[2]) {
					cell.tag = match[2]
				} else if (match[1] === "#") {
					cell.attrs.id = match[2]
				} else if (match[1] === ".") {
					classes.push(match[2])
				} else if (match[3][0] === "[") {
					var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
					cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" : true)
				}
			}
	
			return classes
		}
	
		function getVirtualChildren(args, hasAttrs) {
			var children = hasAttrs ? args.slice(1) : args
	
			if (children.length === 1 && isArray(children[0])) {
				return children[0]
			} else {
				return children
			}
		}
	
		function assignAttrs(target, attrs, classes) {
			var classAttr = "class" in attrs ? "class" : "className"
	
			for (var attrName in attrs) {
				if (hasOwn.call(attrs, attrName)) {
					if (attrName === classAttr &&
							attrs[attrName] != null &&
							attrs[attrName] !== "") {
						classes.push(attrs[attrName])
						// create key in correct iteration order
						target[attrName] = ""
					} else {
						target[attrName] = attrs[attrName]
					}
				}
			}
	
			if (classes.length) target[classAttr] = classes.join(" ")
		}
	
		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
		 *                      or splat (optional)
		 */
		function m(tag, pairs) {
			var args = [].slice.call(arguments, 1)
	
			if (isObject(tag)) return parameterize(tag, args)
	
			if (!isString(tag)) {
				throw new Error("selector in m(selector, attrs, children) should " +
					"be a string")
			}
	
			var hasAttrs = pairs != null && isObject(pairs) &&
				!("tag" in pairs || "view" in pairs || "subtree" in pairs)
	
			var attrs = hasAttrs ? pairs : {}
			var cell = {
				tag: "div",
				attrs: {},
				children: getVirtualChildren(args, hasAttrs)
			}
	
			assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
			return cell
		}
	
		function forEach(list, f) {
			for (var i = 0; i < list.length && !f(list[i], i++);) {
				// function called in condition
			}
		}
	
		function forKeys(list, f) {
			forEach(list, function (attrs, i) {
				return (attrs = attrs && attrs.attrs) &&
					attrs.key != null &&
					f(attrs, i)
			})
		}
		// This function was causing deopts in Chrome.
		function dataToString(data) {
			// data.toString() might throw or return null if data is the return
			// value of Console.log in some versions of Firefox (behavior depends on
			// version)
			try {
				if (data != null && data.toString() != null) return data
			} catch (e) {
				// silently ignore errors
			}
			return ""
		}
	
		// This function was causing deopts in Chrome.
		function injectTextNode(parentElement, first, index, data) {
			try {
				insertNode(parentElement, first, index)
				first.nodeValue = data
			} catch (e) {
				// IE erroneously throws error when appending an empty text node
				// after a null
			}
		}
	
		function flatten(list) {
			// recursively flatten array
			for (var i = 0; i < list.length; i++) {
				if (isArray(list[i])) {
					list = list.concat.apply([], list)
					// check current index again and flatten until there are no more
					// nested arrays at that index
					i--
				}
			}
			return list
		}
	
		function insertNode(parentElement, node, index) {
			parentElement.insertBefore(node,
				parentElement.childNodes[index] || null)
		}
	
		var DELETION = 1
		var INSERTION = 2
		var MOVE = 3
	
		function handleKeysDiffer(data, existing, cached, parentElement) {
			forKeys(data, function (key, i) {
				existing[key = key.key] = existing[key] ? {
					action: MOVE,
					index: i,
					from: existing[key].index,
					element: cached.nodes[existing[key].index] ||
						$document.createElement("div")
				} : {action: INSERTION, index: i}
			})
	
			var actions = []
			for (var prop in existing) if (hasOwn.call(existing, prop)) {
				actions.push(existing[prop])
			}
	
			var changes = actions.sort(sortChanges)
			var newCached = new Array(cached.length)
	
			newCached.nodes = cached.nodes.slice()
	
			forEach(changes, function (change) {
				var index = change.index
				if (change.action === DELETION) {
					clear(cached[index].nodes, cached[index])
					newCached.splice(index, 1)
				}
				if (change.action === INSERTION) {
					var dummy = $document.createElement("div")
					dummy.key = data[index].attrs.key
					insertNode(parentElement, dummy, index)
					newCached.splice(index, 0, {
						attrs: {key: data[index].attrs.key},
						nodes: [dummy]
					})
					newCached.nodes[index] = dummy
				}
	
				if (change.action === MOVE) {
					var changeElement = change.element
					var maybeChanged = parentElement.childNodes[index]
					if (maybeChanged !== changeElement && changeElement !== null) {
						parentElement.insertBefore(changeElement,
							maybeChanged || null)
					}
					newCached[index] = cached[change.from]
					newCached.nodes[index] = changeElement
				}
			})
	
			return newCached
		}
	
		function diffKeys(data, cached, existing, parentElement) {
			var keysDiffer = data.length !== cached.length
	
			if (!keysDiffer) {
				forKeys(data, function (attrs, i) {
					var cachedCell = cached[i]
					return keysDiffer = cachedCell &&
						cachedCell.attrs &&
						cachedCell.attrs.key !== attrs.key
				})
			}
	
			if (keysDiffer) {
				return handleKeysDiffer(data, existing, cached, parentElement)
			} else {
				return cached
			}
		}
	
		function diffArray(data, cached, nodes) {
			// diff the array itself
	
			// update the list of DOM nodes by collecting the nodes from each item
			forEach(data, function (_, i) {
				if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
			})
			// remove items from the end of the array if the new array is shorter
			// than the old one. if errors ever happen here, the issue is most
			// likely a bug in the construction of the `cached` data structure
			// somewhere earlier in the program
			forEach(cached.nodes, function (node, i) {
				if (node.parentNode != null && nodes.indexOf(node) < 0) {
					clear([node], [cached[i]])
				}
			})
	
			if (data.length < cached.length) cached.length = data.length
			cached.nodes = nodes
		}
	
		function buildArrayKeys(data) {
			var guid = 0
			forKeys(data, function () {
				forEach(data, function (attrs) {
					if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
						attrs.key = "__mithril__" + guid++
					}
				})
				return 1
			})
		}
	
		function isDifferentEnough(data, cached, dataAttrKeys) {
			if (data.tag !== cached.tag) return true
	
			if (dataAttrKeys.sort().join() !==
					Object.keys(cached.attrs).sort().join()) {
				return true
			}
	
			if (data.attrs.id !== cached.attrs.id) {
				return true
			}
	
			if (data.attrs.key !== cached.attrs.key) {
				return true
			}
	
			if (m.redraw.strategy() === "all") {
				return !cached.configContext || cached.configContext.retain !== true
			}
	
			if (m.redraw.strategy() === "diff") {
				return cached.configContext && cached.configContext.retain === false
			}
	
			return false
		}
	
		function maybeRecreateObject(data, cached, dataAttrKeys) {
			// if an element is different enough from the one in cache, recreate it
			if (isDifferentEnough(data, cached, dataAttrKeys)) {
				if (cached.nodes.length) clear(cached.nodes)
	
				if (cached.configContext &&
						isFunction(cached.configContext.onunload)) {
					cached.configContext.onunload()
				}
	
				if (cached.controllers) {
					forEach(cached.controllers, function (controller) {
						if (controller.onunload) controller.onunload({preventDefault: noop});
					});
				}
			}
		}
	
		function getObjectNamespace(data, namespace) {
			if (data.attrs.xmlns) return data.attrs.xmlns
			if (data.tag === "svg") return "http://www.w3.org/2000/svg"
			if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
			return namespace
		}
	
		var pendingRequests = 0
		m.startComputation = function () { pendingRequests++ }
		m.endComputation = function () {
			if (pendingRequests > 1) {
				pendingRequests--
			} else {
				pendingRequests = 0
				m.redraw()
			}
		}
	
		function unloadCachedControllers(cached, views, controllers) {
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
				forEach(controllers, function (controller) {
					if (controller.onunload && controller.onunload.$old) {
						controller.onunload = controller.onunload.$old
					}
	
					if (pendingRequests && controller.onunload) {
						var onunload = controller.onunload
						controller.onunload = noop
						controller.onunload.$old = onunload
					}
				})
			}
		}
	
		function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
			// schedule configs to be called. They are called after `build` finishes
			// running
			if (isFunction(data.attrs.config)) {
				var context = cached.configContext = cached.configContext || {}
	
				// bind
				configs.push(function () {
					return data.attrs.config.call(data, node, !isNew, context,
						cached)
				})
			}
		}
	
		function buildUpdatedNode(
			cached,
			data,
			editable,
			hasKeys,
			namespace,
			views,
			configs,
			controllers
		) {
			var node = cached.nodes[0]
	
			if (hasKeys) {
				setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
			}
	
			cached.children = build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				false,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs
			)
	
			cached.nodes.intact = true
	
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
			}
	
			return node
		}
	
		function handleNonexistentNodes(data, parentElement, index) {
			var nodes
			if (data.$trusted) {
				nodes = injectHTML(parentElement, index, data)
			} else {
				nodes = [$document.createTextNode(data)]
				if (!(parentElement.nodeName in voidElements)) {
					insertNode(parentElement, nodes[0], index)
				}
			}
	
			var cached
	
			if (typeof data === "string" ||
					typeof data === "number" ||
					typeof data === "boolean") {
				cached = new data.constructor(data)
			} else {
				cached = data
			}
	
			cached.nodes = nodes
			return cached
		}
	
		function reattachNodes(
			data,
			cached,
			parentElement,
			editable,
			index,
			parentTag
		) {
			var nodes = cached.nodes
			if (!editable || editable !== $document.activeElement) {
				if (data.$trusted) {
					clear(nodes, cached)
					nodes = injectHTML(parentElement, index, data)
				} else if (parentTag === "textarea") {
					// <textarea> uses `value` instead of `nodeValue`.
					parentElement.value = data
				} else if (editable) {
					// contenteditable nodes use `innerHTML` instead of `nodeValue`.
					editable.innerHTML = data
				} else {
					// was a trusted string
					if (nodes[0].nodeType === 1 || nodes.length > 1 ||
							(nodes[0].nodeValue.trim &&
								!nodes[0].nodeValue.trim())) {
						clear(cached.nodes, cached)
						nodes = [$document.createTextNode(data)]
					}
	
					injectTextNode(parentElement, nodes[0], index, data)
				}
			}
			cached = new data.constructor(data)
			cached.nodes = nodes
			return cached
		}
	
		function handleTextNode(
			cached,
			data,
			index,
			parentElement,
			shouldReattach,
			editable,
			parentTag
		) {
			if (!cached.nodes.length) {
				return handleNonexistentNodes(data, parentElement, index)
			} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
				return reattachNodes(data, cached, parentElement, editable, index,
					parentTag)
			} else {
				return (cached.nodes.intact = true, cached)
			}
		}
	
		function getSubArrayCount(item) {
			if (item.$trusted) {
				// fix offset of next element if item was a trusted string w/ more
				// than one html element
				// the first clause in the regexp matches elements
				// the second clause (after the pipe) matches text nodes
				var match = item.match(/<[^\/]|\>\s*[^<]/g)
				if (match != null) return match.length
			} else if (isArray(item)) {
				return item.length
			}
			return 1
		}
	
		function buildArray(
			data,
			cached,
			parentElement,
			index,
			parentTag,
			shouldReattach,
			editable,
			namespace,
			configs
		) {
			data = flatten(data)
			var nodes = []
			var intact = cached.length === data.length
			var subArrayCount = 0
	
			// keys algorithm: sort elements without recreating them if keys are
			// present
			//
			// 1) create a map of all existing keys, and mark all for deletion
			// 2) add new keys to map and mark them for addition
			// 3) if key exists in new list, change action from deletion to a move
			// 4) for each key, handle its corresponding action as marked in
			//    previous steps
	
			var existing = {}
			var shouldMaintainIdentities = false
	
			forKeys(cached, function (attrs, i) {
				shouldMaintainIdentities = true
				existing[cached[i].attrs.key] = {action: DELETION, index: i}
			})
	
			buildArrayKeys(data)
			if (shouldMaintainIdentities) {
				cached = diffKeys(data, cached, existing, parentElement)
			}
			// end key algorithm
	
			var cacheCount = 0
			// faster explicitly written
			for (var i = 0, len = data.length; i < len; i++) {
				// diff each item in the array
				var item = build(
					parentElement,
					parentTag,
					cached,
					index,
					data[i],
					cached[cacheCount],
					shouldReattach,
					index + subArrayCount || subArrayCount,
					editable,
					namespace,
					configs)
	
				if (item !== undefined) {
					intact = intact && item.nodes.intact
					subArrayCount += getSubArrayCount(item)
					cached[cacheCount++] = item
				}
			}
	
			if (!intact) diffArray(data, cached, nodes)
			return cached
		}
	
		function makeCache(data, cached, index, parentIndex, parentCache) {
			if (cached != null) {
				if (type.call(cached) === type.call(data)) return cached
	
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (isArray(data) ? data : cached.nodes).length
					clear(
						parentCache.nodes.slice(offset, end),
						parentCache.slice(offset, end))
				} else if (cached.nodes) {
					clear(cached.nodes, cached)
				}
			}
	
			cached = new data.constructor()
			// if constructor creates a virtual dom element, use a blank object as
			// the base cached node instead of copying the virtual el (#277)
			if (cached.tag) cached = {}
			cached.nodes = []
			return cached
		}
	
		function constructNode(data, namespace) {
			if (data.attrs.is) {
				if (namespace == null) {
					return $document.createElement(data.tag, data.attrs.is)
				} else {
					return $document.createElementNS(namespace, data.tag,
						data.attrs.is)
				}
			} else if (namespace == null) {
				return $document.createElement(data.tag)
			} else {
				return $document.createElementNS(namespace, data.tag)
			}
		}
	
		function constructAttrs(data, node, namespace, hasKeys) {
			if (hasKeys) {
				return setAttributes(node, data.tag, data.attrs, {}, namespace)
			} else {
				return data.attrs
			}
		}
	
		function constructChildren(
			data,
			node,
			cached,
			editable,
			namespace,
			configs
		) {
			if (data.children != null && data.children.length > 0) {
				return build(
					node,
					data.tag,
					undefined,
					undefined,
					data.children,
					cached.children,
					true,
					0,
					data.attrs.contenteditable ? node : editable,
					namespace,
					configs)
			} else {
				return data.children
			}
		}
	
		function reconstructCached(
			data,
			attrs,
			children,
			node,
			namespace,
			views,
			controllers
		) {
			var cached = {
				tag: data.tag,
				attrs: attrs,
				children: children,
				nodes: [node]
			}
	
			unloadCachedControllers(cached, views, controllers)
	
			if (cached.children && !cached.children.nodes) {
				cached.children.nodes = []
			}
	
			// edge case: setting value on <select> doesn't work before children
			// exist, so set it again after children have been created
			if (data.tag === "select" && "value" in data.attrs) {
				setAttributes(node, data.tag, {value: data.attrs.value}, {},
					namespace)
			}
	
			return cached
		}
	
		function getController(views, view, cachedControllers, controller) {
			var controllerIndex
	
			if (m.redraw.strategy() === "diff" && views) {
				controllerIndex = views.indexOf(view)
			} else {
				controllerIndex = -1
			}
	
			if (controllerIndex > -1) {
				return cachedControllers[controllerIndex]
			} else if (isFunction(controller)) {
				return new controller()
			} else {
				return {}
			}
		}
	
		var unloaders = []
	
		function updateLists(views, controllers, view, controller) {
			if (controller.onunload != null && unloaders.map(function(u) {return u.handler}).indexOf(controller.onunload) < 0) {
				unloaders.push({
					controller: controller,
					handler: controller.onunload
				})
			}
	
			views.push(view)
			controllers.push(controller)
		}
	
		var forcing = false
		function checkView(data, view, cached, cachedControllers, controllers, views) {
			var controller = getController(cached.views, view, cachedControllers, data.controller)
			var key = data && data.attrs && data.attrs.key
			data = pendingRequests === 0 || forcing || cachedControllers && cachedControllers.indexOf(controller) > -1 ? data.view(controller) : {tag: "placeholder"}
			if (data.subtree === "retain") return data;
			data.attrs = data.attrs || {}
			data.attrs.key = key
			updateLists(views, controllers, view, controller)
			return data
		}
	
		function markViews(data, cached, views, controllers) {
			var cachedControllers = cached && cached.controllers
	
			while (data.view != null) {
				data = checkView(
					data,
					data.view.$original || data.view,
					cached,
					cachedControllers,
					controllers,
					views)
			}
	
			return data
		}
	
		function buildObject( // eslint-disable-line max-statements
			data,
			cached,
			editable,
			parentElement,
			index,
			shouldReattach,
			namespace,
			configs
		) {
			var views = []
			var controllers = []
	
			data = markViews(data, cached, views, controllers)
	
			if (data.subtree === "retain") return cached
	
			if (!data.tag && controllers.length) {
				throw new Error("Component template must return a virtual " +
					"element, not an array, string, etc.")
			}
	
			data.attrs = data.attrs || {}
			cached.attrs = cached.attrs || {}
	
			var dataAttrKeys = Object.keys(data.attrs)
			var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)
	
			maybeRecreateObject(data, cached, dataAttrKeys)
	
			if (!isString(data.tag)) return
	
			var isNew = cached.nodes.length === 0
	
			namespace = getObjectNamespace(data, namespace)
	
			var node
			if (isNew) {
				node = constructNode(data, namespace)
				// set attributes first, then create children
				var attrs = constructAttrs(data, node, namespace, hasKeys)
	
				var children = constructChildren(data, node, cached, editable,
					namespace, configs)
	
				cached = reconstructCached(
					data,
					attrs,
					children,
					node,
					namespace,
					views,
					controllers)
			} else {
				node = buildUpdatedNode(
					cached,
					data,
					editable,
					hasKeys,
					namespace,
					views,
					configs,
					controllers)
			}
	
			if (isNew || shouldReattach === true && node != null) {
				insertNode(parentElement, node, index)
			}
	
			// The configs are called after `build` finishes running
			scheduleConfigsToBeCalled(configs, data, node, isNew, cached)
	
			return cached
		}
	
		function build(
			parentElement,
			parentTag,
			parentCache,
			parentIndex,
			data,
			cached,
			shouldReattach,
			index,
			editable,
			namespace,
			configs
		) {
			/*
			 * `build` is a recursive function that manages creation/diffing/removal
			 * of DOM elements based on comparison between `data` and `cached` the
			 * diff algorithm can be summarized as this:
			 *
			 * 1 - compare `data` and `cached`
			 * 2 - if they are different, copy `data` to `cached` and update the DOM
			 *     based on what the difference is
			 * 3 - recursively apply this algorithm for every array and for the
			 *     children of every virtual element
			 *
			 * The `cached` data structure is essentially the same as the previous
			 * redraw's `data` data structure, with a few additions:
			 * - `cached` always has a property called `nodes`, which is a list of
			 *    DOM elements that correspond to the data represented by the
			 *    respective virtual element
			 * - in order to support attaching `nodes` as a property of `cached`,
			 *    `cached` is *always* a non-primitive object, i.e. if the data was
			 *    a string, then cached is a String instance. If data was `null` or
			 *    `undefined`, cached is `new String("")`
			 * - `cached also has a `configContext` property, which is the state
			 *    storage object exposed by config(element, isInitialized, context)
			 * - when `cached` is an Object, it represents a virtual element; when
			 *    it's an Array, it represents a list of elements; when it's a
			 *    String, Number or Boolean, it represents a text node
			 *
			 * `parentElement` is a DOM element used for W3C DOM API calls
			 * `parentTag` is only used for handling a corner case for textarea
			 * values
			 * `parentCache` is used to remove nodes in some multi-node cases
			 * `parentIndex` and `index` are used to figure out the offset of nodes.
			 * They're artifacts from before arrays started being flattened and are
			 * likely refactorable
			 * `data` and `cached` are, respectively, the new and old nodes being
			 * diffed
			 * `shouldReattach` is a flag indicating whether a parent node was
			 * recreated (if so, and if this node is reused, then this node must
			 * reattach itself to the new parent)
			 * `editable` is a flag that indicates whether an ancestor is
			 * contenteditable
			 * `namespace` indicates the closest HTML namespace as it cascades down
			 * from an ancestor
			 * `configs` is a list of config functions to run after the topmost
			 * `build` call finishes running
			 *
			 * there's logic that relies on the assumption that null and undefined
			 * data are equivalent to empty strings
			 * - this prevents lifecycle surprises from procedural helpers that mix
			 *   implicit and explicit return statements (e.g.
			 *   function foo() {if (cond) return m("div")}
			 * - it simplifies diffing code
			 */
			data = dataToString(data)
			if (data.subtree === "retain") return cached
			cached = makeCache(data, cached, index, parentIndex, parentCache)
	
			if (isArray(data)) {
				return buildArray(
					data,
					cached,
					parentElement,
					index,
					parentTag,
					shouldReattach,
					editable,
					namespace,
					configs)
			} else if (data != null && isObject(data)) {
				return buildObject(
					data,
					cached,
					editable,
					parentElement,
					index,
					shouldReattach,
					namespace,
					configs)
			} else if (!isFunction(data)) {
				return handleTextNode(
					cached,
					data,
					index,
					parentElement,
					shouldReattach,
					editable,
					parentTag)
			} else {
				return cached
			}
		}
	
		function sortChanges(a, b) {
			return a.action - b.action || a.index - b.index
		}
	
		function copyStyleAttrs(node, dataAttr, cachedAttr) {
			for (var rule in dataAttr) if (hasOwn.call(dataAttr, rule)) {
				if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
					node.style[rule] = dataAttr[rule]
				}
			}
	
			for (rule in cachedAttr) if (hasOwn.call(cachedAttr, rule)) {
				if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
			}
		}
	
		var shouldUseSetAttribute = {
			list: 1,
			style: 1,
			form: 1,
			type: 1,
			width: 1,
			height: 1
		}
	
		function setSingleAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			tag,
			namespace
		) {
			if (attrName === "config" || attrName === "key") {
				// `config` isn't a real attribute, so ignore it
				return true
			} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
				// hook event handlers to the auto-redrawing system
				node[attrName] = autoredraw(dataAttr, node)
			} else if (attrName === "style" && dataAttr != null &&
					isObject(dataAttr)) {
				// handle `style: {...}`
				copyStyleAttrs(node, dataAttr, cachedAttr)
			} else if (namespace != null) {
				// handle SVG
				if (attrName === "href") {
					node.setAttributeNS("http://www.w3.org/1999/xlink",
						"href", dataAttr)
				} else {
					node.setAttribute(
						attrName === "className" ? "class" : attrName,
						dataAttr)
				}
			} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
				// handle cases that are properties (but ignore cases where we
				// should use setAttribute instead)
				//
				// - list and form are typically used as strings, but are DOM
				//   element references in js
				//
				// - when using CSS selectors (e.g. `m("[style='']")`), style is
				//   used as a string, but it's an object in js
				//
				// #348 don't set the value if not needed - otherwise, cursor
				// placement breaks in Chrome
				try {
					if (tag !== "input" || node[attrName] !== dataAttr) {
						node[attrName] = dataAttr
					}
				} catch (e) {
					node.setAttribute(attrName, dataAttr)
				}
			}
			else node.setAttribute(attrName, dataAttr)
		}
	
		function trySetAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			cachedAttrs,
			tag,
			namespace
		) {
			if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
				cachedAttrs[attrName] = dataAttr
				try {
					return setSingleAttr(
						node,
						attrName,
						dataAttr,
						cachedAttr,
						tag,
						namespace)
				} catch (e) {
					// swallow IE's invalid argument errors to mimic HTML's
					// fallback-to-doing-nothing-on-invalid-attributes behavior
					if (e.message.indexOf("Invalid argument") < 0) throw e
				}
			} else if (attrName === "value" && tag === "input" &&
					node.value !== dataAttr) {
				// #348 dataAttr may not be a string, so use loose comparison
				node.value = dataAttr
			}
		}
	
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) if (hasOwn.call(dataAttrs, attrName)) {
				if (trySetAttr(
						node,
						attrName,
						dataAttrs[attrName],
						cachedAttrs[attrName],
						cachedAttrs,
						tag,
						namespace)) {
					continue
				}
			}
			return cachedAttrs
		}
	
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {
						nodes[i].parentNode.removeChild(nodes[i])
					} catch (e) {
						/* eslint-disable max-len */
						// ignore if this fails due to order of events (see
						// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
						/* eslint-enable max-len */
					}
					cached = [].concat(cached)
					if (cached[i]) unload(cached[i])
				}
			}
			// release memory if nodes is an array. This check should fail if nodes
			// is a NodeList (see loop above)
			if (nodes.length) {
				nodes.length = 0
			}
		}
	
		function unload(cached) {
			if (cached.configContext && isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
				cached.configContext.onunload = null
			}
			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (isFunction(controller.onunload)) {
						controller.onunload({preventDefault: noop})
					}
				})
			}
			if (cached.children) {
				if (isArray(cached.children)) forEach(cached.children, unload)
				else if (cached.children.tag) unload(cached.children)
			}
		}
	
		function appendTextFragment(parentElement, data) {
			try {
				parentElement.appendChild(
					$document.createRange().createContextualFragment(data))
			} catch (e) {
				parentElement.insertAdjacentHTML("beforeend", data)
			}
		}
	
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index]
			if (nextSibling) {
				var isElement = nextSibling.nodeType !== 1
				var placeholder = $document.createElement("span")
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null)
					placeholder.insertAdjacentHTML("beforebegin", data)
					parentElement.removeChild(placeholder)
				} else {
					nextSibling.insertAdjacentHTML("beforebegin", data)
				}
			} else {
				appendTextFragment(parentElement, data)
			}
	
			var nodes = []
	
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index])
				index++
			}
	
			return nodes
		}
	
		function autoredraw(callback, object) {
			return function (e) {
				e = e || event
				m.redraw.strategy("diff")
				m.startComputation()
				try {
					return callback.call(object, e)
				} finally {
					endFirstComputation()
				}
			}
		}
	
		var html
		var documentNode = {
			appendChild: function (node) {
				if (html === undefined) html = $document.createElement("html")
				if ($document.documentElement &&
						$document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				} else {
					$document.appendChild(node)
				}
	
				this.childNodes = $document.childNodes
			},
	
			insertBefore: function (node) {
				this.appendChild(node)
			},
	
			childNodes: []
		}
	
		var nodeCache = []
		var cellCache = {}
	
		m.render = function (root, cell, forceRecreation) {
			if (!root) {
				throw new Error("Ensure the DOM element being passed to " +
					"m.route/m.mount/m.render is not undefined.")
			}
			var configs = []
			var id = getCellCacheKey(root)
			var isDocumentRoot = root === $document
			var node
	
			if (isDocumentRoot || root === $document.documentElement) {
				node = documentNode
			} else {
				node = root
			}
	
			if (isDocumentRoot && cell.tag !== "html") {
				cell = {tag: "html", attrs: {}, children: cell}
			}
	
			if (cellCache[id] === undefined) clear(node.childNodes)
			if (forceRecreation === true) reset(root)
	
			cellCache[id] = build(
				node,
				null,
				undefined,
				undefined,
				cell,
				cellCache[id],
				false,
				0,
				null,
				undefined,
				configs)
	
			forEach(configs, function (config) { config() })
		}
	
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element)
			return index < 0 ? nodeCache.push(element) - 1 : index
		}
	
		m.trust = function (value) {
			value = new String(value) // eslint-disable-line no-new-wrappers
			value.$trusted = true
			return value
		}
	
		function gettersetter(store) {
			function prop() {
				if (arguments.length) store = arguments[0]
				return store
			}
	
			prop.toJSON = function () {
				return store
			}
	
			return prop
		}
	
		m.prop = function (store) {
			if ((store != null && isObject(store) || isFunction(store)) &&
					isFunction(store.then)) {
				return propify(store)
			}
	
			return gettersetter(store)
		}
	
		var roots = []
		var components = []
		var controllers = []
		var lastRedrawId = null
		var lastRedrawCallTime = 0
		var computePreRedrawHook = null
		var computePostRedrawHook = null
		var topComponent
		var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms
	
		function parameterize(component, args) {
			function controller() {
				/* eslint-disable no-invalid-this */
				return (component.controller || noop).apply(this, args) || this
				/* eslint-enable no-invalid-this */
			}
	
			if (component.controller) {
				controller.prototype = component.controller.prototype
			}
	
			function view(ctrl) {
				var currentArgs = [ctrl].concat(args)
				for (var i = 1; i < arguments.length; i++) {
					currentArgs.push(arguments[i])
				}
	
				return component.view.apply(component, currentArgs)
			}
	
			view.$original = component.view
			var output = {controller: controller, view: view}
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
			return output
		}
	
		m.component = function (component) {
			var args = [].slice.call(arguments, 1)
	
			return parameterize(component, args)
		}
	
		function checkPrevented(component, root, index, isPrevented) {
			if (!isPrevented) {
				m.redraw.strategy("all")
				m.startComputation()
				roots[index] = root
				var currentComponent
	
				if (component) {
					currentComponent = topComponent = component
				} else {
					currentComponent = topComponent = component = {controller: noop}
				}
	
				var controller = new (component.controller || noop)()
	
				// controllers may call m.mount recursively (via m.route redirects,
				// for example)
				// this conditional ensures only the last recursive m.mount call is
				// applied
				if (currentComponent === topComponent) {
					controllers[index] = controller
					components[index] = component
				}
				endFirstComputation()
				if (component === null) {
					removeRootElement(root, index)
				}
				return controllers[index]
			} else if (component == null) {
				removeRootElement(root, index)
			}
		}
	
		m.mount = m.module = function (root, component) {
			if (!root) {
				throw new Error("Please ensure the DOM element exists before " +
					"rendering a template into it.")
			}
	
			var index = roots.indexOf(root)
			if (index < 0) index = roots.length
	
			var isPrevented = false
			var event = {
				preventDefault: function () {
					isPrevented = true
					computePreRedrawHook = computePostRedrawHook = null
				}
			}
	
			forEach(unloaders, function (unloader) {
				unloader.handler.call(unloader.controller, event)
				unloader.controller.onunload = null
			})
	
			if (isPrevented) {
				forEach(unloaders, function (unloader) {
					unloader.controller.onunload = unloader.handler
				})
			} else {
				unloaders = []
			}
	
			if (controllers[index] && isFunction(controllers[index].onunload)) {
				controllers[index].onunload(event)
			}
	
			return checkPrevented(component, root, index, isPrevented)
		}
	
		function removeRootElement(root, index) {
			roots.splice(index, 1)
			controllers.splice(index, 1)
			components.splice(index, 1)
			reset(root)
			nodeCache.splice(getCellCacheKey(root), 1)
		}
	
		var redrawing = false
		m.redraw = function (force) {
			if (redrawing) return
			redrawing = true
			if (force) forcing = true
	
			try {
				// lastRedrawId is a positive number if a second redraw is requested
				// before the next animation frame
				// lastRedrawID is null if it's the first redraw and not an event
				// handler
				if (lastRedrawId && !force) {
					// when setTimeout: only reschedule redraw if time between now
					// and previous redraw is bigger than a frame, otherwise keep
					// currently scheduled timeout
					// when rAF: always reschedule redraw
					if ($requestAnimationFrame === global.requestAnimationFrame ||
							new Date() - lastRedrawCallTime > FRAME_BUDGET) {
						if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
						lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
					}
				} else {
					redraw()
					lastRedrawId = $requestAnimationFrame(function () {
						lastRedrawId = null
					}, FRAME_BUDGET)
				}
			} finally {
				redrawing = forcing = false
			}
		}
	
		m.redraw.strategy = m.prop()
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook()
				computePreRedrawHook = null
			}
			forEach(roots, function (root, i) {
				var component = components[i]
				if (controllers[i]) {
					var args = [controllers[i]]
					m.render(root,
						component.view ? component.view(controllers[i], args) : "")
				}
			})
			// after rendering within a routed context, we need to scroll back to
			// the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook()
				computePostRedrawHook = null
			}
			lastRedrawId = null
			lastRedrawCallTime = new Date()
			m.redraw.strategy("diff")
		}
	
		function endFirstComputation() {
			if (m.redraw.strategy() === "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			} else {
				m.endComputation()
			}
		}
	
		m.withAttr = function (prop, withAttrCallback, callbackThis) {
			return function (e) {
				e = e || event
				/* eslint-disable no-invalid-this */
				var currentTarget = e.currentTarget || this
				var _this = callbackThis || this
				/* eslint-enable no-invalid-this */
				var target = prop in currentTarget ?
					currentTarget[prop] :
					currentTarget.getAttribute(prop)
				withAttrCallback.call(_this, target)
			}
		}
	
		// routing
		var modes = {pathname: "", hash: "#", search: "?"}
		var redirect = noop
		var isDefaultRoute = false
		var routeParams, currentRoute
	
		m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
			// m.route()
			if (arguments.length === 0) return currentRoute
			// m.route(el, defaultRoute, routes)
			if (arguments.length === 3 && isString(arg1)) {
				redirect = function (source) {
					var path = currentRoute = normalizeRoute(source)
					if (!routeByValue(root, arg2, path)) {
						if (isDefaultRoute) {
							throw new Error("Ensure the default route matches " +
								"one of the routes defined in m.route")
						}
	
						isDefaultRoute = true
						m.route(arg1, true)
						isDefaultRoute = false
					}
				}
	
				var listener = m.route.mode === "hash" ?
					"onhashchange" :
					"onpopstate"
	
				global[listener] = function () {
					var path = $location[m.route.mode]
					if (m.route.mode === "pathname") path += $location.search
					if (currentRoute !== normalizeRoute(path)) redirect(path)
				}
	
				computePreRedrawHook = setScroll
				global[listener]()
	
				return
			}
	
			// config: m.route
			if (root.addEventListener || root.attachEvent) {
				var base = m.route.mode !== "pathname" ? $location.pathname : ""
				root.href = base + modes[m.route.mode] + vdom.attrs.href
				if (root.addEventListener) {
					root.removeEventListener("click", routeUnobtrusive)
					root.addEventListener("click", routeUnobtrusive)
				} else {
					root.detachEvent("onclick", routeUnobtrusive)
					root.attachEvent("onclick", routeUnobtrusive)
				}
	
				return
			}
			// m.route(route, params, shouldReplaceHistoryEntry)
			if (isString(root)) {
				var oldRoute = currentRoute
				currentRoute = root
	
				var args = arg1 || {}
				var queryIndex = currentRoute.indexOf("?")
				var params
	
				if (queryIndex > -1) {
					params = parseQueryString(currentRoute.slice(queryIndex + 1))
				} else {
					params = {}
				}
	
				for (var i in args) if (hasOwn.call(args, i)) {
					params[i] = args[i]
				}
	
				var querystring = buildQueryString(params)
				var currentPath
	
				if (queryIndex > -1) {
					currentPath = currentRoute.slice(0, queryIndex)
				} else {
					currentPath = currentRoute
				}
	
				if (querystring) {
					currentRoute = currentPath +
						(currentPath.indexOf("?") === -1 ? "?" : "&") +
						querystring
				}
	
				var replaceHistory =
					(arguments.length === 3 ? arg2 : arg1) === true ||
					oldRoute === root
	
				if (global.history.pushState) {
					var method = replaceHistory ? "replaceState" : "pushState"
					computePreRedrawHook = setScroll
					computePostRedrawHook = function () {
						global.history[method](null, $document.title,
							modes[m.route.mode] + currentRoute)
					}
					redirect(modes[m.route.mode] + currentRoute)
				} else {
					$location[m.route.mode] = currentRoute
					redirect(modes[m.route.mode] + currentRoute)
				}
			}
		}
	
		m.route.param = function (key) {
			if (!routeParams) {
				throw new Error("You must call m.route(element, defaultRoute, " +
					"routes) before calling m.route.param()")
			}
	
			if (!key) {
				return routeParams
			}
	
			return routeParams[key]
		}
	
		m.route.mode = "search"
	
		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length)
		}
	
		function routeByValue(root, router, path) {
			routeParams = {}
	
			var queryStart = path.indexOf("?")
			if (queryStart !== -1) {
				routeParams = parseQueryString(
					path.substr(queryStart + 1, path.length))
				path = path.substr(0, queryStart)
			}
	
			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router)
			var index = keys.indexOf(path)
	
			if (index !== -1){
				m.mount(root, router[keys [index]])
				return true
			}
	
			for (var route in router) if (hasOwn.call(router, route)) {
				if (route === path) {
					m.mount(root, router[route])
					return true
				}
	
				var matcher = new RegExp("^" + route
					.replace(/:[^\/]+?\.{3}/g, "(.*?)")
					.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
	
				if (matcher.test(path)) {
					/* eslint-disable no-loop-func */
					path.replace(matcher, function () {
						var keys = route.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						forEach(keys, function (key, i) {
							routeParams[key.replace(/:|\./g, "")] =
								decodeURIComponent(values[i])
						})
						m.mount(root, router[route])
					})
					/* eslint-enable no-loop-func */
					return true
				}
			}
		}
	
		function routeUnobtrusive(e) {
			e = e || event
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
	
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
	
			var currentTarget = e.currentTarget || e.srcElement
			var args
	
			if (m.route.mode === "pathname" && currentTarget.search) {
				args = parseQueryString(currentTarget.search.slice(1))
			} else {
				args = {}
			}
	
			while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
				currentTarget = currentTarget.parentNode
			}
	
			// clear pendingRequests because we want an immediate route change
			pendingRequests = 0
			m.route(currentTarget[m.route.mode]
				.slice(modes[m.route.mode].length), args)
		}
	
		function setScroll() {
			if (m.route.mode !== "hash" && $location.hash) {
				$location.hash = $location.hash
			} else {
				global.scrollTo(0, 0)
			}
		}
	
		function buildQueryString(object, prefix) {
			var duplicates = {}
			var str = []
	
			for (var prop in object) if (hasOwn.call(object, prop)) {
				var key = prefix ? prefix + "[" + prop + "]" : prop
				var value = object[prop]
	
				if (value === null) {
					str.push(encodeURIComponent(key))
				} else if (isObject(value)) {
					str.push(buildQueryString(value, key))
				} else if (isArray(value)) {
					var keys = []
					duplicates[key] = duplicates[key] || {}
					/* eslint-disable no-loop-func */
					forEach(value, function (item) {
						/* eslint-enable no-loop-func */
						if (!duplicates[key][item]) {
							duplicates[key][item] = true
							keys.push(encodeURIComponent(key) + "=" +
								encodeURIComponent(item))
						}
					})
					str.push(keys.join("&"))
				} else if (value !== undefined) {
					str.push(encodeURIComponent(key) + "=" +
						encodeURIComponent(value))
				}
			}
			return str.join("&")
		}
	
		function parseQueryString(str) {
			if (str === "" || str == null) return {}
			if (str.charAt(0) === "?") str = str.slice(1)
	
			var pairs = str.split("&")
			var params = {}
	
			forEach(pairs, function (string) {
				var pair = string.split("=")
				var key = decodeURIComponent(pair[0])
				var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
				if (params[key] != null) {
					if (!isArray(params[key])) params[key] = [params[key]]
					params[key].push(value)
				}
				else params[key] = value
			})
	
			return params
		}
	
		m.route.buildQueryString = buildQueryString
		m.route.parseQueryString = parseQueryString
	
		function reset(root) {
			var cacheKey = getCellCacheKey(root)
			clear(root.childNodes, cellCache[cacheKey])
			cellCache[cacheKey] = undefined
		}
	
		m.deferred = function () {
			var deferred = new Deferred()
			deferred.promise = propify(deferred.promise)
			return deferred
		}
	
		function propify(promise, initialValue) {
			var prop = m.prop(initialValue)
			promise.then(prop)
			prop.then = function (resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue)
			}
	
			prop.catch = prop.then.bind(null, null)
			return prop
		}
		// Promiz.mithril.js | Zolmeister | MIT
		// a modified version of Promiz.js, which does not conform to Promises/A+
		// for two reasons:
		//
		// 1) `then` callbacks are called synchronously (because setTimeout is too
		//    slow, and the setImmediate polyfill is too big
		//
		// 2) throwing subclasses of Error cause the error to be bubbled up instead
		//    of triggering rejection (because the spec does not account for the
		//    important use case of default browser error handling, i.e. message w/
		//    line number)
	
		var RESOLVING = 1
		var REJECTING = 2
		var RESOLVED = 3
		var REJECTED = 4
	
		function Deferred(onSuccess, onFailure) {
			var self = this
			var state = 0
			var promiseValue = 0
			var next = []
	
			self.promise = {}
	
			self.resolve = function (value) {
				if (!state) {
					promiseValue = value
					state = RESOLVING
	
					fire()
				}
	
				return self
			}
	
			self.reject = function (value) {
				if (!state) {
					promiseValue = value
					state = REJECTING
	
					fire()
				}
	
				return self
			}
	
			self.promise.then = function (onSuccess, onFailure) {
				var deferred = new Deferred(onSuccess, onFailure)
	
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else if (state === REJECTED) {
					deferred.reject(promiseValue)
				} else {
					next.push(deferred)
				}
	
				return deferred.promise
			}
	
			function finish(type) {
				state = type || REJECTED
				next.map(function (deferred) {
					if (state === RESOLVED) {
						deferred.resolve(promiseValue)
					} else {
						deferred.reject(promiseValue)
					}
				})
			}
	
			function thennable(then, success, failure, notThennable) {
				if (((promiseValue != null && isObject(promiseValue)) ||
						isFunction(promiseValue)) && isFunction(then)) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0
						then.call(promiseValue, function (value) {
							if (count++) return
							promiseValue = value
							success()
						}, function (value) {
							if (count++) return
							promiseValue = value
							failure()
						})
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						failure()
					}
				} else {
					notThennable()
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then
				try {
					then = promiseValue && promiseValue.then
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					state = REJECTING
					return fire()
				}
	
				if (state === REJECTING) {
					m.deferred.onerror(promiseValue)
				}
	
				thennable(then, function () {
					state = RESOLVING
					fire()
				}, function () {
					state = REJECTING
					fire()
				}, function () {
					try {
						if (state === RESOLVING && isFunction(onSuccess)) {
							promiseValue = onSuccess(promiseValue)
						} else if (state === REJECTING && isFunction(onFailure)) {
							promiseValue = onFailure(promiseValue)
							state = RESOLVING
						}
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						return finish()
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError()
						finish()
					} else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}
	
		m.deferred.onerror = function (e) {
			if (type.call(e) === "[object Error]" &&
					!/ Error/.test(e.constructor.toString())) {
				pendingRequests = 0
				throw e
			}
		}
	
		m.sync = function (args) {
			var deferred = m.deferred()
			var outstanding = args.length
			var results = new Array(outstanding)
			var method = "resolve"
	
			function synchronizer(pos, resolved) {
				return function (value) {
					results[pos] = value
					if (!resolved) method = "reject"
					if (--outstanding === 0) {
						deferred.promise(results)
						deferred[method](results)
					}
					return value
				}
			}
	
			if (args.length > 0) {
				forEach(args, function (arg, i) {
					arg.then(synchronizer(i, true), synchronizer(i, false))
				})
			} else {
				deferred.resolve([])
			}
	
			return deferred.promise
		}
	
		function identity(value) { return value }
	
		function handleJsonp(options) {
			var callbackKey = "mithril_callback_" +
				new Date().getTime() + "_" +
				(Math.round(Math.random() * 1e16)).toString(36)
	
			var script = $document.createElement("script")
	
			global[callbackKey] = function (resp) {
				script.parentNode.removeChild(script)
				options.onload({
					type: "load",
					target: {
						responseText: resp
					}
				})
				global[callbackKey] = undefined
			}
	
			script.onerror = function () {
				script.parentNode.removeChild(script)
	
				options.onerror({
					type: "error",
					target: {
						status: 500,
						responseText: JSON.stringify({
							error: "Error making jsonp request"
						})
					}
				})
				global[callbackKey] = undefined
	
				return false
			}
	
			script.onload = function () {
				return false
			}
	
			script.src = options.url +
				(options.url.indexOf("?") > 0 ? "&" : "?") +
				(options.callbackKey ? options.callbackKey : "callback") +
				"=" + callbackKey +
				"&" + buildQueryString(options.data || {})
	
			$document.body.appendChild(script)
		}
	
		function createXhr(options) {
			var xhr = new global.XMLHttpRequest()
			xhr.open(options.method, options.url, true, options.user,
				options.password)
	
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						options.onload({type: "load", target: xhr})
					} else {
						options.onerror({type: "error", target: xhr})
					}
				}
			}
	
			if (options.serialize === JSON.stringify &&
					options.data &&
					options.method !== "GET") {
				xhr.setRequestHeader("Content-Type",
					"application/json; charset=utf-8")
			}
	
			if (options.deserialize === JSON.parse) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
	
			if (isFunction(options.config)) {
				var maybeXhr = options.config(xhr, options)
				if (maybeXhr != null) xhr = maybeXhr
			}
	
			var data = options.method === "GET" || !options.data ? "" : options.data
	
			if (data && !isString(data) && data.constructor !== global.FormData) {
				throw new Error("Request data should be either be a string or " +
					"FormData. Check the `serialize` option in `m.request`")
			}
	
			xhr.send(data)
			return xhr
		}
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				return handleJsonp(options)
			} else {
				return createXhr(options)
			}
		}
	
		function bindData(options, data, serialize) {
			if (options.method === "GET" && options.dataType !== "jsonp") {
				var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
				var querystring = buildQueryString(data)
				options.url += (querystring ? prefix + querystring : "")
			} else {
				options.data = serialize(data)
			}
		}
	
		function parameterizeUrl(url, data) {
			if (data) {
				url = url.replace(/:[a-z]\w+/gi, function(token){
					var key = token.slice(1)
					var value = data[key]
					delete data[key]
					return value
				})
			}
			return url
		}
	
		m.request = function (options) {
			if (options.background !== true) m.startComputation()
			var deferred = new Deferred()
			var isJSONP = options.dataType &&
				options.dataType.toLowerCase() === "jsonp"
	
			var serialize, deserialize, extract
	
			if (isJSONP) {
				serialize = options.serialize =
				deserialize = options.deserialize = identity
	
				extract = function (jsonp) { return jsonp.responseText }
			} else {
				serialize = options.serialize = options.serialize || JSON.stringify
	
				deserialize = options.deserialize =
					options.deserialize || JSON.parse
				extract = options.extract || function (xhr) {
					if (xhr.responseText.length || deserialize !== JSON.parse) {
						return xhr.responseText
					} else {
						return null
					}
				}
			}
	
			options.method = (options.method || "GET").toUpperCase()
			options.url = parameterizeUrl(options.url, options.data)
			bindData(options, options.data, serialize)
			options.onload = options.onerror = function (ev) {
				try {
					ev = ev || event
					var response = deserialize(extract(ev.target, options))
					if (ev.type === "load") {
						if (options.unwrapSuccess) {
							response = options.unwrapSuccess(response, ev.target)
						}
	
						if (isArray(response) && options.type) {
							forEach(response, function (res, i) {
								response[i] = new options.type(res)
							})
						} else if (options.type) {
							response = new options.type(response)
						}
	
						deferred.resolve(response)
					} else {
						if (options.unwrapError) {
							response = options.unwrapError(response, ev.target)
						}
	
						deferred.reject(response)
					}
				} catch (e) {
					deferred.reject(e)
				} finally {
					if (options.background !== true) m.endComputation()
				}
			}
	
			ajax(options)
			deferred.promise = propify(deferred.promise, options.initialValue)
			return deferred.promise
		}
	
		return m
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.setAppInstance = setAppInstance;
	exports.isAppActive = isAppActive;
	exports.hsl2rgb = hsl2rgb;
	exports.isInReddit = isInReddit;
	exports.hasExtension = hasExtension;
	exports.subModule = subModule;
	// Some of the helper functions require the app instance. Hacky and bad, but for now it'l do
	var app;
	
	function setAppInstance(app_instance) {
		app = app_instance;
	}
	
	function isAppActive() {
		var is_app_open = app && app.state('is_open');
		var is_browser_active = window.document.hasFocus ? window.document.hasFocus() : true;
	
		return is_app_open && is_browser_active;
	}
	
	var nickColour = function () {
		var cache = Object.create(null);
	
		function sumCharCodes(total, i) {
			return total + i.charCodeAt(0);
		}
	
		return function nickColour(nick) {
			var nick_lightness, nick_int, rgb;
			var cache_key = nick.toLowerCase();
	
			if (!cache[cache_key]) {
				nick_lightness = 40;
				nick_int = _.reduce(nick.toLowerCase().split(''), sumCharCodes, 0);
				rgb = hsl2rgb(nick_int % 200, 70, nick_lightness);
	
				cache[cache_key] = '#' + ('000000' + (rgb[2] | rgb[1] << 8 | rgb[0] << 16).toString(16)).substr(-6);
			}
	
			return cache[cache_key];
		};
	}();
	exports.nickColour = nickColour;
	function hsl2rgb(h, s, l) {
		var m1, m2, hue;
		var r, g, b;
		s /= 100;
		l /= 100;
		if (s == 0) {
			r = g = b = l * 255;
		} else {
			if (l <= 0.5) {
				m2 = l * (s + 1);
			} else {
				m2 = l + s - l * s;
			}
			m1 = l * 2 - m2;
			hue = h / 360;
			r = HueToRgb(m1, m2, hue + 1 / 3);
			g = HueToRgb(m1, m2, hue);
			b = HueToRgb(m1, m2, hue - 1 / 3);
		}
	
		return [r, g, b];
	
		function HueToRgb(m1, m2, hue) {
			var v;
			if (hue < 0) hue += 1;else if (hue > 1) hue -= 1;
	
			if (6 * hue < 1) v = m1 + (m2 - m1) * hue * 6;else if (2 * hue < 1) v = m2;else if (3 * hue < 2) v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;else v = m1;
	
			return 255 * v;
		}
	}
	
	function isInReddit() {
		return !!window.location.host.match(/reddit.com$/i);
	}
	
	function hasExtension() {
		return app.has_extension;
	}
	
	function subModule(module, args) {
		var instance = new module.controller(args);
		return {
			instance: instance,
			view: function view() {
				var fn_args = Array.prototype.slice.call(arguments);
				return module.view.apply(module, [instance, args].concat(fn_args));
			}
		};
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(5);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _Sidebar = __webpack_require__(9);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	var _Topbar = __webpack_require__(32);
	
	var _Topbar2 = _interopRequireDefault(_Topbar);
	
	var _HomeView = __webpack_require__(35);
	
	var _HomeView2 = _interopRequireDefault(_HomeView);
	
	var _Settings = __webpack_require__(38);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	var _Reddit = __webpack_require__(15);
	
	var _Reddit2 = _interopRequireDefault(_Reddit);
	
	var _Transport = __webpack_require__(41);
	
	var _Transport2 = _interopRequireDefault(_Transport);
	
	var _ChannelManager = __webpack_require__(106);
	
	var _ChannelManager2 = _interopRequireDefault(_ChannelManager);
	
	var _ModeratorToolbox = __webpack_require__(107);
	
	var _ModeratorToolbox2 = _interopRequireDefault(_ModeratorToolbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Top level application controller
	 */
	var ChatApp = {};
	
	ChatApp.controller = function (args) {
		var _this = this;
	
		Helpers.setAppInstance(this);
	
		this.is_in_reddit = !!window.location.host.match(/reddit.com$/i);
		this.has_extension = args.has_extension;
	
		this.bus = args.bus;
		this.state = args.state;
	
		this.subchat = new _Subchat2.default.instance(this.state);
		this.transport = new _Transport2.default(this.subchat.sid, this.bus);
	
		this.top_bar = Helpers.subModule(_Topbar2.default, { app: this });
		this.side_bar = Helpers.subModule(_Sidebar2.default, { app: this });
	
		// TODO: .home will be the default homescreen
		this.home = m(_HomeView2.default, { app: this });
	
		// The active workspace instance. If null, the channel manager will takeover
		this.workspace_instance = null;
	
		this.rooms = new _ChannelManager2.default({
			bus: this.bus,
			transport: this.transport
		});
	
		// The subreddits we are subscribed to
		this.subchat.loadSubreddits();
		this.subreddits = this.subchat.subreddits;
		this.subreddits.refresh = function () {
			_this.subchat.loadSubreddits(true);
		};
	
		// Keep note if we have loaded the channels from storage or elsewhere yet
		this.channels_loaded = false;
	
		this.setWorkspace = function (instance) {
			_this.toggleSidebar(false);
			_this.workspace_instance = instance;
		};
	
		// Get the view function for the active room. (generates the DOM structure)
		this.activeWorkspaceView = function () {
			if (_this.workspace_instance) {
				return _this.workspace_instance;
			}
	
			// Not logged in? Show the homepage only
			if (!_this.subchat.username()) {
				return _this.home;
			}
	
			var active_room = _this.rooms.active();
			return active_room ? active_room : _this.home;
		};
	
		// Toggle the app
		this.toggle = function () {
			_this.state.set('is_open', !_this.state('is_open'));
			_this.bus.trigger('app.toggle', _this.state('is_open'));
		};
	
		this.toggleSidebar = function (should_open) {
			if (typeof should_open === 'undefined') {
				should_open = !_this.state('is_sidebar_open');
			}
	
			_this.state.set('is_sidebar_open', !!should_open);
			_this.bus.trigger('app.toggle_sidebar', _this.state('is_sidebar_open'));
		};
	
		// Determine the classes for the app
		this.appClasses = function () {
			var classes = 'OC__ui';
	
			if (!_this.state('is_open')) {
				classes = classes + ' OC__ui--closed ';
			}
	
			if (!_this.state('is_sidebar_open')) {
				classes = classes + ' OC__ui--sidebar-collapsed ';
			}
	
			if (_ModeratorToolbox2.default.isActive()) {
				classes = classes + ' OC__ui--toolbox ';
			}
	
			if (!_this.is_in_reddit) {
				classes = classes + ' OC__ui--standalone';
			}
	
			if (!_this.subchat.username()) {
				classes = classes + ' OC__ui--loggedout';
			}
	
			return classes;
		};
	
		// Once we're ready (logged in, app is ready) then we show the active rooms
		this.addInitialRooms = function () {
			var default_channel = '/r/OrangeChat';
			var channel_list = _this.state.get('channel_list') || [];
			var active_channel = _this.state.get('active_channel');
			var channel_in_url = !_this.is_in_reddit && window.location.hash ? window.location.hash.substring(1).split(',')[0] : null;
	
			if (!channel_list.length) {
				_this.rooms.createRoom(default_channel);
			} else {
				_.each(channel_list, function (channel_state) {
					// Upgrade the list of string based channel names from older OC versions to objects
					if (typeof channel_state === 'string') {
						channel_state = {
							name: channel_state
						};
					}
	
					var channel = _this.rooms.createRoom(channel_state.name, {
						label: channel_state.label,
						read_upto: channel_state.read_upto || 0,
						access: channel_state.access,
						linked_channels: channel_state.linked_channels
					});
				});
			}
	
			//if (Reddit.currentSubreddit()) {
			//	this.rooms.createRoom('/r/' + Reddit.currentSubreddit());
			//}
	
			// If we had a channel specified in the URL, make sure it exists and set it as the defualt channel
			if (channel_in_url) {
				if (!_this.rooms.getRoom(channel_in_url)) {
					_this.rooms.createRoom(channel_in_url);
				}
				active_channel = channel_in_url;
			}
	
			// If our active channel no longer exists, set the first channel active instead
			if (!_this.rooms.setActive(active_channel || default_channel) === false) {
				_this.rooms.setIndexActive(0);
			}
	
			_this.channels_loaded = true;
			_this.bus.trigger('channels.loaded');
		};
	
		this.saveChannelState = function (new_channel) {
			// Don't save channel state is we haven't got it yet
			if (!_this.channels_loaded) {
				return;
			}
	
			var channels = _.map(_this.rooms.rooms, function (channel) {
				return {
					name: channel.instance.name(),
					label: channel.instance.label(),
					read_upto: channel.instance.read_upto,
					access: channel.instance.access,
					linked_channels: channel.instance.linked_channels
				};
			});
	
			_this.state.set('channel_list', channels);
		};
	
		// Harsh hack to speed up redrawing
		// The way the CSS is structured leaves huge white breaks between redraws
		// if the height is increased. This forces a redraw to mask it.
		// TODO: Have the CSS background colours on the wrapping elemements, not the
		// individual content elements
		window.onresize = function () {
			m.redraw();
		};
	
		// Keep track of our channels state on a few events
		this.bus.on('channel.created', this.saveChannelState);
		this.bus.on('channel.close', this.saveChannelState);
		window.onunload = this.saveChannelState;
	
		// Toggle the app
		this.bus.on('action.toggle_app', this.toggle);
	
		// Toggle the sidebar
		this.bus.on('action.toggle_sidebar', this.toggleSidebar);
	
		this.bus.on('action.close_workspace', function () {
			_this.workspace_instance = null;
			// Go back to the channel view, with the channel list
			_this.toggleSidebar(true);
		});
	
		this.bus.on('action.show_settings', function () {
			_this.setWorkspace(Helpers.subModule(_Settings2.default, {
				bus: _this.bus
			}));
		});
	
		// Keep track of the active channel between page refreshes
		this.bus.on('channel.active', function (active_channel, previous_channel) {
			if (active_channel) {
				_this.state.set('active_channel', active_channel.name());
	
				// Remove any active workspace so this channel can be shown
				_this.workspace_instance = null;
			}
		});
	
		// Keep a few components updated when our state changes
		this.bus.on('state.change', function (changed, new_value, old_value, values) {
			// If our session ID has changed, update the transport so it's in sync
			// Eg. First logging in, the session ID is not available for the transport. After
			// logged in and the session is created, the transport is then safe to connect.
			if (changed === 'sid' && new_value !== old_value) {
				_this.transport.setSessionId(new_value);
			}
	
			// The channel list state may have been updated by the extension, so lets
			// go through it and merge any changes as needed
			if (changed === 'channel_list') {
				var channel_list = _this.state.get('channel_list') || [];
				// First, remove any channels not in the state
				_.each(_this.rooms.rooms, function (channel) {
					var chan_in_state = !!_.find(channel_list, function (item) {
						return item.name.toLowerCase() === channel.instance.name().toLowerCase();
					});
	
					if (!chan_in_state) {
						_this.rooms.closeRoom(channel.instance.name());
					}
				});
	
				// Now add any new channels
				_.each(channel_list, function (channel_state) {
					var channel = _this.rooms.createRoom(channel_state.name, {
						label: channel_state.label,
						read_upto: channel_state.read_upto || 0,
						access: channel_state.access,
						linked_channels: channel_state.linked_channels
					});
	
					// Make sure we have the most recent read_upto value
					if (channel.instance.read_upto < channel_state.read_upto) {
						channel.instance.read_upto = channel_state.read_upto;
					}
				});
			}
		});
	
		// Pipe some messages from transport into relevant bus events
		this.bus.on('transport.message', function (message) {
			if (message.author && message.target) {
				// Add some user-application specific properties to the message
				if (message.content.match(new RegExp('\\b' + _this.subchat.username() + '\\b', 'i'))) {
					message.is_highlight = true;
				}
	
				_this.bus.trigger('im.message', message);
			}
	
			// Messages sent specifically for this user
			if (message.type && message.payload) {
				_this.bus.trigger('message.' + message.type, message.payload);
			}
		});
		this.bus.on('transport.groupmeta', function (groups) {
			_this.bus.trigger('im.meta', groups);
		});
	
		// Convert some document events into bus events
		$(document).on('click', function (event) {
			// This event comes from outside the mithrill application so we need to handle
			// the redraw ourselves
			m.startComputation();
			_this.bus.trigger('action.document_click', event);
			m.endComputation();
		});
	
		if (Helpers.isInReddit()) {
			_Reddit2.default.injectUserbarIcon(this, this.bus);
			_Reddit2.default.hookOcButtons(this.bus);
		}
	
		// The ping call will check that we are logged in, but since the mojority of the time
		// the user wouldn't have been logged out for no reason then we start by checking the local
		// state (subchat.username()) below while the ping call is in progress
		this.subchat.ping().then(function (user_data) {
			if (user_data.just_logged_in) {
				_this.addInitialRooms();
			}
	
			// The user channel lets us broadcast+receive data between all of the instances the
			// user has open. Browser tabs, devices, different browsers, etc.
			if (user_data.user_channel) {
				_this.transport.join(user_data.user_channel);
			}
	
			// Update our existing channels if any differ
			_.map(user_data.channels, function (channel) {
				var our_channel = _this.rooms.getRoom(channel.name);
				// TODO: Replace the 2 with the ACCESS_TYPE_* constants
				if (!our_channel && channel.access_type === 2) {
					// Do we want to add all of our invited channels from other devices/tabs
					// to this channel list? Then uncomment below
					//our_channel = this.rooms.createRoom(channel.name, {label: channel.label});
	
				}
	
				if (!our_channel) {
					return;
				}
	
				if (channel.type === 3 && channel.access_type === 2 && channel.other_user) {
					// Private channels which we have an invite for along with 1 other person (PM) will
					// have .other_user as the other persons username
					our_channel.instance.label(channel.other_user);
				} else if (channel.label !== our_channel.instance.label()) {
					our_channel.instance.label(channel.label);
				}
			});
		});
	
		// Start checking for the user auth
		if (!this.subchat.username()) {} else {
			// Add a few channels/rooms
			this.addInitialRooms();
		}
	};
	
	ChatApp.view = function (controller) {
		var content = [controller.top_bar.view()];
	
		if (controller.state('is_open')) {
			content.push(m('div[class="OC__shadow-underlay"]', [m('div', { class: 'OC__shadow-underlay-inner' })]));
	
			if (controller.subchat.username()) {
				content.push(controller.side_bar.view());
			}
	
			content.push(m('div', { class: 'OC__workspace' }, [controller.activeWorkspaceView()]));
		}
	
		return m('div', {
			id: 'chat-inner',
			class: controller.appClasses()
		}, [content]);
	};
	
	exports.default = ChatApp;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./ChatApp.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./ChatApp.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC__ui {\n  position: fixed;\n  bottom: 0;\n  right: 20px;\n  width: 570px;\n  height: 360px;\n  background-color: #fff;\n  box-shadow: 0 0 28px rgba(0,0,0,0.3);\n  z-index: 2147483647;\n  -webkit-transition: width 175ms ease;\n  transition: width 175ms ease;\n  overflow: hidden;\n  -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%;\n  -webkit-font-smoothing: subpixel-antialiased;\n  text-rendering: optimizelegibility;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;\n  font-size: 14px;\n  color: rgba(0,0,0,0.87);\n  line-height: 20px;\n  line-height: 1.428571428571429em;\n}\n.OC__ui a {\n  text-decoration: none;\n}\n.OC__ui *,\n.OC__ui *:before,\n.OC__ui *:after {\n  box-sizing: border-box;\n}\n.OC__ui--sidebar-collapsed,\n.OC__ui--loggedout {\n  width: 350px;\n}\n.OC__ui--loggedout {\n  height: 200px;\n}\n.OC__ui--closed {\n  width: auto;\n  height: auto;\n  background-color: #ff5722;\n}\n.OC__ui--toolbox {\n  bottom: 25px;\n  z-index: 2147483645;\n}\n.OC__ui--standalone {\n  width: 100%;\n  height: 100%;\n  right: 0;\n  box-shadow: none;\n  -webkit-transition: none;\n  transition: none;\n}\n.OC__shadow-underlay {\n  overflow: hidden;\n  position: absolute;\n  z-index: 79;\n  left: 0;\n  top: 10px;\n  right: 0;\n  height: 56px;\n}\n.OC__shadow-underlay-inner {\n  position: absolute;\n  left: 0;\n  top: -10px;\n  right: 0;\n  height: 48px;\n  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);\n}\n.OC__workspace {\n  position: absolute;\n  width: calc(100% - 220px);\n  height: 100%;\n  left: 220px;\n  top: 0;\n  background-color: #fff;\n  -webkit-transition: left 175ms ease, width 175ms ease;\n  transition: left 175ms ease, width 175ms ease;\n}\n.OC__ui--standalone .OC-Sidebar__header-collapse {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.OC__ui--loggedout .OC__shadow-underlay {\n  display: none;\n}\n.OC__ui--sidebar-collapsed .OC__workspace,\n.OC__ui--loggedout .OC__workspace {\n  left: 0;\n  width: 100%;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header {\n  background-color: #ff5722;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-collapse {\n  left: 16px;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-collapse svg {\n  fill: rgba(255,255,255,0.5);\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-info {\n  left: 56px;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-info h4 {\n  color: #fff;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-tabs-item svg {\n  fill: rgba(255,255,255,0.5);\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-tabs-item--active svg {\n  fill: #fff;\n}\n.OC__ui--sidebar-collapsed .OC-MessageRoom__header-info {\n  color: #fff;\n}\n.OC__workspace-content {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 46px;\n  overflow-y: auto;\n  padding: 16px;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(10);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _MessageRoom = __webpack_require__(12);
	
	var _MessageRoom2 = _interopRequireDefault(_MessageRoom);
	
	var _Reddit = __webpack_require__(15);
	
	var _Reddit2 = _interopRequireDefault(_Reddit);
	
	var _OptionsMenu = __webpack_require__(29);
	
	var _OptionsMenu2 = _interopRequireDefault(_OptionsMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * The sidebar UI
	 */
	var Sidebar = {};
	
	Sidebar.controller = function (args) {
		var _this = this;
	
		this.app = args.app;
		this.mods = m.prop(0);
		this.is_join_dialog_open = false;
	
		// When there's a menu to show, this will be it
		this.options_menu = null;
	
		// Keep track of the join channel scroll position between renders
		this.join_channels_scrolltop = m.prop(0);
		this.join_channel_input = m.prop('');
	
		this.closeChannel = function (channel_name) {
			_this.app.rooms.closeRoom(channel_name);
		};
	
		this.onOptionsMenuItemClick = function (event) {
			_this.stopEventPropagation(event);
			_this.options_menu = Helpers.subModule(_OptionsMenu2.default, {
				bus: _this.app.bus
			});
			_this.options_menu.instance.once('close', function () {
				_this.options_menu = null;
			});
		};
	
		this.openJoinDialog = function (event) {
			_this.stopEventPropagation(event);
			_this.is_join_dialog_open = true;
	
			if (_this.app.subreddits().length === 0) {
				_this.app.subreddits.refresh();
			}
	
			_this.app.bus.once('action.document_click', _this.closeJoinDialog);
		};
	
		this.closeJoinDialog = function () {
			_this.is_join_dialog_open = false;
		};
	
		this.joinChannelFormSubmit = function (event) {
			_this.stopEventPropagation(event);
			var sub_name = _this.join_channel_input();
			_this.join_channel_input('');
	
			// Make sure we actually have characters
			if ((sub_name || '').replace(/[^a-z0-9]/, '')) {
				// Normalise the /r/ formatting
				if (sub_name.toLowerCase().indexOf('r/') === 0) {
					sub_name = '/' + sub_name;
				} else if (sub_name.toLowerCase().indexOf('/r/') !== 0) {
					sub_name = '/r/' + sub_name;
				}
	
				var room = _this.app.rooms.createRoom(sub_name);
				_this.app.rooms.setActive(room.instance.name());
				_this.closeJoinDialog();
	
				// Clear the entry box
				$(event.target).find('input').val('');
			}
	
			// Make sure the form does not actually submit anywhere
			return false;
		};
	
		this.stopEventPropagation = function (event) {
			event = $.event.fix(event);
			event.stopPropagation();
			return event;
		};
	};
	
	Sidebar.view = function (controller) {
		var channels = [];
		var sub_channels = Object.create(null);
		var list = [];
	
		// Separate the main channels and their subchannels
		_.each(controller.app.rooms.rooms, function (channel) {
			var chan = channel.instance;
			var parent_chan_name;
	
			// Main channels don't have a parent
			if (!chan.linked_channels.parent) {
				channels.push(channel);
			} else {
				parent_chan_name = chan.linked_channels.parent.name;
				sub_channels[parent_chan_name] = sub_channels[parent_chan_name] || [];
				sub_channels[parent_chan_name].push(channel);
			}
		});
	
		// Add each channel entry to the list, followed by its subchannels
		_.each(channels, function (channel, idx) {
			list.push(Sidebar.viewChannelListItem(controller, channel));
			_.each(sub_channels[channel.instance.transportSafeRoomName()], function (channel) {
				list.push(Sidebar.viewChannelListItem(controller, channel, {
					subchannel: true
				}));
			});
		});
	
		return m('div', { class: !controller.is_join_dialog_open ? 'OC-Sidebar' : 'OC-Sidebar OC-Sidebar--join-dialog-open' }, [m('div', { class: 'OC-Sidebar__header' }, [m('form', { class: 'OC-Sidebar__header-search', onsubmit: controller.joinChannelFormSubmit }, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="16"][height="16"][viewBox="0 0 24 24"]', [m('path[d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"]')]), m('input', {
			type: 'text',
			class: 'OC-Sidebar__header-search-input',
			placeholder: 'r/subreddit',
			onfocus: controller.openJoinDialog,
			onclick: controller.stopEventPropagation,
			onkeyup: m.withAttr('value', controller.join_channel_input)
		})]), controller.is_join_dialog_open ? Sidebar.viewJoinDialog(controller) : null, m('div[class="OC-Sidebar__header-user-options"]', { onclick: controller.onOptionsMenuItemClick }, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"]')])]), controller.options_menu ? controller.options_menu.view() : null]), m('ul', { class: controller.app.rooms.rooms.length > 0 ? 'OC-Sidebar__channels' : 'OC-Sidebar__channels OC-Sidebar__channels--no-channels' }, [
		// m('div', {class: 'OC-Sidebar__channels-header'}, [
		// 	// m('a', {class: 'OC-Sidebar__channels-header-branding', href: 'https://orangechat.io', target: '_blank'}, [
		// 	// 	m('img[src="https://app.orangechat.io/assets/logo-white.svg"][width="16"][height="16"][alt="orangechat.io"]')
		// 	// ]),
		// 	m('div', {class: 'OC-Sidebar__channels-header-title'}, [
		// 		m('h4', 'Channels')
		// 	]),
		// 	m('ul', {class: 'OC-Sidebar__channels-header-tabs'}, [
		// 		m('li', {class: 'OC-Sidebar__channels-header-tabs-item'}, [
		// 			m('a', {onclick: controller.toggleJoinDialog}, [
		// 				m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="16"][height="16"][viewBox="0 0 320 512"]', [
		// 					m('path[d="M192 224v-128h-64v128h-128v64h128v128h64v-128h128v-64h-128z"]')
		// 				])
		// 			])
		// 		])
		// 	])
		// ]),
		controller.app.rooms.rooms.length > 0 ? list : m('p', "Seems like you're not in any channels.")])]);
	};
	
	// m('div', {class: 'OC-Sidebar__footer'}, [
	// 	m('div', {class: 'OC-Sidebar__footer-user'}, [
	// 		m('span', controller.app.subchat.username()),
	// 		m('div', {class: 'OC-Sidebar__footer-user-expand'}, [
	// 			m('a', [
	// 				m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="16"][height="16"][viewBox="0 0 320 512"]', [
	// 					m('path[d="M160 128l-160 160 64 64 96-96 96 96 64-64-160-160z"]')
	// 				])
	// 			])
	// 		])
	// 	]),
	// m('ul', {class: 'OC-Sidebar__footer-tabs'}, [
	// 	m('li', {class: 'OC-Sidebar__footer-tabs-item'}, [
	// 		m('a', {onclick: controller.toggleJoinDialog}, [
	// 			m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="16"][height="16"][viewBox="0 0 320 512"]', [
	// 				m('path[d="M192 224v-128h-64v128h-128v64h128v128h64v-128h128v-64h-128z"]')
	// 			]),
	// 			controller.is_join_dialog_open ? Sidebar.viewJoinDialog(controller) : null
	// 		])
	// 	])
	// ])
	// m('div', {
	// 	class: 'OC-Sidebar__footer-settings',
	// 	onclick: controller.onOptionsMenuItemClick
	// }, [
	// 	m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="16"][height="16"][viewBox="0 0 768 768"]', [
	// 		m('path[d="M384 0q39.75 0 67.875 28.125t28.125 67.875v16.5q11.75 4 28.25 11.5l11.5-11.5q28.25-28.25 68-28.25 39.5 0 67.75 28.25t28.25 67.75q0 39.75-28.25 68l-11.5 11.5q7.5 16.5 11.5 28.25h16.5q39.75 0 67.875 28.125t28.125 67.875-28.125 67.875-67.875 28.125h-16.5q-4 11.75-11.5 28.25l11.5 11.5q28.25 28.25 28.25 68 0 39.5-28.25 67.75t-67.75 28.25q-39.75 0-68-28.25l-11.5-11.5q-16.5 7.5-28.25 11.5v16.5q0 39.75-28.125 67.875t-67.875 28.125-67.875-28.125-28.125-67.875v-16.5q-11.75-4-28.25-11.5l-11.5 11.5q-28.25 28.25-67.75 28.25-39.75 0-67.875-28.25t-28.125-67.75q0-40 28-68l11.5-11.5q-7.5-16.5-11.5-28.25h-16.5q-39.75 0-67.875-28.125t-28.125-67.875 28.125-67.875 67.875-28.125h16.5q4-11.75 11.5-28.25l-11.5-11.5q-28-28-28-68 0-39.5 28.125-67.75t67.875-28.25q39.5 0 67.75 28.25l11.5 11.5q16.5-7.5 28.25-11.5v-16.5q0-39.75 28.125-67.875t67.875-28.125zM384 64q-13.25 0-22.625 9.375t-9.375 22.625v66.25q-56 8-102.25 42.25l-46.75-46.75q-9.5-9.5-22.5-9.5-13.25 0-22.625 9.375t-9.375 22.625q0 13.5 9.25 22.75l46.75 46.75q-34.25 46.25-42.25 102.25h-66.25q-13.25 0-22.625 9.375t-9.375 22.625 9.375 22.625 22.625 9.375h66.25q8 56 42.25 102.25l-46.75 46.75q-9.25 9.25-9.25 22.75 0 13.25 9.375 22.625t22.625 9.375q13 0 22.5-9.5l46.75-46.75q46.25 34.25 102.25 42.25v66.25q0 13.25 9.375 22.625t22.625 9.375 22.625-9.375 9.375-22.625v-66.25q56-8 102.25-42.25l46.75 46.75q9.5 9.5 22.75 9.5t22.625-9.375 9.375-22.625-9.5-22.75l-46.75-46.75q34.25-46.25 42.25-102.25h66.25q13.25 0 22.625-9.375t9.375-22.625-9.375-22.625-22.625-9.375h-66.25q-8-56-42.25-102.25l46.75-46.75q9.5-9.5 9.5-22.75t-9.375-22.625-22.625-9.375-22.75 9.5l-46.75 46.75q-46.25-34.25-102.25-42.25v-66.25q0-13.25-9.375-22.625t-22.625-9.375zM384 256q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5zM384 320q-26.5 0-45.25 18.75t-18.75 45.25 18.75 45.25 45.25 18.75 45.25-18.75 18.75-45.25-18.75-45.25-45.25-18.75z"]')
	// 	]),
	// 	controller.options_menu ? controller.options_menu.view() : null
	// ])
	// ]),
	Sidebar.viewChannelListItem = function (controller, channel, opts) {
		var unread_badge;
		var list_item;
		var item_classes = '';
	
		opts = opts || {};
	
		if (channel.instance.unread_counter > 0) {
			unread_badge = m('span', {
				class: 'OC-Sidebar__channels-item-badge',
				title: 'Unread messages'
			}, channel.instance.unread_counter);
		}
	
		item_classes = 'OC-Sidebar__channels-item';
		if (controller.app.rooms.active() === channel) {
			item_classes += ' OC-Sidebar__channels-item--active';
		}
		if (opts.subchannel) {
			item_classes += ' OC-Sidebar__channels-item--sub-channel';
		}
	
		var num_users_text = channel.instance.num_users();
		num_users_text = num_users_text === 1 ? num_users_text + ' person here' : num_users_text + ' people here';
	
		list_item = m('li', {
			class: item_classes,
			onclick: function onclick() {
				controller.app.rooms.setActive(channel.instance.name());
			}
		}, [m('div', { class: 'OC-Sidebar__channels-item-left' }, [m('span', { class: 'OC-Sidebar__channels-item-name' }, channel.instance.displayLabel()), m('span', { class: 'OC-Sidebar__channels-item-sub-name' }, num_users_text)]), unread_badge, m('svg[class="OC-Sidebar__channels-item-close"][version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', {
			onclick: channel.instance.close
		}, [m('path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]')])]);
	
		return list_item;
	};
	
	Sidebar.viewJoinDialog = function (controller) {
		var subscribed_sub_count = 0;
		var current_search = controller.join_channel_input().toLowerCase();
	
		var subreddit_list = _.map(controller.app.subreddits(), function (sub) {
			subscribed_sub_count++;
	
			var sub_compare = sub.name.toLowerCase();
			if (sub_compare.indexOf(current_search.replace('/r/', '')) > -1) {
				return sub.name;
			}
		});
		if (_Reddit2.default.currentSubreddit()) {
			subreddit_list.unshift('/r/' + _Reddit2.default.currentSubreddit());
		}
		subreddit_list = _.compact(subreddit_list);
	
		subreddit_list = _.map(subreddit_list, function (sub_name) {
			return m('li', {
				class: 'OC-Sidebar__join-dialog-channels-item',
				onclick: function onclick(event) {
					controller.stopEventPropagation(event);
					var room = controller.app.rooms.createRoom(sub_name);
					controller.app.rooms.setActive(room.instance.name());
					controller.closeJoinDialog();
				}
			}, sub_name);
		});
	
		if (!subscribed_sub_count) {
			subreddit_list.push(m('div', { class: 'OC-Sidebar__join-dialog-channels-loading' }, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="30"][height="30"][viewBox="25 25 50 50"]', [m('circle[fill="none"][stroke-width="4"][stroke-miterlimit="10"][cx="50"][cy="50"][r="20"]')])]));
		}
	
		return m('div', { class: 'OC-Sidebar__join-dialog' }, [m('ul', {
			class: 'OC-Sidebar__join-dialog-channels',
			onscroll: m.withAttr('scrollTop', controller.join_channels_scrolltop),
			config: function config(el, already_initialised) {
				if (already_initialised) {
					return;
				}
				// Keep our scroll position when we get redrawn
				el.scrollTop = controller.join_channels_scrolltop();
			}
		}, subreddit_list)]);
	};
	
	exports.default = Sidebar;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Sidebar.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Sidebar.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-Sidebar {\n  width: 220px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  background-color: #ff5722;\n}\n.OC-Sidebar__header {\n  position: absolute;\n  height: 48px;\n  left: 0;\n  right: 0;\n  top: 0;\n  background-color: #ff5722;\n  z-index: 80;\n  color: #fff;\n}\n.OC-Sidebar__header-search {\n  padding: 9px 56px 0 16px;\n  position: relative;\n  z-index: 101;\n}\n.OC-Sidebar__header-search svg {\n  fill: rgba(255,255,255,0.7);\n  position: absolute;\n  top: 16px;\n  left: 26px;\n  pointer-events: none;\n}\n.OC-Sidebar__header-search-input {\n  height: 30px;\n  font-size: 1em;\n}\n.OC-Sidebar__header-search input {\n  display: block;\n  width: 100%;\n  border-radius: 3px;\n  padding-left: 37px;\n  padding-right: 16px;\n  border: 0;\n  color: rgba(255,255,255,0.7);\n  background-color: rgba(255,255,255,0.25);\n  position: relative;\n}\n.OC-Sidebar__header-search input::-webkit-input-placeholder {\n  color: rgba(255,255,255,0.7);\n}\n.OC-Sidebar__header-search input::-moz-placeholder {\n  color: rgba(255,255,255,0.7);\n}\n.OC-Sidebar__header-search input:-ms-input-placeholder {\n  color: rgba(255,255,255,0.7);\n}\n.OC-Sidebar__header-search input::placeholder {\n  color: rgba(255,255,255,0.7);\n}\n.OC-Sidebar__header-search input:focus {\n  outline: 0;\n  color: rgba(0,0,0,0.54);\n}\n.OC-Sidebar__header-search input:focus::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-Sidebar__header-search input:focus::-moz-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-Sidebar__header-search input:focus:-ms-input-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-Sidebar__header-search input:focus::placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-Sidebar__header-user-options {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 24px;\n  margin: 13px 16px 0 16px;\n  cursor: pointer;\n  z-index: 102;\n}\n.OC-Sidebar__header-user-options svg {\n  fill: rgba(255,255,255,0.5);\n  height: auto;\n  display: inline-block;\n}\n.OC-Sidebar__header-collapse {\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  margin-top: -12px;\n  fill: rgba(255,255,255,0.5);\n  cursor: pointer;\n  display: inline-block;\n}\n.OC-Sidebar--join-dialog-open .OC-Sidebar__header-search svg {\n  fill: rgba(0,0,0,0.54);\n}\n.OC-Sidebar--join-dialog-open .OC-Sidebar__header-search {\n  opacity: 1;\n  pointer-events: auto;\n}\n.OC-Sidebar--join-dialog-open .OC-Sidebar__header-search-control {\n  fill: rgba(0,0,0,0.87);\n  left: 32px;\n  margin-top: -2px;\n}\n.OC-Sidebar__channels {\n  position: absolute;\n  top: 48px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  overflow-y: auto;\n}\n.OC-Sidebar__channels--no-channels p {\n  padding: 10px 16px;\n  font-size: 1em;\n  color: rgba(255,255,255,0.5);\n}\n.OC-Sidebar__channels-item {\n  padding: 10px 16px;\n  cursor: pointer;\n  position: relative;\n}\n.OC-Sidebar__channels-item-name {\n  font-size: 1em;\n  display: block;\n  color: #fff;\n  font-weight: 500;\n}\n.OC-Sidebar__channels-item-sub-name {\n  font-size: 0.857142857142857em;\n  color: rgba(255,255,255,0.7);\n  display: block;\n}\n.OC-Sidebar__channels-item-close {\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  margin-top: -12px;\n  fill: rgba(255,255,255,0.7);\n  cursor: pointer;\n  display: none;\n  padding: 2px;\n  border: 1px solid rgba(255,255,255,0.7);\n  border-radius: 50%;\n}\n.OC-Sidebar__channels-item-badge {\n  display: inline-block;\n  color: rgba(255,255,255,0.7);\n  font-size: 0.857142857142857em;\n  height: 18px;\n  padding: 0 8px;\n  border: 1px solid rgba(255,255,255,0.7);\n  border-radius: 10px;\n  line-height: 1;\n  padding-top: 2px;\n  position: absolute;\n  right: 16px;\n  top: 50%;\n  margin-top: -9px;\n  text-align: center;\n}\n.OC-Sidebar__channels-item:hover {\n  background-color: #f4511e;\n}\n.OC-Sidebar__channels-item:hover .OC-Sidebar__channels-item-close {\n  display: block;\n}\n.OC-Sidebar__channels-item:hover .OC-Sidebar__channels-item-badge {\n  display: none;\n}\n.OC-Sidebar__channels-item--sub-channel {\n  padding: 10px 16px 10px 32px;\n  margin-bottom: 8px;\n}\n.OC-Sidebar__channels-item--sub-channel .OC-Sidebar__channels-item-name {\n  font-size: 1em;\n}\n.OC-Sidebar__channels-item--sub-channel .OC-Sidebar__channels-item-sub-name {\n  display: none;\n}\n.OC-Sidebar__channels-item--active {\n  background-color: #e64a19;\n}\n.OC-Sidebar__channels-item--active:hover {\n  background-color: #e64a19;\n}\n.OC-Sidebar__join-dialog {\n  z-index: 101;\n  display: block;\n  position: absolute;\n  z-index: 100;\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14), 0 0px 5px 0 rgba(0,0,0,0.12), 0 2px 1px -2px rgba(0,0,0,0.2);\n  padding: 10px 0;\n  padding-top: 30px;\n  left: 16px;\n  top: 9px;\n  right: 16px;\n}\n.OC-Sidebar__join-dialog-channels {\n  max-height: 250px;\n  border-top: 1px solid rgba(0,0,0,0.13);\n  overflow-y: auto;\n  overflow-x: hidden;\n  margin-top: 10px;\n  padding-top: 10px;\n}\n.OC-Sidebar__join-dialog-channels-loading {\n  position: relative;\n  margin: 0px auto;\n  width: 24px;\n  padding: 10px 0;\n}\n.OC-Sidebar__join-dialog-channels-loading:before {\n  content: '';\n  display: block;\n  padding-top: 100%;\n}\n.OC-Sidebar__join-dialog-channels-loading svg {\n  -webkit-animation: rotate 2s linear infinite;\n          animation: rotate 2s linear infinite;\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n}\n.OC-Sidebar__join-dialog-channels-loading svg circle {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;\n          animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;\n  stroke-linecap: round;\n}\n.OC-Sidebar__join-dialog-channels-item {\n  cursor: pointer;\n  color: rgba(0,0,0,0.87);\n  font-size: 1em;\n  padding: 10px 16px;\n  display: block;\n}\n.OC-Sidebar__join-dialog-channels-item:hover {\n  background-color: rgba(0,0,0,0.04);\n}\n@-webkit-keyframes rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@-webkit-keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n  }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n  }\n}\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n  }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n  }\n}\n@-webkit-keyframes color {\n  100%, 0% {\n    stroke: #f44336;\n  }\n  40% {\n    stroke: #3f51b5;\n  }\n  66% {\n    stroke: #4caf50;\n  }\n  80%, 90% {\n    stroke: #ffc107;\n  }\n}\n@keyframes color {\n  100%, 0% {\n    stroke: #f44336;\n  }\n  40% {\n    stroke: #3f51b5;\n  }\n  66% {\n    stroke: #4caf50;\n  }\n  80%, 90% {\n    stroke: #ffc107;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(13);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _Reddit = __webpack_require__(15);
	
	var _Reddit2 = _interopRequireDefault(_Reddit);
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	var _Model = __webpack_require__(17);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _Message = __webpack_require__(18);
	
	var _Message2 = _interopRequireDefault(_Message);
	
	var _MessageParser = __webpack_require__(21);
	
	var _MessageParser2 = _interopRequireDefault(_MessageParser);
	
	var _Notifications = __webpack_require__(23);
	
	var Notifications = _interopRequireWildcard(_Notifications);
	
	var _Panel = __webpack_require__(24);
	
	var _Panel2 = _interopRequireDefault(_Panel);
	
	var _UserPanel = __webpack_require__(27);
	
	var _UserPanel2 = _interopRequireDefault(_UserPanel);
	
	var _GroupSettings = __webpack_require__(28);
	
	var _GroupSettings2 = _interopRequireDefault(_GroupSettings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var ACCESS_TYPE_BAN = 1;
	var ACCESS_TYPE_INVITE = 2;
	var ACCESS_TYPE_REDDIT_MOD = 3;
	
	/**
	 * The message room (channel) UI.
	 * Contains thread listing
	 */
	var MessageRoom = {};
	
	MessageRoom.controller = function (args) {
		var _this = this;
	
		this.name = m.prop(args.name);
		this.label = m.prop(args.label);
		this.current_message = m.prop('');
		this.num_users = m.prop(0);
		this.known_usernames = m.prop([]);
		this.bus = args.bus;
		this.room_manager = args.room_manager;
		this.subchat = _Subchat2.default.instance();
		this.message_parser = new _MessageParser2.default(null, this.known_usernames);
	
		this.access = args.access || {
			is_reddit_mod: false,
			is_admin: false,
			is_invite: false
		};
	
		// Associated channels such as the mod only channel
		this.linked_channels = args.linked_channels || {};
	
		this.is_active = false;
		this.messages = m.prop([
			//{author: 'prawnsalad', content: 'ello '+this.name()+'! This is my room. There are many like it, but this one is mine.'}
		]);
	
		// Unread messages
		this.unread_counter = 0;
	
		// An unread message mentions us
		this.unread_highlight = false;
	
		// Timestamp of the last message we read
		this.read_upto = args.read_upto || 0;
	
		// Timestamp of the last message we have received
		this.received_upto = 0;
	
		// Keep track of the thread scroll position between renders
		this.thread_scrolltop = m.prop(0);
		this.thread_autoscroll = true;
	
		// A component instance that gets rendered instead of the message thread
		this.open_panel = null;
	
		this.transportSafeRoomName = function () {
			return _this.name().toLowerCase().replace('/r/', 'reddit_sub_');
		};
	
		this.displayLabel = function () {
			return _this.label() || _this.name();
		};
	
		this.resetCounters = function () {
			_this.unread_counter = 0;
			_this.unread_highlight = false;
	
			var last_message = _.last(_this.messages());
			if (last_message) {
				_this.read_upto = last_message.data.created;
			}
		};
	
		// When we send a message we attach a random ID (match ID) that we can identify as
		// it comes back. This lets us add a message to the view before it gets sent for instant
		// user feedback and detect it as we see it come back to update our displayed
		// version of the message. Each channel gets a random prefix so that we can safely
		// use an incrementing counter easily.
		this.generateMessageMatchId = function () {
			var next_id = 0;
			var prefix = Math.floor(Math.random() * 100000000000).toString(36);
			return function () {
				var id = next_id++;
				return prefix + next_id.toString(36);
			};
		}();
	
		this.bus.on('channel.active', function (new_channel, old_channel) {
			if (new_channel === _this) {
				_this.resetCounters();
				_this.thread_autoscroll = true;
			}
		});
	
		this.bus.on('app.toggle', function (is_open) {
			if (is_open && _this.is_active) {
				_this.resetCounters();
			}
		});
	
		this.bus.on('im.message', function (message_raw) {
			if (message_raw.target !== _this.transportSafeRoomName()) {
				return;
			}
	
			var messages = _this.messages();
	
			var new_message = new _Model2.default(message_raw);
			new_message.display = _this.message_parser.parseAll(new_message);
	
			// Any messages we send will have a .matchid property only known to us. Check
			// if we have that matchid in our messages so we don't add it again
			var existing_message;
			if (new_message.matchid) {
				existing_message = _.find(messages, function (message) {
					return message.data.matchid === new_message.matchid;
				});
			}
	
			// This message may already exist if we sent it ourselves, so update it
			if (existing_message) {
				existing_message.data.fromObj(new_message);
			} else if (new_message.created > _this.received_upto) {
				// Only add new messages if they don't appear from the past
				_this.addMessage(new_message);
	
				if (_this.known_usernames().indexOf(new_message.author.toLowerCase()) === -1) {
					_this.known_usernames().push(new_message.author.toLowerCase());
				}
			}
	
			m.redraw();
	
			var our_username = _this.subchat.username();
			var is_our_message = our_username.toLowerCase() === new_message.author.toLowerCase();
			var has_focus = Helpers.isAppActive() && _this.is_active;
	
			// We know the time of the last message we read was, so anything before it
			// is also considered as read
			if (!is_our_message && !has_focus && new_message.created > _this.read_upto) {
				_this.unread_counter++;
	
				if (new_message.content.toLowerCase().indexOf(our_username.toLowerCase()) > -1) {
					_this.unread_highlight = true;
	
					// We only need the desktop notification if this page is not in focus
					if (!Helpers.isAppActive()) {
						_this.notify('Somebody mentioned you!', new_message.author + ': ' + new_message.content);
					}
				}
			}
	
			// Only move our read_upto position forward if this channel is active.
			// Never move it backwards... that just makes no sense.
			if (has_focus && new_message.created > _this.read_upto) {
				_this.read_upto = new_message.created;
			}
	
			_this.received_upto = _.last(messages).data.created;
		});
	
		this.bus.on('im.meta', function (groups) {
			var this_name = _this.transportSafeRoomName().toLowerCase();
			if (!groups[this_name]) {
				return;
			}
	
			_this.num_users(groups[this_name].num_users);
		});
	
		this.bus.on('message.chan_access', function (message) {
			if (message.target !== _this.transportSafeRoomName()) {
				return;
			}
			if (message.access === ACCESS_TYPE_REDDIT_MOD) {
				_this.access.is_reddit_mod = true;
				_this.linked_channels.reddit_mod = message.mod_channel;
			}
			if (message.access === ACCESS_TYPE_INVITE) {
				_this.access.is_invite = true;
			}
		});
	
		this.bus.on('message.channel.meta', function (message) {
			var do_redraw = false;
	
			if (message.target !== _this.transportSafeRoomName()) {
				return;
			}
	
			if (message.label) {
				_this.label(message.label);
				do_redraw = true;
			}
			if (message.parent) {
				_this.linked_channels.parent = message.parent;
				do_redraw = true;
			}
	
			if (do_redraw) {
				m.redraw();
			}
		});
	
		// If we get banned
		this.bus.on('message.channel.ban', function (event) {
			if (event.channel_name !== _this.transportSafeRoomName()) {
				return;
			}
	
			var message = new _Model2.default({
				author: '*',
				content: 'You have been banned from this channel! There will be no more channel updates here.'
			});
	
			message.display = _this.message_parser.parseAll(message);
			_this.addMessage(message);
			m.redraw();
		});
	
		this.notify = function (title, body) {
			var notification = Notifications.notify(title, body);
			if (!notification) {
				return;
			}
	
			notification.onclick = function () {
				// Some older browsers use .cancel instead of .close
				var closeFn = notification.close || notification.cancel || function () {};
				closeFn.call(notification);
	
				_this.room_manager.setActive(_this.name());
				window.focus();
			};
		};
		this.onFormSubmit = function (event) {
			event = $.event.fix(event);
			event.preventDefault();
	
			var message_type;
			var message = _this.current_message();
			if (!message) {
				return;
			}
	
			// Lets keep some IRC users happy... support /me
			if (message.toLowerCase().indexOf('/me ') === 0) {
				message_type = 'action';
				message = message.substring(4);
			}
	
			_this.sendMessage(message, message_type);
			_this.current_message('');
	
			// We only use one way binding for the input box so we need to update the input
			// manually. Two way binding causes issues with vdom diffing
			$(event.currentTarget).find('input[type="text"]').val('');
	
			m.redraw();
		};
	
		this.sendMessage = function (message_content, message_type) {
			var message = new _Model2.default({
				author: _this.subchat.username(),
				content: message_content,
				matchid: _this.generateMessageMatchId(),
				created: new Date().getTime(),
				type: message_type
			});
	
			message.display = _this.message_parser.parseAll(message);
			_this.addMessage(message);
			if (message_content.indexOf('fail') > -1) {
				message.error = 'There was an error sending this message :(';
				message.retry = false;
			}
			return m.request({
				method: 'POST',
				url: _this.subchat.apiUrl('/send'),
				data: {
					target: _this.transportSafeRoomName(),
					content: message_content,
					matchid: message.matchid,
					type: message_type
				}
			}).then(function (api_response) {
				if (api_response.status !== 'ok') {
					// TODO: Message failed to send so add a .error property to the
					// message so that the view can show it didn't send.
					var err_map = {
						'requires_auth': 'You must be logged in to send a message here',
						'not_allowed': 'You do not have permission to send messages here'
					};
	
					message.error = err_map[api_response.error] || 'There was an error sending this message :(';
					if (err_map[api_response.error]) {
						message.retry = true;
					} else {
						message.retry = false;
					}
				}
			}).catch(function (err) {
				// TODO: Message failed to send so add a .error property to the
				// message so that the view can show it didn't send.
				message.error = 'There was an error sending this message :(';
				message.retry = false;
			});
		};
	
		this.openChat = function () {
			_this.open_panel = null;
		};
	
		this.openGroupSettings = function () {
			_this.open_panel = Helpers.subModule(_GroupSettings2.default, {
				bus: _this.bus,
				room: _this,
				room_manager: _this.room_manager
			});
		};
	
		this.openUserPanel = function (event, username, opts) {
			_this.bus.trigger('panel.open', event, Helpers.subModule(_UserPanel2.default, {
				bus: _this.bus,
				username: username,
				source: opts.source,
				room: _this,
				room_manager: _this.room_manager
			}));
		};
	
		// this.openGroupPanel = () => {
		// 	this.bus.trigger('panel.open', Helpers.subModule(GroupPanel, {
		// 		bus: this.bus,
		// 		room: this,
		// 		room_manager: this.room_manager
		// 	}));
		// };
	
		// this.bus.on('panel.opened', () => {
		// 	this.isPanelOpen = true;
		// });
	
		// this.bus.on('panel.closed', () => {
		// 	this.isPanelOpen = false;
		// });
	
		this.close = function () {
			_this.room_manager.closeRoom(_this.name());
		};
	
		this.toggleApp = function () {
			_this.bus.trigger('action.toggle_app');
		};
	
		this.addMessage = function (message_model) {
			var max_messages = 200;
	
			var component = Helpers.subModule(_Message2.default, {
				message: message_model,
				message_room: _this
			});
	
			var message = {
				data: message_model,
				view: component.view
			};
	
			var messages = _this.messages();
			messages.push(message);
	
			// Keep our thread pruned to a suitable number so not to balloon memory usage
			if (messages.length > max_messages) {
				_this.messages(messages.slice(messages.length - max_messages));
			}
	
			return message;
		};
	
		this.toggleSidebar = function () {
			_this.bus.trigger('action.toggle_sidebar');
		};
	
		this.is_options_overlay_open = false;
	
		this.openOptionsOverlay = function (event) {
			event = $.event.fix(event);
			event.stopPropagation();
	
			_this.is_options_overlay_open = true;
	
			args.bus.once('action.document_click', function () {
				_this.closeOptionsOverlay();
			});
		};
	
		this.closeOptionsOverlay = function () {
			_this.is_options_overlay_open = false;
		};
	
		this.joinModChannel = function (event) {
			event = $.event.fix(event);
			event.stopPropagation();
	
			if (!_this.access.is_reddit_mod) {
				return;
			}
			if (!_this.linked_channels.reddit_mod) {
				return;
			}
	
			var channel = _this.room_manager.createRoom(_this.linked_channels.reddit_mod);
			_this.room_manager.setActive(channel.instance.name());
		};
	};
	
	MessageRoom.view = function (controller) {
		var header = MessageRoom.viewHeader(controller);
	
		var room_content = [];
	
		room_content.push(m(_Panel2.default, {
			bus: controller.bus
		}));
	
		if (!controller.open_panel) {
			room_content.push(MessageRoom.viewChat(controller));
		} else {
			room_content.push(controller.open_panel.view());
		}
	
		return m('div', { class: 'OC-MessageRoom' }, [header, room_content]);
	};
	
	MessageRoom.viewChat = function (controller) {
		// TODO: Only render the last X messages
		var thread_style = Helpers.isInReddit() ? 'inline' : 'block';
		var thread_items = [];
		var last_message = null;
		var mins_20 = 60 * 20 * 1000;
	
		_.each(controller.messages(), function (message, idx, list) {
			if (thread_style === 'inline') {
				// Show the message time if it's the first or there was a gap of 20mins
				// since the last message
				if (!last_message || message.data.created - last_message.data.created > mins_20) {
					thread_items.push(m('div', { class: 'OC-MessageRoom__thread--time-separator' }, [m.trust(message.data.display.created_short)]));
				}
			}
	
			thread_items.push(message.view({
				style: thread_style,
				thread: list,
				message_idx: idx
			}));
	
			last_message = message;
		});
	
		if (thread_items.length === 0) {
			thread_items.push(m('div', { class: 'OC-MessageRoom__no-messages' }, 'No messages here recently... :('));
		}
	
		return [m('ul', {
			class: 'OC-MessageRoom__thread',
			onscroll: function onscroll() {
				var rect = this.getBoundingClientRect();
	
				// Scrolled to the bottom with a margin of 20px = autoscroll
				if (this.scrollTop + rect.height > this.scrollHeight - 20) {
					controller.thread_autoscroll = true;
				} else {
					controller.thread_autoscroll = false;
				}
	
				controller.thread_scrolltop(this.scrollTop);
	
				// We don't need to redraw on every scroll event
				m.redraw.strategy('none');
			},
			config: function config(el, already_initialised) {
				if (controller.thread_autoscroll) {
					el.scrollTop = el.scrollHeight;
				}
	
				// Only set the scroll position when the element is first being initialised/created
				if (!already_initialised && !controller.thread_autoscroll) {
					el.scrollTop = controller.thread_scrolltop();
				}
			}
		}, thread_items), m('form', { class: 'OC-MessageRoom__footer', onsubmit: controller.onFormSubmit.bind(controller) }, [
		// controller.access.is_reddit_mod ? m('div', {
		// 	class: 'OC-MessageRoom__mod-info',
		// 	onclick: controller.joinModChannel
		// }, [
		// 	m('a', 'Join the moderator channel')
		// ]) : null,
		m('input', {
			type: 'text',
			placeholder: 'send a message',
			maxlength: '1000',
			onkeyup: m.withAttr('value', controller.current_message)
		}), m('button[type="submit"]', [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"]')])])
		// m('div', {
		// 	class: 'OC-MessageRoom__footer-options',
		// 	onclick: controller.openOptionsOverlay
		// }, [
		// 	m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [
		// 		m('path[d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"]')
		// 	]),
		// ])
		])];
	};
	
	MessageRoom.viewHeader = function (controller) {
		var tabs = [];
		var title = '';
		var parent_channel;
	
		if (controller.access.is_invite) {
			tabs.push(m('li', {
				class: controller.open_panel ? 'OC-MessageRoom__header-tabs-item OC-MessageRoom__header-tabs-item--active' : 'OC-MessageRoom__header-tabs-item',
				onclick: controller.openGroupSettings
			}, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"]')])]));
		}
	
		if (tabs.length > 0) {
			tabs.unshift(m('li', {
				class: !controller.open_panel ? 'OC-MessageRoom__header-tabs-item OC-MessageRoom__header-tabs-item--active' : 'OC-MessageRoom__header-tabs-item',
				onclick: controller.openChat
			}, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"]')])]));
		}
	
		if (controller.access.is_reddit_mod) {
			tabs.push(m('li', {
				class: 'OC-MessageRoom__header-tabs-item',
				onclick: controller.joinModChannel,
				title: 'Join the mod channel'
			}, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"]')])]));
		}
	
		title = controller.displayLabel();
		if (controller.linked_channels.parent) {
			parent_channel = controller.room_manager.getRoom(controller.linked_channels.parent.name);
			if (parent_channel) {
				title = parent_channel.instance.displayLabel() + ' - ' + title;
			}
		}
	
		return m('div', { class: 'OC-MessageRoom__header' }, [m('div', { class: 'OC-MessageRoom__header-collapse', title: 'Toggle sidebar', onclick: controller.toggleSidebar }, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"]')])]), m('div', { class: 'OC-MessageRoom__header-info', onclick: Helpers.isInReddit() ? controller.toggleApp : null }, [m('h4', title)]), m('ul', { class: 'OC-MessageRoom__header-tabs' }, tabs)]);
	};
	
	exports.default = MessageRoom;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./MessageRoom.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./MessageRoom.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-MessageRoom {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n.OC-MessageRoom__header {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 48px;\n  background-color: #fff;\n  overflow: hidden;\n  z-index: 80;\n}\n.OC-MessageRoom__header-collapse {\n  position: absolute;\n  left: 16px;\n  top: 50%;\n  margin-top: -12px;\n  cursor: pointer;\n  -webkit-transition: left 175ms ease;\n  transition: left 175ms ease;\n}\n.OC-MessageRoom__header-collapse svg {\n  fill: rgba(0,0,0,0.54);\n  display: inline-block;\n  vertical-align: middle;\n}\n.OC-MessageRoom__header-info {\n  position: absolute;\n  left: 56px;\n  top: 50%;\n  margin-top: -7px;\n  -webkit-transition: left 175ms ease;\n  transition: left 175ms ease;\n  cursor: pointer;\n}\n.OC-MessageRoom__header-info h4 {\n  font-size: 1.071428571428571em;\n  line-height: 1;\n  display: block;\n  font-weight: 500;\n}\n.OC-MessageRoom__header-tabs {\n  position: absolute;\n  top: 50%;\n  margin-top: -12px;\n  right: 0;\n}\n.OC-MessageRoom__header-tabs-item {\n  display: inline-block;\n  cursor: pointer;\n  margin-right: 16px;\n}\n.OC-MessageRoom__header-tabs-item svg {\n  fill: rgba(0,0,0,0.38);\n  display: inline-block;\n  vertical-align: middle;\n}\n.OC-MessageRoom__header-tabs-item--active svg {\n  fill: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__no-messages {\n  padding: 10px 16px;\n  font-weight: 500;\n  color: rgba(0,0,0,0.38);\n}\n.OC-MessageRoom__group-settings {\n  position: absolute;\n  padding: 10px 16px;\n  top: 48px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.OC-MessageRoom__group-settings-section {\n  margin-bottom: 10px;\n  position: relative;\n}\n.OC-MessageRoom__group-settings-section label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: rgba(0,0,0,0.38);\n  font-size: 0.857142857142857em;\n  -webkit-transition: color 175ms ease;\n  transition: color 175ms ease;\n}\n.OC-MessageRoom__group-settings-section button {\n  border: 0;\n  background-color: transparent;\n  display: block;\n  position: absolute;\n  right: 0;\n  bottom: 4px;\n}\n.OC-MessageRoom__group-settings-section button svg {\n  fill: rgba(0,0,0,0.38);\n  display: block;\n}\n.OC-MessageRoom__group-settings-section input {\n  border: 0;\n  border-bottom: 1px solid rgba(0,0,0,0.13);\n  padding: 25px 0 10px 0;\n  font-size: 1em;\n  display: block;\n  width: 100%;\n  margin: 0 0 10px 0;\n  -webkit-transition: border-color 175ms ease;\n  transition: border-color 175ms ease;\n}\n.OC-MessageRoom__group-settings-section input:focus {\n  outline: 0;\n  border-color: #ff5722;\n}\n.OC-MessageRoom__group-settings-section input:focus ~ label {\n  color: #ff5722;\n}\n.OC-MessageRoom__group-settings-section input:focus ~ button svg {\n  fill: #ff5722;\n}\n.OC-MessageRoom__group-settings-section input::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__group-settings-section input::-moz-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__group-settings-section input:-ms-input-placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__group-settings-section input::placeholder {\n  color: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__thread {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 55px;\n  top: 48px;\n  overflow-y: auto;\n}\n.OC-MessageRoom__thread--time-separator {\n  text-align: center;\n  font-size: 0.8em;\n  font-weight: bold;\n  font-style: italic;\n  margin: 6px;\n  color: rgba(0,0,0,0.54);\n}\n.OC-MessageRoom__footer {\n  background-color: rgba(0,0,0,0.06);\n  border-top: 1px solid rgba(0,0,0,0.13);\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 55px;\n}\n.OC-MessageRoom__footer button {\n  border: 0;\n  background-color: transparent;\n  display: block;\n  position: absolute;\n  right: 32px;\n  top: 50%;\n  margin: 0;\n  margin-top: -12px;\n  padding: 0;\n  box-shadow: none;\n  height: auto;\n}\n.OC-MessageRoom__footer button svg {\n  fill: rgba(0,0,0,0.38);\n  display: block;\n}\n.OC-MessageRoom__footer input {\n  position: absolute;\n  top: 50%;\n  margin-top: -17px;\n  left: 16px;\n  width: calc(100% - 2 * 16px);\n  border: 0;\n  border: 2px solid rgba(0,0,0,0.13);\n  padding: 0 56px 0 16px;\n  height: 34px;\n  font-size: 1em;\n  display: block;\n  border-radius: 3px;\n}\n.OC-MessageRoom__footer input:focus {\n  outline: 0;\n}\n.OC-MessageRoom__footer input:focus ~ button svg {\n  fill: #ff5722;\n}\n.OC-MessageRoom__footer input::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.38);\n}\n.OC-MessageRoom__footer input::-moz-placeholder {\n  color: rgba(0,0,0,0.38);\n}\n.OC-MessageRoom__footer input:-ms-input-placeholder {\n  color: rgba(0,0,0,0.38);\n}\n.OC-MessageRoom__footer input::placeholder {\n  color: rgba(0,0,0,0.38);\n}\n", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Hacky API to get reddit.com info while embedded into reddit.com
	 * TODO: This should be moved into the backend via oauth
	 */
	var Reddit = {};
	
	Reddit.isLoggedIn = function () {
		return $('.user > a').attr('class') !== 'login-required';
	};
	
	Reddit.username = function () {
		var username = $('.user > a').text();
		return function () {
			return username;
		};
	}();
	
	Reddit.currentSubreddit = function () {
		return $('.redditname:first a').text();
	};
	
	Reddit.subreddits = function () {
		var subreddits = m.prop([]);
	
		$.getJSON('/subreddits/mine.json', function (response) {
			var new_subreddits = [];
			if (!response || !response.data) {
				return;
			}
	
			$.each(response.data.children, function (idx, item) {
				new_subreddits.push({
					name: '/r/' + item.data.display_name,
					short_name: item.data.display_name
				});
			});
	
			new_subreddits = _.sortBy(new_subreddits, function (sub) {
				return sub.name.toLowerCase();
			});
	
			subreddits(new_subreddits);
			m.redraw();
		}).fail(function () {});
	
		return subreddits;
	};
	
	Reddit.injectUserbarIcon = function (app, bus) {
		// Get the preferences link as we want to inject just before that
		var $preferences = $('#header-bottom-right a.pref-lang').parents('.flat-list:first');
		var $sep = $('<span class="separator">|</span>');
		var $icon = $('<a title="OrangeChat" href="#" class="ChatApp__reddit-icon" style="top:1px;position:relative;font-size:1.2em;">im</a>');
	
		$sep.insertBefore($preferences);
		$icon.insertBefore($sep);
	
		$icon.on('click', function (event) {
			event.preventDefault();
			app.toggle();
			// Mithril won't detect the redraw as the icon is outside of the app
			m.redraw();
		});
	
		var alert_level = 0;
		function setAlertLevel(level) {
			if (level > alert_level) {
				alert_level = level;
				setIconStyles();
			}
		}
		function resetAlerts() {
			alert_level = 0;
			setIconStyles();
		}
		function setIconStyles() {
			if (alert_level === 0) {
				$icon.css({
					'font-weight': 'normal',
					'color': ''
				});
			} else if (alert_level === 1) {
				$icon.css({
					'font-weight': 'bold',
					'color': ''
				});
			} else if (alert_level === 2) {
				$icon.css({
					'font-weight': 'bold',
					'color': 'orangered'
				});
			}
		}
	
		bus.on('im.message', function (message) {
			if (window.document.hasFocus && window.document.hasFocus() && app.state('is_open')) {
				return;
			}
	
			setAlertLevel(1);
			if (message.content.toLowerCase().indexOf(Reddit.username().toLowerCase()) > -1) {
				setAlertLevel(2);
			}
		});
	
		bus.on('app.toggle', function (is_open) {
			if (is_open) {
				resetAlerts();
			}
		});
	
		bus.on('channel.active', function (channel) {
			// Consider this as the user being active and doing stuff, so they've seen the alert
			resetAlerts();
		});
	};
	
	Reddit.hookOcButtons = function (bus) {
		var $buttons = $('a[href^="https://app.orangechat.io"]');
		$buttons.on('click', function (event) {
			var url = $(this).attr('href');
			if (url && !url.match(/#./)) {
				return;
			}
	
			var channel = url.split('#')[1].split(',')[0];
			bus.trigger('action.ocbutton.click', event, channel);
		});
	};
	
	exports.default = Reddit;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Integration to the subchat backend
	 *
	 * TODO: Should Services/Transport be in here?
	 */
	
	function Subchat(state) {
		this.state = state;
		this.sid = state('sid') || '';
		this.username = m.prop(state('username') || '');
		this.api_url = 'https://app.orangechat.io/app';
		this.subreddits = m.prop([]);
	}
	
	/**
	 * Generate a singleton instance
	 * @return {Subchat}
	 */
	Subchat.instance = function () {
		var instance = null;
	
		return function (state) {
			instance = instance || new Subchat(state);
			return instance;
		};
	}();
	
	// TODO: Not a fan of this setter. Find a way to detect changes on m.prop() and use that
	Subchat.prototype.setSid = function (sid) {
		this.sid = sid;
		this.state.set('sid', sid);
	};
	// TODO: Not a fan of this setter. Find a way to detect changes on m.prop() and use that
	Subchat.prototype.setUsername = function (username) {
		this.username(username);
		this.state.set('username', username);
	};
	
	/**
	 * Build a URL to call the backend
	 * @param  {String} path  The API path, ie. API method to be called
	 * @param  {Object} _args Object of querystring parameters
	 * @return {String}       A complete API URL
	 */
	Subchat.prototype.apiUrl = function (path, _args) {
		var args = _args || {};
		var querystring_params = [];
	
		args.sid = this.sid || '';
	
		for (var prop in args) {
			if (!args.hasOwnProperty(prop)) {
				continue;
			}
	
			querystring_params.push(prop + '=' + encodeURIComponent(args[prop]));
		}
	
		return this.api_url + path + '?' + querystring_params.join('&');
	};
	
	Subchat.prototype.ping = function () {
		var _this = this;
	
		var deferred = m.deferred();
	
		m.request({ method: 'GET', url: this.apiUrl('/ping') }).then(function (resp) {
			var just_logged_in = false;
	
			if (resp && resp.sid) {
				_this.setSid(resp.sid);
			}
	
			if (!resp.username) {
				_this.setUsername('');
				deferred.resolve({});
			} else {
				// If we don't current have a username but have one now, then we must have
				// just logged in.
				just_logged_in = !_this.username();
	
				// Just make sure we know our correct username
				_this.setUsername(resp.username);
	
				deferred.resolve({
					just_logged_in: just_logged_in,
					username: resp.username,
					user_channel: resp.user_channel || '',
					channels: resp.channels
				});
			}
		});
	
		return deferred.promise;
	};
	
	/**
	 * Create a private channel and return the channel name
	 */
	Subchat.prototype.createChannel = function (_invite_users) {
		var invite_users = [].concat(_invite_users);
		var url = this.apiUrl('/channels/create', {
			invite: invite_users.join(',')
		});
	
		return m.request({ method: 'GET', url: url }).then(function (resp) {
			return resp;
		});
	};
	
	/**
	 * Ban users from a channel
	 */
	Subchat.prototype.banFromChannel = function (channel_name, _ban_users) {
		var users = [].concat(_ban_users);
		var api_params = {
			users: users.join(','),
			channel: channel_name
		};
	
		var url = this.apiUrl('/channels/ban', api_params);
	
		return m.request({ method: 'GET', url: url }).then(function (resp) {
			return resp;
		});
	};
	
	/**
	 * Create a private channel and return the channel name
	 */
	Subchat.prototype.inviteToChannel = function (channel_name, _invite_users, _opts) {
		var invite_users = [].concat(_invite_users);
		var opts = _opts || {};
		var api_params = {
			invite: invite_users.join(','),
			channel: channel_name
		};
	
		if (opts.label) {
			api_params.label = opts.label;
		}
	
		var url = this.apiUrl('/channels/invite', api_params);
	
		return m.request({ method: 'GET', url: url }).then(function (resp) {
			return resp;
		});
	};
	
	Subchat.prototype.updateChannel = function (channel_name, updates) {
		updates.channel = channel_name;
		var url = this.apiUrl('/channels/update', updates);
	
		return m.request({ method: 'GET', url: url }).then(function (resp) {
			return resp;
		});
	};
	
	Subchat.prototype.loadSubreddits = function (force_reddit_update) {
		var subreddits = this.subreddits;
		var url = this.apiUrl('/subreddits', force_reddit_update ? { refresh: 1 } : undefined);
	
		return $.getJSON(url, function (response) {
			var new_subreddits = [];
			if (!response) {
				return;
			}
	
			_.each(response, function (item) {
				new_subreddits.push({
					name: '/r/' + item.subreddit,
					short_name: item.subreddit
				});
			});
	
			new_subreddits = _.sortBy(new_subreddits, function (sub) {
				return sub.name.toLowerCase();
			});
	
			subreddits(new_subreddits);
	
			// TODO: This redraw shouldn't be here.
			m.redraw();
		}).fail(function () {});
	};
	
	/**
	 * Auth into the API backend
	 * This will either return the username if already auth'd or process the reddit OAuth
	 * and handle any redirects until fully auth'd, and then returns the username.
	 */
	Subchat.prototype.auth = function () {
		var _this2 = this;
	
		var deferred = m.deferred();
	
		m.startComputation();
	
		function resolveAuth(result) {
			m.endComputation();
			deferred.resolve(result);
		}
		function rejectAuth(err) {
			m.endComputation();
			deferred.reject(err);
		}
	
		m.request({ method: 'GET', url: this.apiUrl('/auth') }).then(function (resp) {
	
			// Check if we have a session ID set (can't use cookies.. IE9< doesn't
			// support cookies over CORS)
			if (resp && resp.sid) {
				_this2.setSid(resp.sid);
			}
	
			if (!resp || resp.status === 'bad') {
				rejectAuth(resp.error || 'unknown_error');
				return;
			}
	
			// If instructed to redirect somewhere, do that now
			if (resp.redirect) {
				window.location = resp.redirect + '&return_url=' + encodeURIComponent(window.location.href);
				return;
			}
	
			if (resp.username) {
				_this2.setUsername(resp.username);
				resolveAuth({ username: _this2.username() });
			}
		});
	
		return deferred.promise;
	};
	
	/**
	 * 
	 */
	Subchat.prototype.logout = function () {
		var _this3 = this;
	
		return m.request({ method: 'GET', url: this.apiUrl('/logout') }).then(function (resp) {
			_this3.setUsername('');
		});
	};
	
	/**
	 * Convert 'type_string:{JSON structure}' into an object
	 * @param  {String} message Raw string, typically recieved from a window message
	 * @return {Object}         {type: 'string', args: {args}
	 */
	function parsePostedMessage(message) {
		var result = {
			type: null,
			args: {}
		};
	
		var split_pos = message.indexOf(':');
		if (split_pos === -1) {
			return result;
		}
	
		result.type = message.substring(0, split_pos);
		try {
			result.args = JSON.parse(message.substring(split_pos + 1));
		} catch (err) {}
	
		return result;
	}
	
	exports.default = Subchat;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MessageModel = function () {
		function MessageModel(message) {
			_classCallCheck(this, MessageModel);
	
			this.fromObj(message);
		}
	
		_createClass(MessageModel, [{
			key: "fromObj",
			value: function fromObj(obj) {
				this.id = obj.id;
				this.matchid = obj.matchid;
				this.author = obj.author;
				this.content = obj.content;
				this.channel = obj.channel;
				this.created = obj.created;
				this.source = obj.source;
				this.type = obj.type;
				this.is_highlight = obj.is_highlight;
			}
		}]);
	
		return MessageModel;
	}();

	exports.default = MessageModel;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(19);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Message = {};
	
	Message.controller = function (args) {
		this.cssClass = function () {
			var css_class = 'OC-Message';
			if (args.message.author === args.message_room.subchat.username()) {
				css_class += ' OC-Message--own';
			}
			if (!args.message.id) {
				css_class += ' OC-Message--pending';
			}
			if (args.message.is_highlight) {
				css_class += ' OC-Message--highlight';
			}
			if (args.message.type === 'action') {
				css_class += ' OC-Message--action';
			}
			return css_class;
		};
	
		this.openUserPanel = function (event) {
			event = $.event.fix(event);
			event.stopPropagation();
			args.message_room.openUserPanel(event, args.message.author, {
				source: args.message.source
			});
		};
	};
	
	Message.view = function (controller, args, ext) {
		var view = null;
	
		if (ext.style === 'inline') {
			view = Message.viewInline(controller, args, ext);
		} else {
			view = Message.viewBlock(controller, args, ext);
		}
	
		return view;
	};
	
	Message.viewInline = function (controller, args, ext) {
		return m('li', { class: controller.cssClass() + ' OC-Message--inline' }, [
		//m('div', {class: 'OC-Message__timestamp'}, m.trust(args.message.display.created)),
		m('div', {
			style: args.message.type === 'action' ? 'color:' + Helpers.nickColour(args.message.author) + ';' : '',
			class: 'OC-Message__content'
		}, [m('a', {
			class: 'OC-Message__content-author',
			style: 'color:' + Helpers.nickColour(args.message.author) + ';',
			onclick: controller.openUserPanel
		}, m.trust(args.message.display.author)), ' ', m.trust(args.message.display.content)])]);
	};
	
	Message.viewBlock = function (controller, args, ext) {
		var error = null;
	
		if (args.message.error) {
			console.log('adding error');
			error = m('div', { class: 'OC-Message__error' }, args.message.error);
		}
	
		return m('li', { class: controller.cssClass() + ' OC-Message--block' }, [m('a', {
			class: 'OC-Message__author',
			style: 'color:' + Helpers.nickColour(args.message.author) + ';',
			onclick: controller.openUserPanel
		}, m.trust(args.message.display.author)), m('div', { class: 'OC-Message__timestamp' }, m.trust(args.message.display.created)), m('div', {
			style: args.message.type === 'action' ? 'color:' + Helpers.nickColour(args.message.author) + ';' : '',
			class: 'OC-Message__content'
		}, [m.trust(args.message.display.content)]), error]);
	};
	
	exports.default = Message;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Message.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Message.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-Message {\n  padding: 5px 16px;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  position: relative;\n}\n.OC-Message--pending {\n  opacity: 0.4;\n}\n.OC-Message--highlight {\n  background-color: #fbe9e7;\n}\n.OC-Message--action .OC-Message__content {\n  font-style: italic;\n}\n.OC-Message--action .OC-Message__content-author:before {\n  content: '~ ';\n}\n.OC-Message:nth-child(2n) {\n  background-color: #f5f5f5;\n}\n.OC-Message--inline .OC-Message__timestamp {\n  color: rgba(0,0,0,0.38);\n  position: absolute;\n  font-size: 1em;\n  left: 16px;\n  top: 10px/2;\n}\n.OC-Message--inline .OC-Message__content {\n  font-size: 1em;\n}\n.OC-Message--inline .OC-Message__content--username {\n  font-style: italic;\n}\n.OC-Message--inline .OC-Message__content-author {\n  font-weight: 500;\n  cursor: pointer;\n  font-size: 1em;\n}\n.OC-Message--inline .OC-Message__content-author:hover {\n  opacity: 0.7;\n}\n.OC-Message--inline .OC-Message__error {\n  background: #e05656;\n  color: #fff;\n  padding: 8px;\n  border: 1px solid #a93f3f;\n}\n.OC-Message--block .OC-Message__timestamp {\n  color: rgba(0,0,0,0.38);\n  font-size: 0.857142857142857em;\n  margin-left: 9px;\n  display: inline;\n}\n.OC-Message--block .OC-Message__content {\n  font-size: 1em;\n  display: block;\n}\n.OC-Message--block .OC-Message__content--username {\n  font-style: italic;\n}\n.OC-Message--block .OC-Message-author {\n  font-weight: 500;\n  cursor: pointer;\n  font-size: 1em;\n}\n.OC-Message--block .OC-Message-author:hover {\n  opacity: 0.7;\n}\n.OC-Message--block .OC-Message__error {\n  background: #e05656;\n  color: #fff;\n  padding: 8px;\n  border: 1px solid #a93f3f;\n}\n", ""]);
	
	// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _strftime = __webpack_require__(22);
	
	var _strftime2 = _interopRequireDefault(_strftime);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Parse messages into displayable formats. Parses URLs, embedded media, etc.
	 */
	
	var MessageParser = function () {
		function MessageParser() {
			var filters = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
			var usernames = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
			_classCallCheck(this, MessageParser);
	
			// Word replacments in message content
			this.filters = Object.create(filters);
	
			// A mithril prop function returning an array of usernames
			this.usernames = usernames;
		}
	
		_createClass(MessageParser, [{
			key: 'parseAll',
			value: function parseAll(message) {
				var _this = this;
	
				var display_obj = {
					author: this.parseAuthor(_.escape(message.author), message.source),
					content: message.content,
					created: message.created ? this.parseTimestamp(message.created) : '',
					created_short: message.created ? this.parseShortTimestamp(message.created) : ''
				};
	
				var words = display_obj.content.split(' ');
	
				// Go through each word and parse individually. If nothing is returned from a
				// parser function, continue to the next one.
				words = words.map(function (word) {
					var parsed;
	
					parsed = _this.parseUrls(word);
					if (typeof parsed === 'string') return parsed;
	
					parsed = _this.parseFilters(word);
					if (typeof parsed === 'string') return parsed;
	
					parsed = _this.parseRedditPhrases(word);
					if (typeof parsed === 'string') return parsed;
	
					if (typeof _this.usernames === 'function') {
						parsed = _this.parseUsernames(word);
						if (typeof parsed === 'string') return parsed;
					}
	
					return _.escape(word);
				});
	
				display_obj.content = words.join(' ');
	
				return display_obj;
			}
		}, {
			key: 'parseUrls',
			value: function parseUrls(word) {
				var found_a_url = false,
				    parsed_url;
	
				parsed_url = word.replace(/^(([A-Za-z][A-Za-z0-9\-]*\:\/\/)|(www\.))([\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF.\-]+)([a-zA-Z]{2,6})(:[0-9]+)?(\/[\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF!:.?$'()[\]*,;~+=&%@!\-\/]*)?(#.*)?$/gi, function (url) {
					var nice = url,
					    extra_html = '';
	
					// Don't allow javascript execution
					if (url.match(/^javascript:/i)) {
						return url;
					}
	
					found_a_url = true;
	
					// Add the http if no protoocol was found
					if (url.match(/^www\./i)) {
						url = 'http://' + url;
					}
	
					// Shorten the displayed URL if it's going to be too long
					if (nice.length > 100) {
						nice = nice.substr(0, 100) + '...';
					}
	
					// Make the link clickable
					return '<a class="link-ext" target="_blank" rel="nofollow" href="' + url.replace(/"/g, '%22') + '">' + _.escape(nice) + '</a>' + extra_html;
				});
	
				return found_a_url ? parsed_url : false;
			}
		}, {
			key: 'parseFilters',
			value: function parseFilters(word) {
				if (this.filters[word.toLowerCase()]) {
					return this.filters[word.toLowerCase()];
				}
			}
		}, {
			key: 'parseRedditPhrases',
			value: function parseRedditPhrases(word) {
				var replacement_made = false;
				var ret = word;
				// Convert /r/sub into reddit links
				ret = ret.replace(/(?:^|\s)(\/?(r\/[a-zA-Z0-9]+))/, function (match, group1, group2) {
					replacement_made = true;
					return '<a href="https://www.reddit.com/' + group2 + '">' + group1 + '</a>';
				});
	
				// Convert /u/user into reddit links
				ret = ret.replace(/(?:^|\s)(\/?(u\/[a-zA-Z0-9]+))/, function (match, group1, group2) {
					replacement_made = true;
					return '<a href="https://www.reddit.com/' + group2 + '">' + group1 + '</a>';
				});
	
				return replacement_made ? ret : false;
			}
		}, {
			key: 'parseUsernames',
			value: function parseUsernames(word) {
				var usernames = this.usernames();
				if (!usernames && !usernames.length) {
					return;
				}
	
				var match = word.match(/^([a-z0-9_\-]+)([^a-z0-9_\-]+)?$/i);
				if (!match) {
					return;
				}
	
				// If this word isn't a recognised username, return
				if (usernames.indexOf(match[1].toLowerCase()) === -1) {
					return;
				}
	
				var colour = Helpers.nickColour(match[1]);
				var ret = '<span class="OC-Message__content--username" style="color:' + colour + ';">' + _.escape(match[1]) + '</span>';
	
				// Add any trailing characters back on
				if (match[2]) {
					ret += _.escape(match[2]);
				}
	
				return ret;
			}
		}, {
			key: 'parseTimestamp',
			value: function parseTimestamp(timestamp) {
				return (0, _strftime2.default)('%H:%M:%S', new Date(timestamp));
			}
		}, {
			key: 'parseShortTimestamp',
			value: function parseShortTimestamp(timestamp) {
				return (0, _strftime2.default)('%H:%M', new Date(timestamp));
			}
		}, {
			key: 'parseAuthor',
			value: function parseAuthor(author, source) {
				if (source == 'irc') {
					author += '*';
				}
	
				return author;
			}
		}]);
	
		return MessageParser;
	}();
	
	exports.default = MessageParser;

/***/ },
/* 22 */
/***/ function(module, exports) {

	//
	// strftime
	// github.com/samsonjs/strftime
	// @_sjs
	//
	// Copyright 2010 - 2015 Sami Samhuri <sami@samhuri.net>
	//
	// MIT License
	// http://sjs.mit-license.org
	//
	
	;(function() {
	
	    var DefaultLocale = {
	            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	            AM: 'AM',
	            PM: 'PM',
	            am: 'am',
	            pm: 'pm',
	            formats: {
	                D: '%m/%d/%y',
	                F: '%Y-%m-%d',
	                R: '%H:%M',
	                T: '%H:%M:%S',
	                X: '%T',
	                c: '%a %b %d %X %Y',
	                r: '%I:%M:%S %p',
	                v: '%e-%b-%Y',
	                x: '%D'
	            }
	        },
	        defaultStrftime = new Strftime(DefaultLocale, 0, false),
	        isCommonJS = typeof module !== 'undefined',
	        namespace;
	
	    // CommonJS / Node module
	    if (isCommonJS) {
	        namespace = module.exports = adaptedStrftime;
	        namespace.strftime = deprecatedStrftime;
	    }
	    // Browsers and other environments
	    else {
	        // Get the global object. Works in ES3, ES5, and ES5 strict mode.
	        namespace = (function() { return this || (1,eval)('this'); }());
	        namespace.strftime = adaptedStrftime;
	    }
	
	    // Deprecated API, to be removed in v1.0
	    var _require = isCommonJS ? "require('strftime')" : "strftime";
	    var _deprecationWarnings = {};
	    function deprecationWarning(name, instead) {
	        if (!_deprecationWarnings[name]) {
	            if (typeof console !== 'undefined' && typeof console.warn == 'function') {
	                console.warn("[WARNING] " + name + " is deprecated and will be removed in version 1.0. Instead, use `" + instead + "`.");
	            }
	            _deprecationWarnings[name] = true;
	        }
	    }
	
	    namespace.strftimeTZ = deprecatedStrftimeTZ;
	    namespace.strftimeUTC = deprecatedStrftimeUTC;
	    namespace.localizedStrftime = deprecatedStrftimeLocalized;
	
	    // Adapt the old API while preserving the new API.
	    function adaptForwards(fn) {
	        fn.localize = defaultStrftime.localize.bind(defaultStrftime);
	        fn.timezone = defaultStrftime.timezone.bind(defaultStrftime);
	        fn.utc = defaultStrftime.utc.bind(defaultStrftime);
	    }
	
	    adaptForwards(adaptedStrftime);
	    function adaptedStrftime(fmt, d, locale) {
	        // d and locale are optional, check if this is (format, locale)
	        if (d && d.days) {
	            locale = d;
	            d = undefined;
	        }
	        if (locale) {
	            deprecationWarning("`" + _require + "(format, [date], [locale])`", "var s = " + _require + ".localize(locale); s(format, [date])");
	        }
	        var strftime = locale ? defaultStrftime.localize(locale) : defaultStrftime;
	        return strftime(fmt, d);
	    }
	
	    adaptForwards(deprecatedStrftime);
	    function deprecatedStrftime(fmt, d, locale) {
	        if (locale) {
	            deprecationWarning("`" + _require + ".strftime(format, [date], [locale])`", "var s = " + _require + ".localize(locale); s(format, [date])");
	        }
	        else {
	            deprecationWarning("`" + _require + ".strftime(format, [date])`", _require + "(format, [date])");
	        }
	        var strftime = locale ? defaultStrftime.localize(locale) : defaultStrftime;
	        return strftime(fmt, d);
	    }
	
	    function deprecatedStrftimeTZ(fmt, d, locale, timezone) {
	        // locale is optional, check if this is (format, date, timezone)
	        if ((typeof locale == 'number' || typeof locale == 'string') && timezone == null) {
	            timezone = locale;
	            locale = undefined;
	        }
	
	        if (locale) {
	            deprecationWarning("`" + _require + ".strftimeTZ(format, date, locale, tz)`", "var s = " + _require + ".localize(locale).timezone(tz); s(format, [date])` or `var s = " + _require + ".localize(locale); s.timezone(tz)(format, [date])");
	        }
	        else {
	            deprecationWarning("`" + _require + ".strftimeTZ(format, date, tz)`", "var s = " + _require + ".timezone(tz); s(format, [date])` or `" + _require + ".timezone(tz)(format, [date])");
	        }
	
	        var strftime = (locale ? defaultStrftime.localize(locale) : defaultStrftime).timezone(timezone);
	        return strftime(fmt, d);
	    }
	
	    var utcStrftime = defaultStrftime.utc();
	    function deprecatedStrftimeUTC(fmt, d, locale) {
	        if (locale) {
	            deprecationWarning("`" + _require + ".strftimeUTC(format, date, locale)`", "var s = " + _require + ".localize(locale).utc(); s(format, [date])");
	        }
	        else {
	            deprecationWarning("`" + _require + ".strftimeUTC(format, [date])`", "var s = " + _require + ".utc(); s(format, [date])");
	        }
	        var strftime = locale ? utcStrftime.localize(locale) : utcStrftime;
	        return strftime(fmt, d);
	    }
	
	    function deprecatedStrftimeLocalized(locale) {
	        deprecationWarning("`" + _require + ".localizedStrftime(locale)`", _require + ".localize(locale)");
	        return defaultStrftime.localize(locale);
	    }
	    // End of deprecated API
	
	    // Polyfill Date.now for old browsers.
	    if (typeof Date.now !== 'function') {
	        Date.now = function() {
	          return +new Date();
	        };
	    }
	
	    function Strftime(locale, customTimezoneOffset, useUtcTimezone) {
	        var _locale = locale || DefaultLocale,
	            _customTimezoneOffset = customTimezoneOffset || 0,
	            _useUtcBasedDate = useUtcTimezone || false,
	
	            // we store unix timestamp value here to not create new Date() each iteration (each millisecond)
	            // Date.now() is 2 times faster than new Date()
	            // while millisecond precise is enough here
	            // this could be very helpful when strftime triggered a lot of times one by one
	            _cachedDateTimestamp = 0,
	            _cachedDate;
	
	        function _strftime(format, date) {
	            var timestamp;
	
	            if (!date) {
	                var currentTimestamp = Date.now();
	                if (currentTimestamp > _cachedDateTimestamp) {
	                    _cachedDateTimestamp = currentTimestamp;
	                    _cachedDate = new Date(_cachedDateTimestamp);
	
	                    timestamp = _cachedDateTimestamp;
	
	                    if (_useUtcBasedDate) {
	                        // how to avoid duplication of date instantiation for utc here?
	                        // we tied to getTimezoneOffset of the current date
	                        _cachedDate = new Date(_cachedDateTimestamp + getTimestampToUtcOffsetFor(_cachedDate) + _customTimezoneOffset);
	                    }
	                }
	                else {
	                  timestamp = _cachedDateTimestamp;
	                }
	                date = _cachedDate;
	            }
	            else {
	                timestamp = date.getTime();
	
	                if (_useUtcBasedDate) {
	                    date = new Date(date.getTime() + getTimestampToUtcOffsetFor(date) + _customTimezoneOffset);
	                }
	            }
	
	            return _processFormat(format, date, _locale, timestamp);
	        }
	
	        function _processFormat(format, date, locale, timestamp) {
	            var resultString = '',
	                padding = null,
	                isInScope = false,
	                length = format.length,
	                extendedTZ = false;
	
	            for (var i = 0; i < length; i++) {
	
	                var currentCharCode = format.charCodeAt(i);
	
	                if (isInScope === true) {
	                    // '-'
	                    if (currentCharCode === 45) {
	                        padding = '';
	                        continue;
	                    }
	                    // '_'
	                    else if (currentCharCode === 95) {
	                        padding = ' ';
	                        continue;
	                    }
	                    // '0'
	                    else if (currentCharCode === 48) {
	                        padding = '0';
	                        continue;
	                    }
	                    // ':'
	                    else if (currentCharCode === 58) {
	                      if (extendedTZ) {
	                        if (typeof console !== 'undefined' && typeof console.warn == 'function') {
	                          console.warn("[WARNING] detected use of unsupported %:: or %::: modifiers to strftime");
	                        }
	                      }
	                      extendedTZ = true;
	                      continue;
	                    }
	
	                    switch (currentCharCode) {
	
	                        // Examples for new Date(0) in GMT
	
	                        // 'Thursday'
	                        // case 'A':
	                        case 65:
	                            resultString += locale.days[date.getDay()];
	                            break;
	
	                        // 'January'
	                        // case 'B':
	                        case 66:
	                            resultString += locale.months[date.getMonth()];
	                            break;
	
	                        // '19'
	                        // case 'C':
	                        case 67:
	                            resultString += padTill2(Math.floor(date.getFullYear() / 100), padding);
	                            break;
	
	                        // '01/01/70'
	                        // case 'D':
	                        case 68:
	                            resultString += _processFormat(locale.formats.D, date, locale, timestamp);
	                            break;
	
	                        // '1970-01-01'
	                        // case 'F':
	                        case 70:
	                            resultString += _processFormat(locale.formats.F, date, locale, timestamp);
	                            break;
	
	                        // '00'
	                        // case 'H':
	                        case 72:
	                            resultString += padTill2(date.getHours(), padding);
	                            break;
	
	                        // '12'
	                        // case 'I':
	                        case 73:
	                            resultString += padTill2(hours12(date.getHours()), padding);
	                            break;
	
	                        // '000'
	                        // case 'L':
	                        case 76:
	                            resultString += padTill3(Math.floor(timestamp % 1000));
	                            break;
	
	                        // '00'
	                        // case 'M':
	                        case 77:
	                            resultString += padTill2(date.getMinutes(), padding);
	                            break;
	
	                        // 'am'
	                        // case 'P':
	                        case 80:
	                            resultString += date.getHours() < 12 ? locale.am : locale.pm;
	                            break;
	
	                        // '00:00'
	                        // case 'R':
	                        case 82:
	                            resultString += _processFormat(locale.formats.R, date, locale, timestamp);
	                            break;
	
	                        // '00'
	                        // case 'S':
	                        case 83:
	                            resultString += padTill2(date.getSeconds(), padding);
	                            break;
	
	                        // '00:00:00'
	                        // case 'T':
	                        case 84:
	                            resultString += _processFormat(locale.formats.T, date, locale, timestamp);
	                            break;
	
	                        // '00'
	                        // case 'U':
	                        case 85:
	                            resultString += padTill2(weekNumber(date, 'sunday'), padding);
	                            break;
	
	                        // '00'
	                        // case 'W':
	                        case 87:
	                            resultString += padTill2(weekNumber(date, 'monday'), padding);
	                            break;
	
	                        // '16:00:00'
	                        // case 'X':
	                        case 88:
	                            resultString += _processFormat(locale.formats.X, date, locale, timestamp);
	                            break;
	
	                        // '1970'
	                        // case 'Y':
	                        case 89:
	                            resultString += date.getFullYear();
	                            break;
	
	                        // 'GMT'
	                        // case 'Z':
	                        case 90:
	                            if (_useUtcBasedDate && _customTimezoneOffset === 0) {
	                                resultString += "GMT";
	                            }
	                            else {
	                                // fixme optimize
	                                var tzString = date.toString().match(/\(([\w\s]+)\)/);
	                                resultString += tzString && tzString[1] || '';
	                            }
	                            break;
	
	                        // 'Thu'
	                        // case 'a':
	                        case 97:
	                            resultString += locale.shortDays[date.getDay()];
	                            break;
	
	                        // 'Jan'
	                        // case 'b':
	                        case 98:
	                            resultString += locale.shortMonths[date.getMonth()];
	                            break;
	
	                        // ''
	                        // case 'c':
	                        case 99:
	                            resultString += _processFormat(locale.formats.c, date, locale, timestamp);
	                            break;
	
	                        // '01'
	                        // case 'd':
	                        case 100:
	                            resultString += padTill2(date.getDate(), padding);
	                            break;
	
	                        // ' 1'
	                        // case 'e':
	                        case 101:
	                            resultString += padTill2(date.getDate(), padding == null ? ' ' : padding);
	                            break;
	
	                        // 'Jan'
	                        // case 'h':
	                        case 104:
	                            resultString += locale.shortMonths[date.getMonth()];
	                            break;
	
	                        // '000'
	                        // case 'j':
	                        case 106:
	                            var y = new Date(date.getFullYear(), 0, 1);
	                            var day = Math.ceil((date.getTime() - y.getTime()) / (1000 * 60 * 60 * 24));
	                            resultString += padTill3(day);
	                            break;
	
	                        // ' 0'
	                        // case 'k':
	                        case 107:
	                            resultString += padTill2(date.getHours(), padding == null ? ' ' : padding);
	                            break;
	
	                        // '12'
	                        // case 'l':
	                        case 108:
	                            resultString += padTill2(hours12(date.getHours()), padding == null ? ' ' : padding);
	                            break;
	
	                        // '01'
	                        // case 'm':
	                        case 109:
	                            resultString += padTill2(date.getMonth() + 1, padding);
	                            break;
	
	                        // '\n'
	                        // case 'n':
	                        case 110:
	                            resultString += '\n';
	                            break;
	
	                        // '1st'
	                        // case 'o':
	                        case 111:
	                            resultString += String(date.getDate()) + ordinal(date.getDate());
	                            break;
	
	                        // 'AM'
	                        // case 'p':
	                        case 112:
	                            resultString += date.getHours() < 12 ? locale.AM : locale.PM;
	                            break;
	
	                        // '12:00:00 AM'
	                        // case 'r':
	                        case 114:
	                            resultString += _processFormat(locale.formats.r, date, locale, timestamp);
	                            break;
	
	                        // '0'
	                        // case 's':
	                        case 115:
	                            resultString += Math.floor(timestamp / 1000);
	                            break;
	
	                        // '\t'
	                        // case 't':
	                        case 116:
	                            resultString += '\t';
	                            break;
	
	                        // '4'
	                        // case 'u':
	                        case 117:
	                            var day = date.getDay();
	                            resultString += day === 0 ? 7 : day;
	                            break; // 1 - 7, Monday is first day of the week
	
	                        // ' 1-Jan-1970'
	                        // case 'v':
	                        case 118:
	                            resultString += _processFormat(locale.formats.v, date, locale, timestamp);
	                            break;
	
	                        // '4'
	                        // case 'w':
	                        case 119:
	                            resultString += date.getDay();
	                            break; // 0 - 6, Sunday is first day of the week
	
	                        // '12/31/69'
	                        // case 'x':
	                        case 120:
	                            resultString += _processFormat(locale.formats.x, date, locale, timestamp);
	                            break;
	
	                        // '70'
	                        // case 'y':
	                        case 121:
	                            resultString += ('' + date.getFullYear()).slice(2);
	                            break;
	
	                        // '+0000'
	                        // case 'z':
	                        case 122:
	                            if (_useUtcBasedDate && _customTimezoneOffset === 0) {
	                                resultString += extendedTZ ? "+00:00" : "+0000";
	                            }
	                            else {
	                                var off;
	                                if (_customTimezoneOffset !== 0) {
	                                    off = _customTimezoneOffset / (60 * 1000);
	                                }
	                                else {
	                                    off = -date.getTimezoneOffset();
	                                }
	                                var sign = off < 0 ? '-' : '+';
	                                var sep = extendedTZ ? ':' : '';
	                                var hours = Math.floor(Math.abs(off / 60));
	                                var mins = Math.abs(off % 60);
	                                resultString += sign + padTill2(hours) + sep + padTill2(mins);
	                            }
	                            break;
	
	                        default:
	                            resultString += format[i];
	                            break;
	                    }
	
	                    padding = null;
	                    isInScope = false;
	                    continue;
	                }
	
	                // '%'
	                if (currentCharCode === 37) {
	                    isInScope = true;
	                    continue;
	                }
	
	                resultString += format[i];
	            }
	
	            return resultString;
	        }
	
	        var strftime = _strftime;
	
	        strftime.localize = function(locale) {
	            return new Strftime(locale || _locale, _customTimezoneOffset, _useUtcBasedDate);
	        };
	
	        strftime.timezone = function(timezone) {
	            var customTimezoneOffset = _customTimezoneOffset;
	            var useUtcBasedDate = _useUtcBasedDate;
	
	            var timezoneType = typeof timezone;
	            if (timezoneType === 'number' || timezoneType === 'string') {
	                useUtcBasedDate = true;
	
	                // ISO 8601 format timezone string, [-+]HHMM
	                if (timezoneType === 'string') {
	                    var sign = timezone[0] === '-' ? -1 : 1,
	                        hours = parseInt(timezone.slice(1, 3), 10),
	                        minutes = parseInt(timezone.slice(3, 5), 10);
	
	                    customTimezoneOffset = sign * ((60 * hours) + minutes) * 60 * 1000;
	                    // in minutes: 420
	                }
	                else if (timezoneType === 'number') {
	                    customTimezoneOffset = timezone * 60 * 1000;
	                }
	            }
	
	            return new Strftime(_locale, customTimezoneOffset, useUtcBasedDate);
	        };
	
	        strftime.utc = function() {
	            return new Strftime(_locale, _customTimezoneOffset, true);
	        };
	
	        return strftime;
	    }
	
	    function padTill2(numberToPad, paddingChar) {
	        if (paddingChar === '' || numberToPad > 9) {
	            return numberToPad;
	        }
	        if (paddingChar == null) {
	            paddingChar = '0';
	        }
	        return paddingChar + numberToPad;
	    }
	
	    function padTill3(numberToPad) {
	        if (numberToPad > 99) {
	            return numberToPad;
	        }
	        if (numberToPad > 9) {
	            return '0' + numberToPad;
	        }
	        return '00' + numberToPad;
	    }
	
	    function hours12(hour) {
	        if (hour === 0) {
	            return 12;
	        }
	        else if (hour > 12) {
	            return hour - 12;
	        }
	        return hour;
	    }
	
	    // firstWeekday: 'sunday' or 'monday', default is 'sunday'
	    //
	    // Pilfered & ported from Ruby's strftime implementation.
	    function weekNumber(date, firstWeekday) {
	        firstWeekday = firstWeekday || 'sunday';
	
	        // This works by shifting the weekday back by one day if we
	        // are treating Monday as the first day of the week.
	        var weekday = date.getDay();
	        if (firstWeekday === 'monday') {
	            if (weekday === 0) // Sunday
	                weekday = 6;
	            else
	                weekday--;
	        }
	
	        var firstDayOfYearUtc = Date.UTC(date.getFullYear(), 0, 1),
	            dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
	            yday = Math.floor((dateUtc - firstDayOfYearUtc) / 86400000),
	            weekNum = (yday + 7 - weekday) / 7;
	
	        return Math.floor(weekNum);
	    }
	
	    // Get the ordinal suffix for a number: st, nd, rd, or th
	    function ordinal(number) {
	        var i = number % 10;
	        var ii = number % 100;
	
	        if ((ii >= 11 && ii <= 13) || i === 0 || i >= 4) {
	            return 'th';
	        }
	        switch (i) {
	            case 1: return 'st';
	            case 2: return 'nd';
	            case 3: return 'rd';
	        }
	    }
	
	    function getTimestampToUtcOffsetFor(date) {
	        return (date.getTimezoneOffset() || 0) * 60000;
	    }
	
	}());


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.notificationState = notificationState;
	exports.requestPermission = requestPermission;
	exports.notify = notify;
	var notification_requesting_permission = false;
	
	function notificationState() {
		if (notification_requesting_permission) {
			return 'requesting';
		}
	
		if (!('Notification' in window)) {
			return 'not_supported';
		}
	
		if (Notification.permission === 'granted') {
			return 'ok';
		}
	
		if (Notification.permission === 'denied') {
			return 'denied';
		}
	
		return 'needs_request';
	};
	
	function requestPermission(cb) {
		notification_requesting_permission = true;
	
		Notification.requestPermission(function (permission) {
			notification_requesting_permission = false;
			cb(permission);
		});
	};
	
	function notify(title, body, icon) {
		if (notificationState() !== 'ok') {
			return false;
		}
	
		var options = {
			body: body,
			icon: icon || 'https://app.orangechat.io/assets/logo-color.png'
		};
		return new Notification(title, options);
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(25);
	
	var Panel = {};
	
	Panel.controller = function (args) {
		var _this = this;
	
		this.view = null;
		this.style = '';
	
		this.open = function (event, view) {
			args.bus.trigger('panel.opening');
			_this.view = view;
			m.redraw(); // Hacky... But we need the height of the panel after it's rendered.
	
			_this.style = 'display: block; left:  ' + _this.calculateOffsetLeft(event) + 'px; top: ' + _this.calculateOffsetTop(event) + 'px;';
	
			args.bus.trigger('panel.opened');
		};
	
		this.close = function () {
			args.bus.trigger('panel.closing');
			_this.style = 'display: none;';
			args.bus.trigger('panel.closed');
		};
	
		this.calculateOffsetTop = function (event) {
			var workspace_height = $('.OC__workspace').height();
			var panel_height = $('.OC-Panel').height();
	
			if (event.clientY + panel_height > window.innerHeight) {
				return window.innerHeight - (window.innerHeight - workspace_height) - panel_height - 20;
			}
	
			return event.clientY - (window.innerHeight - workspace_height);
		};
	
		this.calculateOffsetLeft = function (event) {
			return event.clientX - $('.OC__workspace').offset().left;
		};
	
		args.bus.on('panel.open', this.open);
		args.bus.on('panel.close', this.close);
	
		args.bus.on('panel.opened', function () {
			args.bus.once('action.document_click', function () {
				args.bus.trigger('panel.close');
			});
		});
	};
	
	Panel.view = function (controller) {
		return m('div', {
			class: 'OC-Panel',
			style: controller.style
		}, [m('h5', { class: 'OC-Panel__title' }, [controller.view != null ? controller.view.instance.title() : '']), controller.view != null ? controller.view.view() : '']);
	};
	
	exports.default = Panel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Panel.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Panel.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-Panel {\n  position: absolute;\n  left: 0;\n  top: 0;\n  display: none;\n  z-index: 100;\n  width: 215px;\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14), 0 0px 5px 0 rgba(0,0,0,0.12), 0 2px 1px -2px rgba(0,0,0,0.2);\n  overflow: hidden;\n  padding: 10px 0;\n}\n.OC-Panel__title {\n  font-size: 1.071428571428571em;\n  font-weight: 500;\n  color: rgba(0,0,0,0.87);\n  padding: 10px 16px;\n  padding-top: 0;\n}\n.OC-Panel__link {\n  cursor: pointer;\n  color: rgba(0,0,0,0.87);\n  font-size: 1em;\n  padding: 10px 16px;\n  display: block;\n}\n.OC-Panel__link:hover {\n  background-color: rgba(0,0,0,0.04);\n}\n.OC-Panel hr {\n  margin: 10px 0;\n  border: 0;\n  border-top: 1px solid rgba(0,0,0,0.13);\n}\n", ""]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var UserPanel = {};
	
	UserPanel.controller = function (args) {
		var _this = this;
	
		this.username = args.username;
		this.source = args.source;
		this.room = args.room;
		this.room_manager = args.room_manager;
		this.subchat = _Subchat2.default.instance();
	
		if (this.source === 'irc') {
			this.title = m.prop(this.username);
		} else {
			this.title = m.prop('/u/' + this.username);
		}
	
		this.openPrivateChannel = function () {
			_this.subchat.createChannel(_this.username).then(function (resp) {
				if (!resp.channel_name) {
					return;
				}
	
				var label = resp.channel_label;
				// Since we only have 1 user in this invite, set the label to
				// the user name.
				label = _this.username;
	
				var channel = _this.room_manager.createRoom(resp.channel_name, {
					label: label
				});
	
				_this.room_manager.setActive(channel.instance.name());
				args.bus.trigger('panel.close');
			});
		};
	
		this.inviteToChannel = function (channel) {
			_this.subchat.inviteToChannel(channel.name(), _this.username).then(function (resp) {
				if (resp.status == 'ok') {
					args.bus.trigger('panel.close');
					return;
				}
	
				console.log('inviteToChannel() Something went wrong...', resp);
			});
		};
	
		this.banFromChannel = function () {
			if (!confirm('Ban ' + _this.username + ' from ' + _this.room.name() + '?')) {
				return;
			}
	
			_this.subchat.banFromChannel(_this.room.name(), _this.username).then(function (resp) {
				if (resp.status == 'ok') {
					args.bus.trigger('panel.close');
					return;
				}
	
				console.log('banFromChannel() Something went wrong...', resp);
			});
		};
	
		this.toolboxShowUser = function () {
			function doFn() {
				var $lastPopup = $('.mod-toolbox .tb-popup:last-of-type');
				if (!$lastPopup.length) {
					setTimeout(doFn, 200);
					return;
				}
	
				var popupOffset = $lastPopup.offset();
				var newTop = popupOffset.top - 300;
				var newLeft = popupOffset.left - 200;
				$lastPopup.css({
					'top':  newTop + 'px',
					'left': newLeft + 'px',
					'z-index': '2147483675'
				});
				console.log($lastPopup[0]);
			}
	
			doFn();
		};
	
		setTimeout(function () {
			console.log('Dispatching TBNewThings event');
			var event = new CustomEvent("TBNewThings");
			window.dispatchEvent(event);
		}, 200);
	};
	
	UserPanel.view = function (controller) {
		var items = [];
	
		if (controller.source === 'irc') {
			items = [m('p', { class: 'OC-Panel__link' }, 'This person is talking via IRC')];
		} else {
			items = [m('a', {
				class: 'OC-Panel__link',
				onclick: controller.openPrivateChannel
			}, 'Send private message'), m('a', {
				class: 'OC-Panel__link',
				href: 'https://www.reddit.com/u/' + controller.username
			}, 'Reddit profile'), UserPanel.viewInviteToChannels(controller)];
		}
	
		items.push(UserPanel.viewModAction(controller));
	
		return m('div', { class: 'OC-Panel__content' }, items);
	};
	
	UserPanel.viewInviteToChannels = function (controller) {
		var content;
		var chan_list;
		var channels = _.filter(controller.room_manager.rooms, function (channel) {
			return channel.instance.access.is_invite;
		});
	
		if (!channels.length) {
			return;
		}
	
		if (channels.length === 1) {
			content = m('a', {
				class: 'OC-Panel__link',
				onclick: inviteFn(channels[0].instance)
			}, 'Invite to ' + channels[0].instance.displayLabel());
		} else {
			chan_list = _.map(channels, function (channel) {
				return m('a', {
					class: 'OC-Panel__link',
					onclick: inviteFn(channel.instance)
				}, channel.instance.displayLabel());
			});
	
			content = [m('hr')].concat(chan_list);
		};
	
		return m('div', {
			class: 'OC-Panel__invite-list OC-Panel__invite-list--' + (channels.length === 1 ? 'single' : 'multiple')
		}, content);
	
		function inviteFn(channel) {
			return function () {
				controller.inviteToChannel(channel);
			};
		};
	};
	
	UserPanel.viewModAction = function (controller) {
		var _m;
	
		if (!controller.room.access.is_reddit_mod) {
			return;
		}
	
		var content = [m('hr'), m('a', {
			class: 'OC-Panel__link',
			onclick: controller.banFromChannel
		}, 'Ban user')];
	
		/*
	 toolbox note
	 * when moving a window, it changes the z-index to 100000. Why change it at all?
	 * user notes gets the subreddit from the URL, not the subreddit given in the dom. this causes issues in oc to show correct notes when
	   browsing /r/all while chatting in /r/orangechat for example
	  */
		/* dev toolbox version
	 <div class="entry thing ut-thing" data-subreddit="history" data-author="noeatnosleep"> 
	     <span class="author user" style="display:none">noeatnosleep</span>
	     <a class="bylink" style="display:none" href="https://orangechat.io/#/r/history">channel link</a>
	     <a href="javascript:;" title="Perform various mod actions on this user" class="global-mod-button">mod</a><br>
	     
	     <a href="javascript:;" class="user-history-button" title="view user history">user history</a><br>
	     <span title="View and add notes about this user for /r/history" class="usernote-button usernote-span-history"><a class="add-user-tag-history" id="add-user-tag" href="javascript:;">Notes</a></span>
	 </div>
	  */
	
		/* live toolbox version
	 <div class="thing color-processed" data-subreddit="history" data-author="noeatnosleep">
	     <div class="entry mod-button" subreddit="history">
	         <span class="author user" style="display:none">noeatnosleep</span>
	         <a class="bylink" style="display:none" href="https://orangechat.io/#/r/history">channel link</a>
	         <a href="javascript:;" title="Perform various mod actions on this user" class="global-mod-button">mod</a><br>
	         
	         <a href="javascript:;" class="user-history-button" title="view user history">user history</a><br>
	         
	         <span title="View and add notes about this user for /r/history" class="usernote-button usernote-span-history">
	             <a class="add-user-tag-history" id="add-user-tag" href="javascript:;">Notes</a>
	         </span>
	     </div>
	 </div>
	 
	 
	 <div class="thing color-processed" data-subreddit="history" data-author="noeatnosleep">
	     <div class="entry mod-button" subreddit="history">
	         <span class="subreddit" style="display:none">history</span>
	         <span class="author user" style="display:none">noeatnosleep</span>
	         <a class="bylink" style="display:none" href="https://orangechat.io/#/r/history">channel link</a>
	         <a href="javascript:;" title="Perform various mod actions on this user" class="global-mod-button">mod</a><br>
	         
	         <a href="javascript:;" class="user-history-button" title="view user history">user history</a><br>
	         
	         <span title="View and add notes about this user for /r/history" class="usernote-button usernote-span-history">
	             <a class="add-user-tag-history" id="add-user-tag" href="javascript:;">Notes</a>
	         </span>
	     </div>
	 </div>
	  */
		var subreddit_name = (controller.room.name() || '').replace('reddit_sub_', '').replace('reddit_mod_', '');
		content.push(m('hr'));
		content.push(m('div', { class: 'thing color-processed', 'data-subreddit': subreddit_name, 'data-author': controller.username }, [m('div', { class: 'entry mod-button', subreddit: subreddit_name }, [m('span', { class: 'subreddit', style: 'display:none;' }, subreddit_name), m('span', { class: 'author user', style: 'display:none;' }, controller.username), m('a', { class: "bylink", style: 'display:none;', href: window.location.href }, 'channel link'), m('a', (_m = { class: "global-mod-button", title: 'display:none;', href: 'javascript:;' }, _defineProperty(_m, 'title', 'Perform various mod actions on this user'), _defineProperty(_m, 'style', 'display:none;'), _m), 'mod'), m('a', { class: "OC-Panel__link user-history-button", title: "view user history", onclick: controller.toolboxShowUser }, 'Subreddit history'), m('span', {
			title: "View and add notes about this user for /r/" + subreddit_name,
			class: "usernote-button usernote-span-" + subreddit_name
		}, [m('a', { class: "OC-Panel__link add-user-tag-" + subreddit_name, id: "add-user-tag", onclick: controller.toolboxShowUser }, 'Notes')])])]));
	
		return m('div', {
			class: 'OC-Panel__mod-actions'
		}, content);
	};
	
	exports.default = UserPanel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GroupSettings = {};
	
	GroupSettings.controller = function (args) {
		var _this = this;
	
		this.room = args.room;
		this.room_manager = args.room_manager;
		this.subchat = _Subchat2.default.instance();
	
		this.target_username = m.prop('');
		this.channel_label = m.prop(this.room.label());
	
		this.title = m.prop('group options');
	
		this.sendInvite = function (e) {
			var event = $.event.fix(e);
			event.preventDefault();
	
			var usernames = _this.target_username().split(/[ ,]/);
			usernames = _.compact(usernames).join(',');
	
			_this.subchat.inviteToChannel(_this.room.name(), usernames).then(function (resp) {
				if (resp.status == 'ok') {
					args.bus.trigger('panel.close');
					return;
				}
	
				console.log('sendInvite() Something went wrong...', resp);
			});
		};
	
		this.saveName = function (e) {
			var event = $.event.fix(e);
			event.preventDefault();
	
			var new_name = _this.channel_label();
			if (!new_name) {
				// TODO: Show an error or highlight the name field in red or something
				return;
			}
	
			var updates = {
				label: new_name
			};
	
			_this.subchat.updateChannel(_this.room.name(), updates).then(function (resp) {
				if (resp.status == 'ok') {
					args.bus.trigger('messageroom.renamed', _this.room);
					return;
				}
	
				console.log('updateChannel() Something went wrong...', resp);
			});
		};
	};
	
	GroupSettings.view = function (controller) {
		return m('div', { class: 'OC-MessageRoom__group-settings' }, [m('form', { class: 'OC-MessageRoom__group-settings-section', onsubmit: controller.sendInvite }, [m('input', {
			placeholder: 'type any username',
			id: 'groupinvite',
			onkeyup: m.withAttr('value', controller.target_username)
		}), m('button[type="submit"]', [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"]')])]), m('label[for="groupinvite"]', 'Invite someone to this channel')]), m('form', { class: 'OC-MessageRoom__group-settings-section', onsubmit: controller.saveName }, [m('input', {
			placeholder: 'think of a cool name',
			id: 'groupname',
			onkeyup: m.withAttr('value', controller.channel_label),
			//config: GroupSettings.viewConfigChannelname
			value: controller.channel_label()
		}), m('button[type="submit"]', [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"]')])]), m('label[for="groupname"]', 'Change the group name')])]);
	};
	
	GroupSettings.viewConfigChannelname = function (el, already_init, ctx, vdom) {
		if (!already_init) {
			el._created = new Date().toString();
			//vdom.attrs.value = ctx.channel_label
		};
	};
	
	exports.default = GroupSettings;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(30);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * The sidebar UI
	 */
	var OptionsMenu = {};
	
	OptionsMenu.controller = function (args) {
		var _this = this;
	
		_.extend(this, Backbone.Events);
		this.bus = args.bus;
		this.subchat = _Subchat2.default.instance();
	
		this.listenTo(this.bus, 'action.document_click', function (event) {
			_this.close();
		});
	
		this.onLogoutItemClick = function () {
			if (!confirm('Are you sure you want to logout of OrangeChat? This will close any conversations you are currently in')) {
				return;
			}
			_this.subchat.logout().then(function () {
				window.location.reload();
			});
		};
	
		this.onPreferencesClick = function () {
			_this.bus.trigger('action.show_settings');
		};
	
		this.close = function () {
			_this.trigger('close');
			_this.stopListening();
		};
	
		this.onClick = function (event) {
			event = $.event.fix(event);
			event.stopPropagation();
			_this.close();
		};
	};
	
	OptionsMenu.view = function (controller) {
		var items = [];
	
		items.push(m('h5', {
			class: 'OC-OptionsMenu__title'
		}, '/u/' + controller.subchat.username()));
	
		items.push(m('a', {
			onclick: controller.onPreferencesClick,
			class: 'OC-OptionsMenu__link'
		}, 'Preferences'));
	
		var is_logged_in = !!controller.subchat.username();
		if (is_logged_in) {
			items.push(m('a', {
				onclick: controller.onLogoutItemClick,
				class: 'OC-OptionsMenu__link'
			}, 'Logout'));
		}
	
		items.push(m('hr'));
	
		if (!Helpers.hasExtension() && !Helpers.isInReddit()) {
			items.push(m('a', {
				href: 'https://orangechat.io/',
				class: 'OC-OptionsMenu__link',
				target: '_blank'
			}, 'Download browser extension'));
		}
	
		items.push(m('a', {
			href: 'https://orangechat.io/',
			class: 'OC-OptionsMenu__link',
			target: '_blank'
		}, 'orangechat.io'));
		items.push(m('a', {
			href: 'https://twitter.com/orangechatio',
			class: 'OC-OptionsMenu__link',
			target: '_blank'
		}, 'Twitter'));
	
		return m('div', {
			onclick: controller.onClick,
			class: 'OC-OptionsMenu'
		}, items);
	};
	
	exports.default = OptionsMenu;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./OptionsMenu.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./OptionsMenu.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-OptionsMenu {\n  position: absolute;\n  left: 10px;\n  top: 10px;\n  z-index: 120;\n  right: 10px;\n  background-color: #fff;\n  border-radius: 3px;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.14), 0 0px 5px 0 rgba(0,0,0,0.12), 0 2px 1px -2px rgba(0,0,0,0.2);\n  overflow: hidden;\n  padding: 10px 0;\n}\n.OC-OptionsMenu__title {\n  font-size: 1.071428571428571em;\n  font-weight: 500;\n  color: rgba(0,0,0,0.87);\n  padding: 10px 16px;\n  padding-top: 0;\n}\n.OC-OptionsMenu__link {\n  cursor: pointer;\n  color: rgba(0,0,0,0.87);\n  font-size: 1em;\n  padding: 10px 16px;\n  display: block;\n}\n.OC-OptionsMenu__link:hover {\n  background-color: rgba(0,0,0,0.04);\n}\n.OC-OptionsMenu hr {\n  margin: 10px 0;\n  border: 0;\n  border-top: 1px solid rgba(0,0,0,0.13);\n}\n", ""]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(33);
	
	/**
	 * The topbar UI
	 */
	var Topbar = {};
	
	Topbar.controller = function (args) {
		var _this = this;
	
		this.app = args.app;
	
		this.toggleApp = function () {
			_this.app.bus.trigger('action.toggle_app');
		};
	};
	
	Topbar.view = function (controller) {
		var active_room = controller.app.rooms.active();
		var total_unread = 0;
		var have_highlight = false;
		var title = [m('img', {
			class: 'OC-Topbar__branding-logo',
			src: 'https://app.orangechat.io/assets/logo-white.svg'
		})];
	
		have_highlight = active_room ? active_room.instance.unread_highlight : false;
	
		controller.app.rooms.rooms.map(function (room) {
			total_unread += room.instance.unread_counter;
		});
	
		if (total_unread > 0) {
			title.push(m('div', {
				class: 'OC-Topbar__badge',
				title: 'Unread messages'
			}, total_unread));
		}
	
		return m('div', {
			class: total_unread > 0 && have_highlight ? 'OC-Topbar OC-Topbar--new-messages' : 'OC-Topbar',
			onclick: controller.toggleApp
		}, title);
	};
	
	exports.default = Topbar;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(34);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Topbar.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Topbar.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-Topbar {\n  display: block;\n  padding: 20px 32px;\n  cursor: pointer;\n  zoom: 1;\n}\n.OC-Topbar:after,\n.OC-Topbar:before {\n  content: \"\";\n  display: table;\n}\n.OC-Topbar:after {\n  clear: both;\n}\n.OC-Topbar__branding-logo {\n  height: 24px;\n  width: auto;\n  display: block;\n  float: left;\n}\n.OC-Topbar__badge {\n  display: block;\n  color: #fff;\n  font-size: 0.857142857142857em;\n  height: 18px;\n  padding: 0 8px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  line-height: 1;\n  padding-top: 2px;\n  text-align: center;\n  float: right;\n  margin-left: 16px;\n  margin-top: 4px;\n}\n", ""]);
	
	// exports


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(36);
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HomeView = {};
	
	HomeView.controller = function (args) {
		var app = args.app;
	
		this.getStarted = function () {
			app.subchat.auth().then(function (result) {
				// Logged in OK...
				console.log('Logged in ok.', result);
				app.addInitialRooms();
			}).then(null, function (err) {
				// Logging in failed...
				//console.log('Failed to login.', err);
			});
		};
	};
	
	HomeView.view = function (controller) {
		return m('div', { class: 'OC-HomeView' }, [m('div', { class: 'OC-HomeView__get-started' }, [m('img', {
			class: 'OC-HomeView__get-started-branding-logo',
			src: 'https://app.orangechat.io/assets/logo-white.svg'
		}), m('h4', 'Welcome to orangechat.io'), m('a', { class: 'OC-HomeView__get-started-button', onclick: controller.getStarted }, 'Get Started')])]);
	};
	
	exports.default = HomeView;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./HomeView.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./HomeView.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-HomeView {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  text-align: center;\n  background: #ff5722;\n}\n.OC-HomeView__get-started {\n  padding: 0 25px;\n}\n.OC-HomeView__get-started-branding-logo {\n  height: 35px;\n  width: auto;\n}\n.OC-HomeView__get-started h4 {\n  font-size: 1.071428571428571em;\n  font-weight: 500;\n  color: #fff;\n  margin: 10px 0;\n}\n.OC-HomeView__get-started-button {\n  display: inline-block;\n  text-align: center;\n  font-size: 1em;\n  -webkit-align-self: center;\n      -ms-flex-item-align: center;\n          align-self: center;\n  color: #fff;\n  padding: 3px 8px;\n  font-weight: 500;\n  border: 1px solid #fff;\n  border-radius: 3px;\n  line-height: 1.1;\n  cursor: pointer;\n  background-color: #ff5722;\n}\n.OC-HomeView__get-started-button:hover {\n  border-color: rgba(255,255,255,0.7);\n  color: rgba(255,255,255,0.7);\n  text-decoration: none;\n}\n.OC__ui--standalone .OC-HomeView__get-started h4,\n.OC__ui--standalone .OC-HomeView__get-started-button {\n  font-size: 1.928571428571429em;\n}\n.OC__ui--standalone .OC-HomeView__get-started-button {\n  margin-top: 30px;\n}\n.OC__ui--standalone .OC-HomeView__get-started-branding-logo {\n  height: 60px;\n  margin-bottom: 10px;\n}\n", ""]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(39);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	var _Subchat = __webpack_require__(16);
	
	var _Subchat2 = _interopRequireDefault(_Subchat);
	
	var _Notifications = __webpack_require__(23);
	
	var Notifications = _interopRequireWildcard(_Notifications);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Settings = {};
	
	Settings.controller = function (args) {
		var _this = this;
	
		this.bus = args.bus;
	
		this.toggleApp = function () {
			_this.bus.trigger('action.toggle_app');
		};
	
		this.close = function () {
			_this.bus.trigger('action.close_workspace');
		};
	
		/**
	  * Notifications
	  */
		this.notificationState = function () {
			return Notifications.notificationState();
		};
	
		this.requestNotificationPermission = function () {
			Notifications.requestPermission(function (permission) {
				m.redraw();
			});
		};
	};
	
	Settings.view = function (controller) {
		var header = Settings.viewHeader(controller);
		var content = Settings.viewContent(controller);
	
		return m('div', { class: 'OC-MessageRoom' }, [header, m('div', { class: 'OC__workspace-content' }, content)]);
	};
	
	Settings.viewHeader = function (controller) {
		return m('div', { class: 'OC-MessageRoom__header' }, [m('div', { class: 'OC-MessageRoom__header-collapse', title: 'Toggle sidebar', onclick: controller.close }, [m('svg[version="1.1"][xmlns="http://www.w3.org/2000/svg"][xmlns:xlink="http://www.w3.org/1999/xlink"][width="24"][height="24"][viewBox="0 0 24 24"]', [m('path[d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"]')])]), m('div', { class: 'OC-MessageRoom__header-info', onclick: Helpers.isInReddit() ? controller.toggleApp : null }, [m('h4', 'Preferences')])]);
	};
	
	Settings.viewContent = function (controller) {
		var sections = [];
	
		sections.push(m('div', {
			class: 'OC-Settings__section'
		}, Settings.viewSectionNotifications(controller)));
	
		return sections;
	};
	
	Settings.viewSectionNotifications = function (controller) {
		var state = controller.notificationState();
		var action = null;
	
		if (state === 'needs_request') {
			action = m('button', { onclick: controller.requestNotificationPermission }, 'Enable Notifications');
		} else if (state === 'requesting') {
			action = m('button', { disabled: true }, 'Requesting permission...');
		} else if (state === 'not_supported') {
			action = m('span', 'Your browser does not support desktop notifications :(');
		} else if (state === 'denied') {
			action = m('span', 'Your browser has denied access to notifications. You may enable them in your browser settings');
		} else if (state === 'ok') {
			action = m('span', 'Notifications enabled :)');
		}
	
		return [m('h5', 'Enable message notifications'), m('p', 'Recieve a notification when somebody mentions you'), m('div', { style: 'text-align:right;' }, [action])];
	};
	
	exports.default = Settings;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Settings.styl", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/stylus-loader/index.js!./Settings.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".OC-Settings__header {\n  height: 46px;\n}\n", ""]);
	
	// exports


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sockjsClient = __webpack_require__(42);
	
	var _sockjsClient2 = _interopRequireDefault(_sockjsClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MESSAGE_TYPE_JOIN = '01';
	var MESSAGE_TYPE_LEAVE = '02';
	var MESSAGE_TYPE_MESSAGE = '03';
	var MESSAGE_TYPE_GROUPMETA = '04';
	
	var Transport = function () {
		function Transport(sid, bus) {
			_classCallCheck(this, Transport);
	
			this.sid = null;
			this.bus = bus;
			this.connected = false;
			this.queue = [];
	
			this.setSessionId(sid);
			this.updateGroupMetaLoop();
		}
	
		_createClass(Transport, [{
			key: 'setSessionId',
			value: function setSessionId(sid) {
				this.sid = sid;
				if (sid) {
					this.initSocket();
				}
			}
		}, {
			key: 'initSocket',
			value: function initSocket() {
				var self = this;
				var reconnect_attempts = 0;
	
				connectSocket();
	
				function connectSocket() {
					self.bus.trigger('transport.connecting', {
						reconnect_attempts: reconnect_attempts
					});
					self.sock = new _sockjsClient2.default('https://app.orangechat.io/transport2?sid=' + self.sid);
					self.sock.onopen = onOpen;
					self.sock.onclose = onClose;
					self.sock.onmessage = onMessage;
				}
	
				function onOpen() {
					self.bus.trigger('transport.open', {
						was_reconnection: reconnect_attempts > 0,
						reconnect_attempts: reconnect_attempts
					});
	
					reconnect_attempts = 0;
					self.connected = true;
					self.flushSocket();
				}
	
				function onMessage(event) {
					var message_type = event.data.substring(0, 2);
					var raw_message = event.data.substring(2);
					var message;
	
					if (message_type === MESSAGE_TYPE_MESSAGE) {
						try {
							message = JSON.parse(raw_message);
							self.bus.trigger('transport.message', message);
						} catch (err) {
							console.log(err);
						}
					} else if (message_type === MESSAGE_TYPE_GROUPMETA) {
						var groups = {};
						_.map(raw_message.split(' '), function (group_meta) {
							var parts = group_meta.split(':');
							groups[parts[0]] = {
								name: parts[0],
								num_users: parseInt(parts[1], 10)
							};
						});
	
						m.startComputation();
						self.bus.trigger('transport.groupmeta', groups);
						m.endComputation();
					}
				}
	
				function onClose() {
					self.connected = false;
					self.bus.trigger('transport.close');
	
					setTimeout(function () {
						reconnect_attempts++;
						connectSocket();
					}, reconnectInterval(reconnect_attempts));
				}
	
				// Exponential backoff upto 1min for reconnections
				function reconnectInterval(attempt_num) {
					var interval = Math.pow(2, attempt_num) - 1;
					interval = Math.min(60, interval);
					return interval * 1000;
				}
			}
		}, {
			key: 'join',
			value: function join(group) {
				var group_str = [].concat(group).join(',');
				this.queue.push(MESSAGE_TYPE_JOIN + group_str);
				this.flushSocket();
			}
		}, {
			key: 'leave',
			value: function leave(group) {
				var group_str = [].concat(group).join(',');
				this.queue.push(MESSAGE_TYPE_LEAVE + group_str);
				this.flushSocket();
			}
		}, {
			key: 'updateGroupMeta',
			value: function updateGroupMeta() {
				this.queue.push(MESSAGE_TYPE_GROUPMETA);
				this.flushSocket();
			}
		}, {
			key: 'updateGroupMetaLoop',
			value: function updateGroupMetaLoop() {
				if (this.connected) {
					this.updateGroupMeta();
				}
				setTimeout(_.bind(this.updateGroupMetaLoop, this), 10000);
			}
		}, {
			key: 'flushSocket',
			value: function flushSocket() {
				var _this = this;
	
				if (!this.sock || this.sock.readyState !== 1) {
					return;
				}
	
				_.each(this.queue, function (data) {
					_this.sock.send(data);
				});
	
				this.queue = [];
			}
		}]);
	
		return Transport;
	}();
	
	exports.default = Transport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var transportList = __webpack_require__(43);
	
	module.exports = __webpack_require__(90)(transportList);
	
	// TODO can't get rid of this until all servers do
	if ('_sockjs_onload' in global) {
	  setTimeout(global._sockjs_onload, 1);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = [
	  // streaming transports
	  __webpack_require__(44)
	, __webpack_require__(61)
	, __webpack_require__(71)
	, __webpack_require__(73)
	, __webpack_require__(76)(__webpack_require__(73))
	
	  // polling transports
	, __webpack_require__(83)
	, __webpack_require__(76)(__webpack_require__(83))
	, __webpack_require__(85)
	, __webpack_require__(86)
	, __webpack_require__(76)(__webpack_require__(85))
	, __webpack_require__(87)
	];


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(46)
	  , urlUtils = __webpack_require__(49)
	  , inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  , WebsocketDriver = __webpack_require__(60)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:websocket');
	}
	
	function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  EventEmitter.call(this);
	  debug('constructor', transUrl);
	
	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;
	
	  this.ws = new WebsocketDriver(this.url, undefined, options);
	  this.ws.onmessage = function(e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function(e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function(e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}
	
	inherits(WebSocketTransport, EventEmitter);
	
	WebSocketTransport.prototype.send = function(data) {
	  var msg = '[' + data + ']';
	  debug('send', msg);
	  this.ws.send(msg);
	};
	
	WebSocketTransport.prototype.close = function() {
	  debug('close');
	  if (this.ws) {
	    this.ws.close();
	  }
	  this._cleanup();
	};
	
	WebSocketTransport.prototype._cleanup = function() {
	  debug('_cleanup');
	  var ws = this.ws;
	  if (ws) {
	    ws.onmessage = ws.onclose = ws.onerror = null;
	  }
	  utils.unloadDel(this.unloadRef);
	  this.unloadRef = this.ws = null;
	  this.removeAllListeners();
	};
	
	WebSocketTransport.enabled = function() {
	  debug('enabled');
	  return !!WebsocketDriver;
	};
	WebSocketTransport.transportName = 'websocket';
	
	// In theory, ws should require 1 round trip. But in chrome, this is
	// not very stable over SSL. Most likely a ws connection requires a
	// separate SSL connection, in which case 2 round trips are an
	// absolute minumum.
	WebSocketTransport.roundTrips = 2;
	
	module.exports = WebSocketTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var random = __webpack_require__(47);
	
	var onUnload = {}
	  , afterUnload = false
	    // detect google chrome packaged apps because they don't allow the 'unload' event
	  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
	  ;
	
	module.exports = {
	  attachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.addEventListener(event, listener, false);
	    } else if (global.document && global.attachEvent) {
	      // IE quirks.
	      // According to: http://stevesouders.com/misc/test-postmessage.php
	      // the message gets delivered only to 'document', not 'window'.
	      global.document.attachEvent('on' + event, listener);
	      // I get 'window' for ie8.
	      global.attachEvent('on' + event, listener);
	    }
	  }
	
	, detachEvent: function(event, listener) {
	    if (typeof global.addEventListener !== 'undefined') {
	      global.removeEventListener(event, listener, false);
	    } else if (global.document && global.detachEvent) {
	      global.document.detachEvent('on' + event, listener);
	      global.detachEvent('on' + event, listener);
	    }
	  }
	
	, unloadAdd: function(listener) {
	    if (isChromePackagedApp) {
	      return null;
	    }
	
	    var ref = random.string(8);
	    onUnload[ref] = listener;
	    if (afterUnload) {
	      setTimeout(this.triggerUnloadCallbacks, 0);
	    }
	    return ref;
	  }
	
	, unloadDel: function(ref) {
	    if (ref in onUnload) {
	      delete onUnload[ref];
	    }
	  }
	
	, triggerUnloadCallbacks: function() {
	    for (var ref in onUnload) {
	      onUnload[ref]();
	      delete onUnload[ref];
	    }
	  }
	};
	
	var unloadTriggered = function() {
	  if (afterUnload) {
	    return;
	  }
	  afterUnload = true;
	  module.exports.triggerUnloadCallbacks();
	};
	
	// 'unload' alone is not reliable in opera within an iframe, but we
	// can't use `beforeunload` as IE fires it on javascript: links.
	if (!isChromePackagedApp) {
	  module.exports.attachEvent('unload', unloadTriggered);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global crypto:true */
	var crypto = __webpack_require__(48);
	
	// This string has length 32, a power of 2, so the modulus doesn't introduce a
	// bias.
	var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
	module.exports = {
	  string: function(length) {
	    var max = _randomStringChars.length;
	    var bytes = crypto.randomBytes(length);
	    var ret = [];
	    for (var i = 0; i < length; i++) {
	      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
	    }
	    return ret.join('');
	  }
	
	, number: function(max) {
	    return Math.floor(Math.random() * max);
	  }
	
	, numberString: function(max) {
	    var t = ('' + (max - 1)).length;
	    var p = new Array(t + 1).join('0');
	    return (p + this.number(max)).slice(-t);
	  }
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	if (global.crypto && global.crypto.getRandomValues) {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Uint8Array(length);
	    global.crypto.getRandomValues(bytes);
	    return bytes;
	  };
	} else {
	  module.exports.randomBytes = function(length) {
	    var bytes = new Array(length);
	    for (var i = 0; i < length; i++) {
	      bytes[i] = Math.floor(Math.random() * 256);
	    }
	    return bytes;
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var URL = __webpack_require__(50);
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:utils:url');
	}
	
	module.exports = {
	  getOrigin: function(url) {
	    if (!url) {
	      return null;
	    }
	
	    var p = new URL(url);
	    if (p.protocol === 'file:') {
	      return null;
	    }
	
	    var port = p.port;
	    if (!port) {
	      port = (p.protocol === 'https:') ? '443' : '80';
	    }
	
	    return p.protocol + '//' + p.hostname + ':' + port;
	  }
	
	, isOriginEqual: function(a, b) {
	    var res = this.getOrigin(a) === this.getOrigin(b);
	    debug('same', a, b, res);
	    return res;
	  }
	
	, isSchemeEqual: function(a, b) {
	    return (a.split(':')[0] === b.split(':')[0]);
	  }
	
	, addPath: function (url, path) {
	    var qs = url.split('?');
	    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
	  }
	
	, addQuery: function (url, q) {
	    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var required = __webpack_require__(51)
	  , lolcation = __webpack_require__(52)
	  , qs = __webpack_require__(53)
	  , relativere = /^\/(?!\/)/
	  , protocolre = /^([a-z0-9.+-]+:)?(\/\/)?(.*)$/i; // actual protocol is first match
	
	/**
	 * These are the parse instructions for the URL parsers, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var instructions = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/\:(\d+)$/, 'port'],                 // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];
	
	 /**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase
	 * @property {Boolean} slashes Indicates whether the protocol is followed by double slash ("//")
	 * @property {String} rest     Rest of the URL that is not part of the protocol
	 */
	
	 /**
	  * Extract protocol information from a URL with/without double slash ("//")
	  *
	  * @param  {String} address   URL we want to extract from.
	  * @return {ProtocolExtract}  Extracted information
	  * @private
	  */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3] ? match[3] : ''
	  };
	}
	
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my CDO.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }
	
	  var relative = relativere.test(address)
	    , parse, instruction, index, key
	    , type = typeof location
	    , url = this
	    , i = 0;
	
	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }
	
	  if (parser && 'function' !== typeof parser) {
	    parser = qs.parse;
	  }
	
	  location = lolcation(location);
	
	  // extract protocol information before running the instructions
	  var extracted = extractProtocol(address);
	  url.protocol = extracted.protocol || location.protocol || '';
	  url.slashes = extracted.slashes || location.slashes;
	  address = extracted.rest;
	
	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];
	
	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, address.length - index[0].length);
	    }
	
	    url[key] = url[key] || (instruction[3] || ('port' === key && relative) ? location[key] || '' : '');
	
	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) {
	      url[key] = url[key].toLowerCase();
	    }
	  }
	
	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);
	
	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }
	
	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }
	
	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}
	
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} prop          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function used to parse
	 *                               the query.
	 *                               When setting the protocol, double slash will be removed from
	 *                               the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	URL.prototype.set = function set(part, value, fn) {
	  var url = this;
	
	  if ('query' === part) {
	    if ('string' === typeof value && value.length) {
	      value = (fn || qs.parse)(value);
	    }
	
	    url[part] = value;
	  } else if ('port' === part) {
	    url[part] = value;
	
	    if (!required(value, url.protocol)) {
	      url.host = url.hostname;
	      url[part] = '';
	    } else if (value) {
	      url.host = url.hostname +':'+ value;
	    }
	  } else if ('hostname' === part) {
	    url[part] = value;
	
	    if (url.port) value += ':'+ url.port;
	    url.host = value;
	  } else if ('host' === part) {
	    url[part] = value;
	
	    if (/\:\d+/.test(value)) {
	      value = value.split(':');
	      url.hostname = value[0];
	      url.port = value[1];
	    }
	  } else if ('protocol' === part) {
	    url.protocol = value;
	    url.slashes = !fn;
	  } else {
	    url[part] = value;
	  }
	
	  url.href = url.toString();
	  return url;
	};
	
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	URL.prototype.toString = function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
	
	  var query
	    , url = this
	    , protocol = url.protocol;
	
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	
	  var result = protocol + (url.slashes ? '//' : '');
	
	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }
	
	  result += url.hostname;
	  if (url.port) result += ':'+ url.port;
	
	  result += url.pathname;
	
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;
	
	  if (url.hash) result += url.hash;
	
	  return result;
	};
	
	//
	// Expose the URL parser and some additional properties that might be useful for
	// others.
	//
	URL.qs = qs;
	URL.location = lolcation;
	module.exports = URL;


/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	
	  if (!port) return false;
	
	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;
	
	    case 'https':
	    case 'wss':
	    return port !== 443;
	
	    case 'ftp':
	    return port !== 21;
	
	    case 'gopher':
	    return port !== 70;
	
	    case 'file':
	    return false;
	  }
	
	  return port !== 0;
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 }
	  , URL;
	
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	module.exports = function lolcation(loc) {
	  loc = loc || global.location || {};
	  URL = URL || __webpack_require__(50);
	
	  var finaldestination = {}
	    , type = typeof loc
	    , key;
	
	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }
	
	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }
	
	  return finaldestination;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=([^&]*)/g
	    , result = {}
	    , part;
	
	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
	  );
	
	  return result;
	}
	
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	
	  var pairs = [];
	
	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';
	
	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }
	
	  return pairs.length ? prefix + pairs.join('&') : '';
	}
	
	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(55);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(56);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventTarget = __webpack_require__(59)
	  ;
	
	function EventEmitter() {
	  EventTarget.call(this);
	}
	
	inherits(EventEmitter, EventTarget);
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  if (type) {
	    delete this._listeners[type];
	  } else {
	    this._listeners = {};
	  }
	};
	
	EventEmitter.prototype.once = function(type, listener) {
	  var self = this
	    , fired = false;
	
	  function g() {
	    self.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  this.on(type, g);
	};
	
	EventEmitter.prototype.emit = function() {
	  var type = arguments[0];
	  var listeners = this._listeners[type];
	  if (!listeners) {
	    return;
	  }
	  // equivalent of Array.prototype.slice.call(arguments, 1);
	  var l = arguments.length;
	  var args = new Array(l - 1);
	  for (var ai = 1; ai < l; ai++) {
	    args[ai - 1] = arguments[ai];
	  }
	  for (var i = 0; i < listeners.length; i++) {
	    listeners[i].apply(this, args);
	  }
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
	EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
	
	module.exports.EventEmitter = EventEmitter;


/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	/* Simplified implementation of DOM2 EventTarget.
	 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
	 */
	
	function EventTarget() {
	  this._listeners = {};
	}
	
	EventTarget.prototype.addEventListener = function(eventType, listener) {
	  if (!(eventType in this._listeners)) {
	    this._listeners[eventType] = [];
	  }
	  var arr = this._listeners[eventType];
	  // #4
	  if (arr.indexOf(listener) === -1) {
	    // Make a copy so as not to interfere with a current dispatchEvent.
	    arr = arr.concat([listener]);
	  }
	  this._listeners[eventType] = arr;
	};
	
	EventTarget.prototype.removeEventListener = function(eventType, listener) {
	  var arr = this._listeners[eventType];
	  if (!arr) {
	    return;
	  }
	  var idx = arr.indexOf(listener);
	  if (idx !== -1) {
	    if (arr.length > 1) {
	      // Make a copy so as not to interfere with a current dispatchEvent.
	      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
	    } else {
	      delete this._listeners[eventType];
	    }
	    return;
	  }
	};
	
	EventTarget.prototype.dispatchEvent = function() {
	  var event = arguments[0];
	  var t = event.type;
	  // equivalent of Array.prototype.slice.call(arguments, 0);
	  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
	  // TODO: This doesn't match the real behavior; per spec, onfoo get
	  // their place in line from the /first/ time they're set from
	  // non-null. Although WebKit bumps it to the end every time it's
	  // set.
	  if (this['on' + t]) {
	    this['on' + t].apply(this, args);
	  }
	  if (t in this._listeners) {
	    // Grab a reference to the listeners list. removeEventListener may alter the list.
	    var listeners = this._listeners[t];
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(this, args);
	    }
	  }
	};
	
	module.exports = EventTarget;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.WebSocket || global.MozWebSocket;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , AjaxBasedTransport = __webpack_require__(62)
	  , XhrReceiver = __webpack_require__(66)
	  , XHRCorsObject = __webpack_require__(67)
	  , XHRLocalObject = __webpack_require__(69)
	  , browser = __webpack_require__(70)
	  ;
	
	function XhrStreamingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrStreamingTransport, AjaxBasedTransport);
	
	XhrStreamingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	  // Opera doesn't support xhr-streaming #60
	  // But it might be able to #92
	  if (browser.isOpera()) {
	    return false;
	  }
	
	  return XHRCorsObject.enabled;
	};
	
	XhrStreamingTransport.transportName = 'xhr-streaming';
	XhrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	// Safari gets confused when a streaming ajax request is started
	// before onload. This causes the load indicator to spin indefinetely.
	// Only require body when used in a browser
	XhrStreamingTransport.needBody = !!global.document;
	
	module.exports = XhrStreamingTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , urlUtils = __webpack_require__(49)
	  , SenderReceiver = __webpack_require__(63)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:ajax-based');
	}
	
	function createAjaxSender(AjaxObject) {
	  return function(url, payload, callback) {
	    debug('create ajax sender', url, payload);
	    var opt = {};
	    if (typeof payload === 'string') {
	      opt.headers = {'Content-type': 'text/plain'};
	    }
	    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
	    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
	    xo.once('finish', function(status) {
	      debug('finish', status);
	      xo = null;
	
	      if (status !== 200 && status !== 204) {
	        return callback(new Error('http status ' + status));
	      }
	      callback();
	    });
	    return function() {
	      debug('abort');
	      xo.close();
	      xo = null;
	
	      var err = new Error('Aborted');
	      err.code = 1000;
	      callback(err);
	    };
	  };
	}
	
	function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
	  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
	}
	
	inherits(AjaxBasedTransport, SenderReceiver);
	
	module.exports = AjaxBasedTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , urlUtils = __webpack_require__(49)
	  , BufferedSender = __webpack_require__(64)
	  , Polling = __webpack_require__(65)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:sender-receiver');
	}
	
	function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
	  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
	  debug(pollUrl);
	  var self = this;
	  BufferedSender.call(this, transUrl, senderFunc);
	
	  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
	  this.poll.on('message', function(msg) {
	    debug('poll message', msg);
	    self.emit('message', msg);
	  });
	  this.poll.once('close', function(code, reason) {
	    debug('poll close', code, reason);
	    self.poll = null;
	    self.emit('close', code, reason);
	    self.close();
	  });
	}
	
	inherits(SenderReceiver, BufferedSender);
	
	SenderReceiver.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  if (this.poll) {
	    this.poll.abort();
	    this.poll = null;
	  }
	  this.stop();
	};
	
	module.exports = SenderReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:buffered-sender');
	}
	
	function BufferedSender(url, sender) {
	  debug(url);
	  EventEmitter.call(this);
	  this.sendBuffer = [];
	  this.sender = sender;
	  this.url = url;
	}
	
	inherits(BufferedSender, EventEmitter);
	
	BufferedSender.prototype.send = function(message) {
	  debug('send', message);
	  this.sendBuffer.push(message);
	  if (!this.sendStop) {
	    this.sendSchedule();
	  }
	};
	
	// For polling transports in a situation when in the message callback,
	// new message is being send. If the sending connection was started
	// before receiving one, it is possible to saturate the network and
	// timeout due to the lack of receiving socket. To avoid that we delay
	// sending messages by some small time, in order to let receiving
	// connection be started beforehand. This is only a halfmeasure and
	// does not fix the big problem, but it does make the tests go more
	// stable on slow networks.
	BufferedSender.prototype.sendScheduleWait = function() {
	  debug('sendScheduleWait');
	  var self = this;
	  var tref;
	  this.sendStop = function() {
	    debug('sendStop');
	    self.sendStop = null;
	    clearTimeout(tref);
	  };
	  tref = setTimeout(function() {
	    debug('timeout');
	    self.sendStop = null;
	    self.sendSchedule();
	  }, 25);
	};
	
	BufferedSender.prototype.sendSchedule = function() {
	  debug('sendSchedule', this.sendBuffer.length);
	  var self = this;
	  if (this.sendBuffer.length > 0) {
	    var payload = '[' + this.sendBuffer.join(',') + ']';
	    this.sendStop = this.sender(this.url, payload, function(err) {
	      self.sendStop = null;
	      if (err) {
	        debug('error', err);
	        self.emit('close', err.code || 1006, 'Sending error: ' + err);
	        self._cleanup();
	      } else {
	        self.sendScheduleWait();
	      }
	    });
	    this.sendBuffer = [];
	  }
	};
	
	BufferedSender.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	BufferedSender.prototype.stop = function() {
	  debug('stop');
	  this._cleanup();
	  if (this.sendStop) {
	    this.sendStop();
	    this.sendStop = null;
	  }
	};
	
	module.exports = BufferedSender;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:polling');
	}
	
	function Polling(Receiver, receiveUrl, AjaxObject) {
	  debug(receiveUrl);
	  EventEmitter.call(this);
	  this.Receiver = Receiver;
	  this.receiveUrl = receiveUrl;
	  this.AjaxObject = AjaxObject;
	  this._scheduleReceiver();
	}
	
	inherits(Polling, EventEmitter);
	
	Polling.prototype._scheduleReceiver = function() {
	  debug('_scheduleReceiver');
	  var self = this;
	  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
	
	  poll.on('message', function(msg) {
	    debug('message', msg);
	    self.emit('message', msg);
	  });
	
	  poll.once('close', function(code, reason) {
	    debug('close', code, reason, self.pollIsClosing);
	    self.poll = poll = null;
	
	    if (!self.pollIsClosing) {
	      if (reason === 'network') {
	        self._scheduleReceiver();
	      } else {
	        self.emit('close', code || 1006, reason);
	        self.removeAllListeners();
	      }
	    }
	  });
	};
	
	Polling.prototype.abort = function() {
	  debug('abort');
	  this.removeAllListeners();
	  this.pollIsClosing = true;
	  if (this.poll) {
	    this.poll.abort();
	  }
	};
	
	module.exports = Polling;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:receiver:xhr');
	}
	
	function XhrReceiver(url, AjaxObject) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	
	  this.bufferPosition = 0;
	
	  this.xo = new AjaxObject('POST', url, null);
	  this.xo.on('chunk', this._chunkHandler.bind(this));
	  this.xo.once('finish', function(status, text) {
	    debug('finish', status, text);
	    self._chunkHandler(status, text);
	    self.xo = null;
	    var reason = status === 200 ? 'network' : 'permanent';
	    debug('close', reason);
	    self.emit('close', null, reason);
	    self._cleanup();
	  });
	}
	
	inherits(XhrReceiver, EventEmitter);
	
	XhrReceiver.prototype._chunkHandler = function(status, text) {
	  debug('_chunkHandler', status);
	  if (status !== 200 || !text) {
	    return;
	  }
	
	  for (var idx = -1; ; this.bufferPosition += idx + 1) {
	    var buf = text.slice(this.bufferPosition);
	    idx = buf.indexOf('\n');
	    if (idx === -1) {
	      break;
	    }
	    var msg = buf.slice(0, idx);
	    if (msg) {
	      debug('message', msg);
	      this.emit('message', msg);
	    }
	  }
	};
	
	XhrReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  this.removeAllListeners();
	};
	
	XhrReceiver.prototype.abort = function() {
	  debug('abort');
	  if (this.xo) {
	    this.xo.close();
	    debug('close');
	    this.emit('close', null, 'user');
	    this.xo = null;
	  }
	  this._cleanup();
	};
	
	module.exports = XhrReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , XhrDriver = __webpack_require__(68)
	  ;
	
	function XHRCorsObject(method, url, payload, opts) {
	  XhrDriver.call(this, method, url, payload, opts);
	}
	
	inherits(XHRCorsObject, XhrDriver);
	
	XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
	
	module.exports = XHRCorsObject;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  , utils = __webpack_require__(46)
	  , urlUtils = __webpack_require__(49)
	  , XHR = global.XMLHttpRequest
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:browser:xhr');
	}
	
	function AbstractXHRObject(method, url, payload, opts) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function () {
	    self._start(method, url, payload, opts);
	  }, 0);
	}
	
	inherits(AbstractXHRObject, EventEmitter);
	
	AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
	  var self = this;
	
	  try {
	    this.xhr = new XHR();
	  } catch (x) {
	    // intentionally empty
	  }
	
	  if (!this.xhr) {
	    debug('no xhr');
	    this.emit('finish', 0, 'no xhr support');
	    this._cleanup();
	    return;
	  }
	
	  // several browsers cache POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  // Explorer tends to keep connection open, even after the
	  // tab gets closed: http://bugs.jquery.com/ticket/5280
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload cleanup');
	    self._cleanup(true);
	  });
	  try {
	    this.xhr.open(method, url, true);
	    if (this.timeout && 'timeout' in this.xhr) {
	      this.xhr.timeout = this.timeout;
	      this.xhr.ontimeout = function() {
	        debug('xhr timeout');
	        self.emit('finish', 0, '');
	        self._cleanup(false);
	      };
	    }
	  } catch (e) {
	    debug('exception', e);
	    // IE raises an exception on wrong port.
	    this.emit('finish', 0, '');
	    this._cleanup(false);
	    return;
	  }
	
	  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
	    debug('withCredentials');
	    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
	    // "This never affects same-site requests."
	
	    this.xhr.withCredentials = 'true';
	  }
	  if (opts && opts.headers) {
	    for (var key in opts.headers) {
	      this.xhr.setRequestHeader(key, opts.headers[key]);
	    }
	  }
	
	  this.xhr.onreadystatechange = function() {
	    if (self.xhr) {
	      var x = self.xhr;
	      var text, status;
	      debug('readyState', x.readyState);
	      switch (x.readyState) {
	      case 3:
	        // IE doesn't like peeking into responseText or status
	        // on Microsoft.XMLHTTP and readystate=3
	        try {
	          status = x.status;
	          text = x.responseText;
	        } catch (e) {
	          // intentionally empty
	        }
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	
	        // IE does return readystate == 3 for 404 answers.
	        if (status === 200 && text && text.length > 0) {
	          debug('chunk');
	          self.emit('chunk', status, text);
	        }
	        break;
	      case 4:
	        status = x.status;
	        debug('status', status);
	        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
	        if (status === 1223) {
	          status = 204;
	        }
	        // IE returns this for a bad port
	        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
	        if (status === 12005 || status === 12029) {
	          status = 0;
	        }
	
	        debug('finish', status, x.responseText);
	        self.emit('finish', status, x.responseText);
	        self._cleanup(false);
	        break;
	      }
	    }
	  };
	
	  try {
	    self.xhr.send(payload);
	  } catch (e) {
	    self.emit('finish', 0, '');
	    self._cleanup(false);
	  }
	};
	
	AbstractXHRObject.prototype._cleanup = function(abort) {
	  debug('cleanup');
	  if (!this.xhr) {
	    return;
	  }
	  this.removeAllListeners();
	  utils.unloadDel(this.unloadRef);
	
	  // IE needs this field to be a function
	  this.xhr.onreadystatechange = function() {};
	  if (this.xhr.ontimeout) {
	    this.xhr.ontimeout = null;
	  }
	
	  if (abort) {
	    try {
	      this.xhr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xhr = null;
	};
	
	AbstractXHRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	AbstractXHRObject.enabled = !!XHR;
	// override XMLHttpRequest for IE6/7
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (!AbstractXHRObject.enabled && (axo in global)) {
	  debug('overriding xmlhttprequest');
	  XHR = function() {
	    try {
	      return new global[axo]('Microsoft.XMLHTTP');
	    } catch (e) {
	      return null;
	    }
	  };
	  AbstractXHRObject.enabled = !!new XHR();
	}
	
	var cors = false;
	try {
	  cors = 'withCredentials' in new XHR();
	} catch (ignored) {
	  // intentionally empty
	}
	
	AbstractXHRObject.supportsCORS = cors;
	
	module.exports = AbstractXHRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(45)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , XhrDriver = __webpack_require__(68)
	  ;
	
	function XHRLocalObject(method, url, payload /*, opts */) {
	  XhrDriver.call(this, method, url, payload, {
	    noCredentials: true
	  });
	}
	
	inherits(XHRLocalObject, XhrDriver);
	
	XHRLocalObject.enabled = XhrDriver.enabled;
	
	module.exports = XHRLocalObject;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = {
	  isOpera: function() {
	    return global.navigator &&
	      /opera/i.test(global.navigator.userAgent);
	  }
	
	, isKonqueror: function() {
	    return global.navigator &&
	      /konqueror/i.test(global.navigator.userAgent);
	  }
	
	  // #187 wrap document.domain in try/catch because of WP8 from file:///
	, hasDomain: function () {
	    // non-browser client always has a domain
	    if (!global.document) {
	      return true;
	    }
	
	    try {
	      return !!global.document.domain;
	    } catch (e) {
	      return false;
	    }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , AjaxBasedTransport = __webpack_require__(62)
	  , XhrReceiver = __webpack_require__(66)
	  , XDRObject = __webpack_require__(72)
	  ;
	
	// According to:
	//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
	//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
	
	function XdrStreamingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
	}
	
	inherits(XdrStreamingTransport, AjaxBasedTransport);
	
	XdrStreamingTransport.enabled = function(info) {
	  if (info.cookie_needed || info.nullOrigin) {
	    return false;
	  }
	  return XDRObject.enabled && info.sameScheme;
	};
	
	XdrStreamingTransport.transportName = 'xdr-streaming';
	XdrStreamingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrStreamingTransport;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  , eventUtils = __webpack_require__(46)
	  , browser = __webpack_require__(70)
	  , urlUtils = __webpack_require__(49)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:sender:xdr');
	}
	
	// References:
	//   http://ajaxian.com/archives/100-line-ajax-wrapper
	//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
	
	function XDRObject(method, url, payload) {
	  debug(method, url);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self._start(method, url, payload);
	  }, 0);
	}
	
	inherits(XDRObject, EventEmitter);
	
	XDRObject.prototype._start = function(method, url, payload) {
	  debug('_start');
	  var self = this;
	  var xdr = new global.XDomainRequest();
	  // IE caches even POSTs
	  url = urlUtils.addQuery(url, 't=' + (+new Date()));
	
	  xdr.onerror = function() {
	    debug('onerror');
	    self._error();
	  };
	  xdr.ontimeout = function() {
	    debug('ontimeout');
	    self._error();
	  };
	  xdr.onprogress = function() {
	    debug('progress', xdr.responseText);
	    self.emit('chunk', 200, xdr.responseText);
	  };
	  xdr.onload = function() {
	    debug('load');
	    self.emit('finish', 200, xdr.responseText);
	    self._cleanup(false);
	  };
	  this.xdr = xdr;
	  this.unloadRef = eventUtils.unloadAdd(function() {
	    self._cleanup(true);
	  });
	  try {
	    // Fails with AccessDenied if port number is bogus
	    this.xdr.open(method, url);
	    if (this.timeout) {
	      this.xdr.timeout = this.timeout;
	    }
	    this.xdr.send(payload);
	  } catch (x) {
	    this._error();
	  }
	};
	
	XDRObject.prototype._error = function() {
	  this.emit('finish', 0, '');
	  this._cleanup(false);
	};
	
	XDRObject.prototype._cleanup = function(abort) {
	  debug('cleanup', abort);
	  if (!this.xdr) {
	    return;
	  }
	  this.removeAllListeners();
	  eventUtils.unloadDel(this.unloadRef);
	
	  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
	  if (abort) {
	    try {
	      this.xdr.abort();
	    } catch (x) {
	      // intentionally empty
	    }
	  }
	  this.unloadRef = this.xdr = null;
	};
	
	XDRObject.prototype.close = function() {
	  debug('close');
	  this._cleanup(true);
	};
	
	// IE 8/9 if the request target uses the same scheme - #79
	XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
	
	module.exports = XDRObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , AjaxBasedTransport = __webpack_require__(62)
	  , EventSourceReceiver = __webpack_require__(74)
	  , XHRCorsObject = __webpack_require__(67)
	  , EventSourceDriver = __webpack_require__(75)
	  ;
	
	function EventSourceTransport(transUrl) {
	  if (!EventSourceTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	
	  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
	}
	
	inherits(EventSourceTransport, AjaxBasedTransport);
	
	EventSourceTransport.enabled = function() {
	  return !!EventSourceDriver;
	};
	
	EventSourceTransport.transportName = 'eventsource';
	EventSourceTransport.roundTrips = 2;
	
	module.exports = EventSourceTransport;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  , EventSourceDriver = __webpack_require__(75)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:receiver:eventsource');
	}
	
	function EventSourceReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	
	  var self = this;
	  var es = this.es = new EventSourceDriver(url);
	  es.onmessage = function(e) {
	    debug('message', e.data);
	    self.emit('message', decodeURI(e.data));
	  };
	  es.onerror = function(e) {
	    debug('error', es.readyState, e);
	    // ES on reconnection has readyState = 0 or 1.
	    // on network error it's CLOSED = 2
	    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
	    self._cleanup();
	    self._close(reason);
	  };
	}
	
	inherits(EventSourceReceiver, EventEmitter);
	
	EventSourceReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	EventSourceReceiver.prototype._cleanup = function() {
	  debug('cleanup');
	  var es = this.es;
	  if (es) {
	    es.onmessage = es.onerror = null;
	    es.close();
	    this.es = null;
	  }
	};
	
	EventSourceReceiver.prototype._close = function(reason) {
	  debug('close', reason);
	  var self = this;
	  // Safari and chrome < 15 crash if we close window before
	  // waiting for ES cleanup. See:
	  // https://code.google.com/p/chromium/issues/detail?id=89155
	  setTimeout(function() {
	    self.emit('close', null, reason);
	    self.removeAllListeners();
	  }, 200);
	};
	
	module.exports = EventSourceReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 75 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.EventSource;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , IframeTransport = __webpack_require__(77)
	  , objectUtils = __webpack_require__(82)
	  ;
	
	module.exports = function(transport) {
	
	  function IframeWrapTransport(transUrl, baseUrl) {
	    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
	  }
	
	  inherits(IframeWrapTransport, IframeTransport);
	
	  IframeWrapTransport.enabled = function(url, info) {
	    if (!global.document) {
	      return false;
	    }
	
	    var iframeInfo = objectUtils.extend({}, info);
	    iframeInfo.sameOrigin = true;
	    return transport.enabled(iframeInfo) && IframeTransport.enabled();
	  };
	
	  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
	  IframeWrapTransport.needBody = true;
	  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
	
	  IframeWrapTransport.facadeTransport = transport;
	
	  return IframeWrapTransport;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	// Few cool transports do work only for same-origin. In order to make
	// them work cross-domain we shall use iframe, served from the
	// remote domain. New browsers have capabilities to communicate with
	// cross domain iframe using postMessage(). In IE it was implemented
	// from IE 8+, but of course, IE got some details wrong:
	//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
	//    http://stevesouders.com/misc/test-postmessage.php
	
	var inherits = __webpack_require__(57)
	  , JSON3 = __webpack_require__(78)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  , version = __webpack_require__(80)
	  , urlUtils = __webpack_require__(49)
	  , iframeUtils = __webpack_require__(81)
	  , eventUtils = __webpack_require__(46)
	  , random = __webpack_require__(47)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:transport:iframe');
	}
	
	function IframeTransport(transport, transUrl, baseUrl) {
	  if (!IframeTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  EventEmitter.call(this);
	
	  var self = this;
	  this.origin = urlUtils.getOrigin(baseUrl);
	  this.baseUrl = baseUrl;
	  this.transUrl = transUrl;
	  this.transport = transport;
	  this.windowId = random.string(8);
	
	  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
	  debug(transport, transUrl, iframeUrl);
	
	  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
	    debug('err callback');
	    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
	    self.close();
	  });
	
	  this.onmessageCallback = this._message.bind(this);
	  eventUtils.attachEvent('message', this.onmessageCallback);
	}
	
	inherits(IframeTransport, EventEmitter);
	
	IframeTransport.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  if (this.iframeObj) {
	    eventUtils.detachEvent('message', this.onmessageCallback);
	    try {
	      // When the iframe is not loaded, IE raises an exception
	      // on 'contentWindow'.
	      this.postMessage('c');
	    } catch (x) {
	      // intentionally empty
	    }
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	    this.onmessageCallback = this.iframeObj = null;
	  }
	};
	
	IframeTransport.prototype._message = function(e) {
	  debug('message', e.data);
	  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
	    debug('not same origin', e.origin, this.origin);
	    return;
	  }
	
	  var iframeMessage;
	  try {
	    iframeMessage = JSON3.parse(e.data);
	  } catch (ignored) {
	    debug('bad json', e.data);
	    return;
	  }
	
	  if (iframeMessage.windowId !== this.windowId) {
	    debug('mismatched window id', iframeMessage.windowId, this.windowId);
	    return;
	  }
	
	  switch (iframeMessage.type) {
	  case 's':
	    this.iframeObj.loaded();
	    // window global dependency
	    this.postMessage('s', JSON3.stringify([
	      version
	    , this.transport
	    , this.transUrl
	    , this.baseUrl
	    ]));
	    break;
	  case 't':
	    this.emit('message', iframeMessage.data);
	    break;
	  case 'c':
	    var cdata;
	    try {
	      cdata = JSON3.parse(iframeMessage.data);
	    } catch (ignored) {
	      debug('bad json', iframeMessage.data);
	      return;
	    }
	    this.emit('close', cdata[0], cdata[1]);
	    this.close();
	    break;
	  }
	};
	
	IframeTransport.prototype.postMessage = function(type, data) {
	  debug('postMessage', type, data);
	  this.iframeObj.post(JSON3.stringify({
	    windowId: this.windowId
	  , type: type
	  , data: data || ''
	  }), this.origin);
	};
	
	IframeTransport.prototype.send = function(message) {
	  debug('send', message);
	  this.postMessage('m', message);
	};
	
	IframeTransport.enabled = function() {
	  return iframeUtils.iframeEnabled;
	};
	
	IframeTransport.transportName = 'iframe';
	IframeTransport.roundTrips = 2;
	
	module.exports = IframeTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(79);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = '1.1.0';


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var eventUtils = __webpack_require__(46)
	  , JSON3 = __webpack_require__(78)
	  , browser = __webpack_require__(70)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:utils:iframe');
	}
	
	module.exports = {
	  WPrefix: '_jp'
	, currentWindowId: null
	
	, polluteGlobalNamespace: function() {
	    if (!(module.exports.WPrefix in global)) {
	      global[module.exports.WPrefix] = {};
	    }
	  }
	
	, postMessage: function(type, data) {
	    if (global.parent !== global) {
	      global.parent.postMessage(JSON3.stringify({
	        windowId: module.exports.currentWindowId
	      , type: type
	      , data: data || ''
	      }), '*');
	    } else {
	      debug('Cannot postMessage, no parent window.', type, data);
	    }
	  }
	
	, createIframe: function(iframeUrl, errorCallback) {
	    var iframe = global.document.createElement('iframe');
	    var tref, unloadRef;
	    var unattach = function() {
	      debug('unattach');
	      clearTimeout(tref);
	      // Explorer had problems with that.
	      try {
	        iframe.onload = null;
	      } catch (x) {
	        // intentionally empty
	      }
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      debug('cleanup');
	      if (iframe) {
	        unattach();
	        // This timeout makes chrome fire onbeforeunload event
	        // within iframe. Without the timeout it goes straight to
	        // onunload.
	        setTimeout(function() {
	          if (iframe) {
	            iframe.parentNode.removeChild(iframe);
	          }
	          iframe = null;
	        }, 0);
	        eventUtils.unloadDel(unloadRef);
	      }
	    };
	    var onerror = function(err) {
	      debug('onerror', err);
	      if (iframe) {
	        cleanup();
	        errorCallback(err);
	      }
	    };
	    var post = function(msg, origin) {
	      debug('post', msg, origin);
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function() {
	          if (iframe && iframe.contentWindow) {
	            iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    iframe.src = iframeUrl;
	    iframe.style.display = 'none';
	    iframe.style.position = 'absolute';
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    iframe.onload = function() {
	      debug('onload');
	      // `onload` is triggered before scripts on the iframe are
	      // executed. Give it few seconds to actually load stuff.
	      clearTimeout(tref);
	      tref = setTimeout(function() {
	        onerror('onload timeout');
	      }, 2000);
	    };
	    global.document.body.appendChild(iframe);
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	
	/* jshint undef: false, newcap: false */
	/* eslint no-undef: 0, new-cap: 0 */
	, createHtmlfile: function(iframeUrl, errorCallback) {
	    var axo = ['Active'].concat('Object').join('X');
	    var doc = new global[axo]('htmlfile');
	    var tref, unloadRef;
	    var iframe;
	    var unattach = function() {
	      clearTimeout(tref);
	      iframe.onerror = null;
	    };
	    var cleanup = function() {
	      if (doc) {
	        unattach();
	        eventUtils.unloadDel(unloadRef);
	        iframe.parentNode.removeChild(iframe);
	        iframe = doc = null;
	        CollectGarbage();
	      }
	    };
	    var onerror = function(r) {
	      debug('onerror', r);
	      if (doc) {
	        cleanup();
	        errorCallback(r);
	      }
	    };
	    var post = function(msg, origin) {
	      try {
	        // When the iframe is not loaded, IE raises an exception
	        // on 'contentWindow'.
	        setTimeout(function() {
	          if (iframe && iframe.contentWindow) {
	              iframe.contentWindow.postMessage(msg, origin);
	          }
	        }, 0);
	      } catch (x) {
	        // intentionally empty
	      }
	    };
	
	    doc.open();
	    doc.write('<html><s' + 'cript>' +
	              'document.domain="' + global.document.domain + '";' +
	              '</s' + 'cript></html>');
	    doc.close();
	    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
	    var c = doc.createElement('div');
	    doc.body.appendChild(c);
	    iframe = doc.createElement('iframe');
	    c.appendChild(iframe);
	    iframe.src = iframeUrl;
	    iframe.onerror = function() {
	      onerror('onerror');
	    };
	    tref = setTimeout(function() {
	      onerror('timeout');
	    }, 15000);
	    unloadRef = eventUtils.unloadAdd(cleanup);
	    return {
	      post: post
	    , cleanup: cleanup
	    , loaded: unattach
	    };
	  }
	};
	
	module.exports.iframeEnabled = false;
	if (global.document) {
	  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
	  // huge delay, or not at all.
	  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
	    typeof global.postMessage === 'object') && (!browser.isKonqueror());
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isObject: function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  }
	
	, extend: function(obj) {
	    if (!this.isObject(obj)) {
	      return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (Object.prototype.hasOwnProperty.call(source, prop)) {
	          obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  }
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , HtmlfileReceiver = __webpack_require__(84)
	  , XHRLocalObject = __webpack_require__(69)
	  , AjaxBasedTransport = __webpack_require__(62)
	  ;
	
	function HtmlFileTransport(transUrl) {
	  if (!HtmlfileReceiver.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
	}
	
	inherits(HtmlFileTransport, AjaxBasedTransport);
	
	HtmlFileTransport.enabled = function(info) {
	  return HtmlfileReceiver.enabled && info.sameOrigin;
	};
	
	HtmlFileTransport.transportName = 'htmlfile';
	HtmlFileTransport.roundTrips = 2;
	
	module.exports = HtmlFileTransport;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var inherits = __webpack_require__(57)
	  , iframeUtils = __webpack_require__(81)
	  , urlUtils = __webpack_require__(49)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  , random = __webpack_require__(47)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:receiver:htmlfile');
	}
	
	function HtmlfileReceiver(url) {
	  debug(url);
	  EventEmitter.call(this);
	  var self = this;
	  iframeUtils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
	
	  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
	  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
	      iframeUtils.createHtmlfile : iframeUtils.createIframe;
	
	  global[iframeUtils.WPrefix][this.id] = {
	    start: function() {
	      debug('start');
	      self.iframeObj.loaded();
	    }
	  , message: function(data) {
	      debug('message', data);
	      self.emit('message', data);
	    }
	  , stop: function() {
	      debug('stop');
	      self._cleanup();
	      self._close('network');
	    }
	  };
	  this.iframeObj = constructFunc(url, function() {
	    debug('callback');
	    self._cleanup();
	    self._close('permanent');
	  });
	}
	
	inherits(HtmlfileReceiver, EventEmitter);
	
	HtmlfileReceiver.prototype.abort = function() {
	  debug('abort');
	  this._cleanup();
	  this._close('user');
	};
	
	HtmlfileReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  if (this.iframeObj) {
	    this.iframeObj.cleanup();
	    this.iframeObj = null;
	  }
	  delete global[iframeUtils.WPrefix][this.id];
	};
	
	HtmlfileReceiver.prototype._close = function(reason) {
	  debug('_close', reason);
	  this.emit('close', null, reason);
	  this.removeAllListeners();
	};
	
	HtmlfileReceiver.htmlfileEnabled = false;
	
	// obfuscate to avoid firewalls
	var axo = ['Active'].concat('Object').join('X');
	if (axo in global) {
	  try {
	    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
	  } catch (x) {
	    // intentionally empty
	  }
	}
	
	HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
	
	module.exports = HtmlfileReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , AjaxBasedTransport = __webpack_require__(62)
	  , XhrReceiver = __webpack_require__(66)
	  , XHRCorsObject = __webpack_require__(67)
	  , XHRLocalObject = __webpack_require__(69)
	  ;
	
	function XhrPollingTransport(transUrl) {
	  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
	}
	
	inherits(XhrPollingTransport, AjaxBasedTransport);
	
	XhrPollingTransport.enabled = function(info) {
	  if (info.nullOrigin) {
	    return false;
	  }
	
	  if (XHRLocalObject.enabled && info.sameOrigin) {
	    return true;
	  }
	  return XHRCorsObject.enabled;
	};
	
	XhrPollingTransport.transportName = 'xhr-polling';
	XhrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XhrPollingTransport;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , AjaxBasedTransport = __webpack_require__(62)
	  , XdrStreamingTransport = __webpack_require__(71)
	  , XhrReceiver = __webpack_require__(66)
	  , XDRObject = __webpack_require__(72)
	  ;
	
	function XdrPollingTransport(transUrl) {
	  if (!XDRObject.enabled) {
	    throw new Error('Transport created when disabled');
	  }
	  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
	}
	
	inherits(XdrPollingTransport, AjaxBasedTransport);
	
	XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
	XdrPollingTransport.transportName = 'xdr-polling';
	XdrPollingTransport.roundTrips = 2; // preflight, ajax
	
	module.exports = XdrPollingTransport;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// The simplest and most robust transport, using the well-know cross
	// domain hack - JSONP. This transport is quite inefficient - one
	// message could use up to one http request. But at least it works almost
	// everywhere.
	// Known limitations:
	//   o you will get a spinning cursor
	//   o for Konqueror a dumb timer is needed to detect errors
	
	var inherits = __webpack_require__(57)
	  , SenderReceiver = __webpack_require__(63)
	  , JsonpReceiver = __webpack_require__(88)
	  , jsonpSender = __webpack_require__(89)
	  ;
	
	function JsonPTransport(transUrl) {
	  if (!JsonPTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }
	  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
	}
	
	inherits(JsonPTransport, SenderReceiver);
	
	JsonPTransport.enabled = function() {
	  return !!global.document;
	};
	
	JsonPTransport.transportName = 'jsonp-polling';
	JsonPTransport.roundTrips = 1;
	JsonPTransport.needBody = true;
	
	module.exports = JsonPTransport;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var utils = __webpack_require__(81)
	  , random = __webpack_require__(47)
	  , browser = __webpack_require__(70)
	  , urlUtils = __webpack_require__(49)
	  , inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:receiver:jsonp');
	}
	
	function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);
	
	  utils.polluteGlobalNamespace();
	
	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
	
	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);
	
	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function() {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}
	
	inherits(JsonpReceiver, EventEmitter);
	
	JsonpReceiver.prototype.abort = function() {
	  debug('abort');
	  if (global[utils.WPrefix][this.id]) {
	    var err = new Error('JSONP user aborted read');
	    err.code = 1000;
	    this._abort(err);
	  }
	};
	
	JsonpReceiver.timeout = 35000;
	JsonpReceiver.scriptErrorTimeout = 1000;
	
	JsonpReceiver.prototype._callback = function(data) {
	  debug('_callback', data);
	  this._cleanup();
	
	  if (this.aborting) {
	    return;
	  }
	
	  if (data) {
	    debug('message', data);
	    this.emit('message', data);
	  }
	  this.emit('close', null, 'network');
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._abort = function(err) {
	  debug('_abort', err);
	  this._cleanup();
	  this.aborting = true;
	  this.emit('close', err.code, err.message);
	  this.removeAllListeners();
	};
	
	JsonpReceiver.prototype._cleanup = function() {
	  debug('_cleanup');
	  clearTimeout(this.timeoutId);
	  if (this.script2) {
	    this.script2.parentNode.removeChild(this.script2);
	    this.script2 = null;
	  }
	  if (this.script) {
	    var script = this.script;
	    // Unfortunately, you can't really abort script loading of
	    // the script.
	    script.parentNode.removeChild(script);
	    script.onreadystatechange = script.onerror =
	        script.onload = script.onclick = null;
	    this.script = null;
	  }
	  delete global[utils.WPrefix][this.id];
	};
	
	JsonpReceiver.prototype._scriptError = function() {
	  debug('_scriptError');
	  var self = this;
	  if (this.errorTimer) {
	    return;
	  }
	
	  this.errorTimer = setTimeout(function() {
	    if (!self.loadedOkay) {
	      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
	    }
	  }, JsonpReceiver.scriptErrorTimeout);
	};
	
	JsonpReceiver.prototype._createScript = function(url) {
	  debug('_createScript', url);
	  var self = this;
	  var script = this.script = global.document.createElement('script');
	  var script2;  // Opera synchronous load trick.
	
	  script.id = 'a' + random.string(8);
	  script.src = url;
	  script.type = 'text/javascript';
	  script.charset = 'UTF-8';
	  script.onerror = this._scriptError.bind(this);
	  script.onload = function() {
	    debug('onload');
	    self._abort(new Error('JSONP script loaded abnormally (onload)'));
	  };
	
	  // IE9 fires 'error' event after onreadystatechange or before, in random order.
	  // Use loadedOkay to determine if actually errored
	  script.onreadystatechange = function() {
	    debug('onreadystatechange', script.readyState);
	    if (/loaded|closed/.test(script.readyState)) {
	      if (script && script.htmlFor && script.onclick) {
	        self.loadedOkay = true;
	        try {
	          // In IE, actually execute the script.
	          script.onclick();
	        } catch (x) {
	          // intentionally empty
	        }
	      }
	      if (script) {
	        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
	      }
	    }
	  };
	  // IE: event/htmlFor/onclick trick.
	  // One can't rely on proper order for onreadystatechange. In order to
	  // make sure, set a 'htmlFor' and 'event' properties, so that
	  // script code will be installed as 'onclick' handler for the
	  // script object. Later, onreadystatechange, manually execute this
	  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
	  // set. For reference see:
	  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	  // Also, read on that about script ordering:
	  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
	  if (typeof script.async === 'undefined' && global.document.attachEvent) {
	    // According to mozilla docs, in recent browsers script.async defaults
	    // to 'true', so we may use it to detect a good browser:
	    // https://developer.mozilla.org/en/HTML/Element/script
	    if (!browser.isOpera()) {
	      // Naively assume we're in IE
	      try {
	        script.htmlFor = script.id;
	        script.event = 'onclick';
	      } catch (x) {
	        // intentionally empty
	      }
	      script.async = true;
	    } else {
	      // Opera, second sync script hack
	      script2 = this.script2 = global.document.createElement('script');
	      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
	      script.async = script2.async = false;
	    }
	  }
	  if (typeof script.async !== 'undefined') {
	    script.async = true;
	  }
	
	  var head = global.document.getElementsByTagName('head')[0];
	  head.insertBefore(script, head.firstChild);
	  if (script2) {
	    head.insertBefore(script2, head.firstChild);
	  }
	};
	
	module.exports = JsonpReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var random = __webpack_require__(47)
	  , urlUtils = __webpack_require__(49)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:sender:jsonp');
	}
	
	var form, area;
	
	function createIframe(id) {
	  debug('createIframe', id);
	  try {
	    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	    return global.document.createElement('<iframe name="' + id + '">');
	  } catch (x) {
	    var iframe = global.document.createElement('iframe');
	    iframe.name = id;
	    return iframe;
	  }
	}
	
	function createForm() {
	  debug('createForm');
	  form = global.document.createElement('form');
	  form.style.display = 'none';
	  form.style.position = 'absolute';
	  form.method = 'POST';
	  form.enctype = 'application/x-www-form-urlencoded';
	  form.acceptCharset = 'UTF-8';
	
	  area = global.document.createElement('textarea');
	  area.name = 'd';
	  form.appendChild(area);
	
	  global.document.body.appendChild(form);
	}
	
	module.exports = function(url, payload, callback) {
	  debug(url, payload);
	  if (!form) {
	    createForm();
	  }
	  var id = 'a' + random.string(8);
	  form.target = id;
	  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
	
	  var iframe = createIframe(id);
	  iframe.id = id;
	  iframe.style.display = 'none';
	  form.appendChild(iframe);
	
	  try {
	    area.value = payload;
	  } catch (e) {
	    // seriously broken browsers get here
	  }
	  form.submit();
	
	  var completed = function(err) {
	    debug('completed', id, err);
	    if (!iframe.onerror) {
	      return;
	    }
	    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
	    // Opera mini doesn't like if we GC iframe
	    // immediately, thus this timeout.
	    setTimeout(function() {
	      debug('cleaning up', id);
	      iframe.parentNode.removeChild(iframe);
	      iframe = null;
	    }, 500);
	    area.value = '';
	    // It is not possible to detect if the iframe succeeded or
	    // failed to submit our form.
	    callback(err);
	  };
	  iframe.onerror = function() {
	    debug('onerror', id);
	    completed();
	  };
	  iframe.onload = function() {
	    debug('onload', id);
	    completed();
	  };
	  iframe.onreadystatechange = function(e) {
	    debug('onreadystatechange', id, iframe.readyState, e);
	    if (iframe.readyState === 'complete') {
	      completed();
	    }
	  };
	  return function() {
	    debug('aborted', id);
	    completed(new Error('Aborted'));
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	__webpack_require__(91);
	
	var URL = __webpack_require__(50)
	  , inherits = __webpack_require__(57)
	  , JSON3 = __webpack_require__(78)
	  , random = __webpack_require__(47)
	  , escape = __webpack_require__(92)
	  , urlUtils = __webpack_require__(49)
	  , eventUtils = __webpack_require__(46)
	  , transport = __webpack_require__(93)
	  , objectUtils = __webpack_require__(82)
	  , browser = __webpack_require__(70)
	  , log = __webpack_require__(94)
	  , Event = __webpack_require__(95)
	  , EventTarget = __webpack_require__(59)
	  , loc = __webpack_require__(96)
	  , CloseEvent = __webpack_require__(97)
	  , TransportMessageEvent = __webpack_require__(98)
	  , InfoReceiver = __webpack_require__(99)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:main');
	}
	
	var transports;
	
	// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
	function SockJS(url, protocols, options) {
	  if (!(this instanceof SockJS)) {
	    return new SockJS(url, protocols, options);
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
	  }
	  EventTarget.call(this);
	
	  this.readyState = SockJS.CONNECTING;
	  this.extensions = '';
	  this.protocol = '';
	
	  // non-standard extension
	  options = options || {};
	  if (options.protocols_whitelist) {
	    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
	  }
	  this._transportsWhitelist = options.transports;
	  this._transportOptions = options.transportOptions || {};
	
	  var sessionId = options.sessionId || 8;
	  if (typeof sessionId === 'function') {
	    this._generateSessionId = sessionId;
	  } else if (typeof sessionId === 'number') {
	    this._generateSessionId = function() {
	      return random.string(sessionId);
	    };
	  } else {
	    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
	  }
	
	  this._server = options.server || random.numberString(1000);
	
	  // Step 1 of WS spec - parse and validate the url. Issue #8
	  var parsedUrl = new URL(url);
	  if (!parsedUrl.host || !parsedUrl.protocol) {
	    throw new SyntaxError("The URL '" + url + "' is invalid");
	  } else if (parsedUrl.hash) {
	    throw new SyntaxError('The URL must not contain a fragment');
	  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
	    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
	  }
	
	  var secure = parsedUrl.protocol === 'https:';
	  // Step 2 - don't allow secure origin with an insecure protocol
	  if (loc.protocol === 'https' && !secure) {
	    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
	  }
	
	  // Step 3 - check port access - no need here
	  // Step 4 - parse protocols argument
	  if (!protocols) {
	    protocols = [];
	  } else if (!Array.isArray(protocols)) {
	    protocols = [protocols];
	  }
	
	  // Step 5 - check protocols argument
	  var sortedProtocols = protocols.sort();
	  sortedProtocols.forEach(function(proto, i) {
	    if (!proto) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
	    }
	    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
	      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
	    }
	  });
	
	  // Step 6 - convert origin
	  var o = urlUtils.getOrigin(loc.href);
	  this._origin = o ? o.toLowerCase() : null;
	
	  // remove the trailing slash
	  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));
	
	  // store the sanitized url
	  this.url = parsedUrl.href;
	  debug('using url', this.url);
	
	  // Step 7 - start connection in background
	  // obtain server info
	  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
	  this._urlInfo = {
	    nullOrigin: !browser.hasDomain()
	  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
	  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
	  };
	
	  this._ir = new InfoReceiver(this.url, this._urlInfo);
	  this._ir.once('finish', this._receiveInfo.bind(this));
	}
	
	inherits(SockJS, EventTarget);
	
	function userSetCode(code) {
	  return code === 1000 || (code >= 3000 && code <= 4999);
	}
	
	SockJS.prototype.close = function(code, reason) {
	  // Step 1
	  if (code && !userSetCode(code)) {
	    throw new Error('InvalidAccessError: Invalid code');
	  }
	  // Step 2.4 states the max is 123 bytes, but we are just checking length
	  if (reason && reason.length > 123) {
	    throw new SyntaxError('reason argument has an invalid length');
	  }
	
	  // Step 3.1
	  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
	    return;
	  }
	
	  // TODO look at docs to determine how to set this
	  var wasClean = true;
	  this._close(code || 1000, reason || 'Normal closure', wasClean);
	};
	
	SockJS.prototype.send = function(data) {
	  // #13 - convert anything non-string to string
	  // TODO this currently turns objects into [object Object]
	  if (typeof data !== 'string') {
	    data = '' + data;
	  }
	  if (this.readyState === SockJS.CONNECTING) {
	    throw new Error('InvalidStateError: The connection has not been established yet');
	  }
	  if (this.readyState !== SockJS.OPEN) {
	    return;
	  }
	  this._transport.send(escape.quote(data));
	};
	
	SockJS.version = __webpack_require__(80);
	
	SockJS.CONNECTING = 0;
	SockJS.OPEN = 1;
	SockJS.CLOSING = 2;
	SockJS.CLOSED = 3;
	
	SockJS.prototype._receiveInfo = function(info, rtt) {
	  debug('_receiveInfo', rtt);
	  this._ir = null;
	  if (!info) {
	    this._close(1002, 'Cannot connect to server');
	    return;
	  }
	
	  // establish a round-trip timeout (RTO) based on the
	  // round-trip time (RTT)
	  this._rto = this.countRTO(rtt);
	  // allow server to override url used for the actual transport
	  this._transUrl = info.base_url ? info.base_url : this.url;
	  info = objectUtils.extend(info, this._urlInfo);
	  debug('info', info);
	  // determine list of desired and supported transports
	  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
	  this._transports = enabledTransports.main;
	  debug(this._transports.length + ' enabled transports');
	
	  this._connect();
	};
	
	SockJS.prototype._connect = function() {
	  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
	    debug('attempt', Transport.transportName);
	    if (Transport.needBody) {
	      if (!global.document.body ||
	          (typeof global.document.readyState !== 'undefined' &&
	            global.document.readyState !== 'complete' &&
	            global.document.readyState !== 'interactive')) {
	        debug('waiting for body');
	        this._transports.unshift(Transport);
	        eventUtils.attachEvent('load', this._connect.bind(this));
	        return;
	      }
	    }
	
	    // calculate timeout based on RTO and round trips. Default to 5s
	    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
	    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
	    debug('using timeout', timeoutMs);
	
	    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
	    var options = this._transportOptions[Transport.transportName];
	    debug('transport url', transportUrl);
	    var transportObj = new Transport(transportUrl, this._transUrl, options);
	    transportObj.on('message', this._transportMessage.bind(this));
	    transportObj.once('close', this._transportClose.bind(this));
	    transportObj.transportName = Transport.transportName;
	    this._transport = transportObj;
	
	    return;
	  }
	  this._close(2000, 'All transports failed', false);
	};
	
	SockJS.prototype._transportTimeout = function() {
	  debug('_transportTimeout');
	  if (this.readyState === SockJS.CONNECTING) {
	    this._transportClose(2007, 'Transport timed out');
	  }
	};
	
	SockJS.prototype._transportMessage = function(msg) {
	  debug('_transportMessage', msg);
	  var self = this
	    , type = msg.slice(0, 1)
	    , content = msg.slice(1)
	    , payload
	    ;
	
	  // first check for messages that don't need a payload
	  switch (type) {
	    case 'o':
	      this._open();
	      return;
	    case 'h':
	      this.dispatchEvent(new Event('heartbeat'));
	      debug('heartbeat', this.transport);
	      return;
	  }
	
	  if (content) {
	    try {
	      payload = JSON3.parse(content);
	    } catch (e) {
	      debug('bad json', content);
	    }
	  }
	
	  if (typeof payload === 'undefined') {
	    debug('empty payload', content);
	    return;
	  }
	
	  switch (type) {
	    case 'a':
	      if (Array.isArray(payload)) {
	        payload.forEach(function(p) {
	          debug('message', self.transport, p);
	          self.dispatchEvent(new TransportMessageEvent(p));
	        });
	      }
	      break;
	    case 'm':
	      debug('message', this.transport, payload);
	      this.dispatchEvent(new TransportMessageEvent(payload));
	      break;
	    case 'c':
	      if (Array.isArray(payload) && payload.length === 2) {
	        this._close(payload[0], payload[1], true);
	      }
	      break;
	  }
	};
	
	SockJS.prototype._transportClose = function(code, reason) {
	  debug('_transportClose', this.transport, code, reason);
	  if (this._transport) {
	    this._transport.removeAllListeners();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
	    this._connect();
	    return;
	  }
	
	  this._close(code, reason);
	};
	
	SockJS.prototype._open = function() {
	  debug('_open', this._transport.transportName, this.readyState);
	  if (this.readyState === SockJS.CONNECTING) {
	    if (this._transportTimeoutId) {
	      clearTimeout(this._transportTimeoutId);
	      this._transportTimeoutId = null;
	    }
	    this.readyState = SockJS.OPEN;
	    this.transport = this._transport.transportName;
	    this.dispatchEvent(new Event('open'));
	    debug('connected', this.transport);
	  } else {
	    // The server might have been restarted, and lost track of our
	    // connection.
	    this._close(1006, 'Server lost session');
	  }
	};
	
	SockJS.prototype._close = function(code, reason, wasClean) {
	  debug('_close', this.transport, code, reason, wasClean, this.readyState);
	  var forceFail = false;
	
	  if (this._ir) {
	    forceFail = true;
	    this._ir.close();
	    this._ir = null;
	  }
	  if (this._transport) {
	    this._transport.close();
	    this._transport = null;
	    this.transport = null;
	  }
	
	  if (this.readyState === SockJS.CLOSED) {
	    throw new Error('InvalidStateError: SockJS has already been closed');
	  }
	
	  this.readyState = SockJS.CLOSING;
	  setTimeout(function() {
	    this.readyState = SockJS.CLOSED;
	
	    if (forceFail) {
	      this.dispatchEvent(new Event('error'));
	    }
	
	    var e = new CloseEvent('close');
	    e.wasClean = wasClean || false;
	    e.code = code || 1000;
	    e.reason = reason;
	
	    this.dispatchEvent(e);
	    this.onmessage = this.onclose = this.onerror = null;
	    debug('disconnected');
	  }.bind(this), 0);
	};
	
	// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
	// and RFC 2988.
	SockJS.prototype.countRTO = function(rtt) {
	  // In a local environment, when using IE8/9 and the `jsonp-polling`
	  // transport the time needed to establish a connection (the time that pass
	  // from the opening of the transport to the call of `_dispatchOpen`) is
	  // around 200msec (the lower bound used in the article above) and this
	  // causes spurious timeouts. For this reason we calculate a value slightly
	  // larger than that used in the article.
	  if (rtt > 100) {
	    return 4 * rtt; // rto > 400msec
	  }
	  return 300 + rtt; // 300msec < rto <= 400msec
	};
	
	module.exports = function(availableTransports) {
	  transports = transport(availableTransports);
	  __webpack_require__(104)(SockJS, availableTransports);
	  return SockJS;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports) {

	/* eslint-disable */
	/* jscs: disable */
	'use strict';
	
	// pulled specific shims from https://github.com/es-shims/es5-shim
	
	var ArrayPrototype = Array.prototype;
	var ObjectPrototype = Object.prototype;
	var FunctionPrototype = Function.prototype;
	var StringPrototype = String.prototype;
	var array_slice = ArrayPrototype.slice;
	
	var _toString = ObjectPrototype.toString;
	var isFunction = function (val) {
	    return ObjectPrototype.toString.call(val) === '[object Function]';
	};
	var isArray = function isArray(obj) {
	    return _toString.call(obj) === '[object Array]';
	};
	var isString = function isString(obj) {
	    return _toString.call(obj) === '[object String]';
	};
	
	var supportsDescriptors = Object.defineProperty && (function () {
	    try {
	        Object.defineProperty({}, 'x', {});
	        return true;
	    } catch (e) { /* this is ES3 */
	        return false;
	    }
	}());
	
	// Define configurable, writable and non-enumerable props
	// if they don't exist.
	var defineProperty;
	if (supportsDescriptors) {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        Object.defineProperty(object, name, {
	            configurable: true,
	            enumerable: false,
	            writable: true,
	            value: method
	        });
	    };
	} else {
	    defineProperty = function (object, name, method, forceAssign) {
	        if (!forceAssign && (name in object)) { return; }
	        object[name] = method;
	    };
	}
	var defineProperties = function (object, map, forceAssign) {
	    for (var name in map) {
	        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
	          defineProperty(object, name, map[name], forceAssign);
	        }
	    }
	};
	
	var toObject = function (o) {
	    if (o == null) { // this matches both null and undefined
	        throw new TypeError("can't convert " + o + ' to object');
	    }
	    return Object(o);
	};
	
	//
	// Util
	// ======
	//
	
	// ES5 9.4
	// http://es5.github.com/#x9.4
	// http://jsperf.com/to-integer
	
	function toInteger(num) {
	    var n = +num;
	    if (n !== n) { // isNaN
	        n = 0;
	    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	    }
	    return n;
	}
	
	function ToUint32(x) {
	    return x >>> 0;
	}
	
	//
	// Function
	// ========
	//
	
	// ES-5 15.3.4.5
	// http://es5.github.com/#x15.3.4.5
	
	function Empty() {}
	
	defineProperties(FunctionPrototype, {
	    bind: function bind(that) { // .length is 1
	        // 1. Let Target be the this value.
	        var target = this;
	        // 2. If IsCallable(Target) is false, throw a TypeError exception.
	        if (!isFunction(target)) {
	            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
	        }
	        // 3. Let A be a new (possibly empty) internal list of all of the
	        //   argument values provided after thisArg (arg1, arg2 etc), in order.
	        // XXX slicedArgs will stand in for "A" if used
	        var args = array_slice.call(arguments, 1); // for normal call
	        // 4. Let F be a new native ECMAScript object.
	        // 11. Set the [[Prototype]] internal property of F to the standard
	        //   built-in Function prototype object as specified in 15.3.3.1.
	        // 12. Set the [[Call]] internal property of F as described in
	        //   15.3.4.5.1.
	        // 13. Set the [[Construct]] internal property of F as described in
	        //   15.3.4.5.2.
	        // 14. Set the [[HasInstance]] internal property of F as described in
	        //   15.3.4.5.3.
	        var binder = function () {
	
	            if (this instanceof bound) {
	                // 15.3.4.5.2 [[Construct]]
	                // When the [[Construct]] internal method of a function object,
	                // F that was created using the bind function is called with a
	                // list of arguments ExtraArgs, the following steps are taken:
	                // 1. Let target be the value of F's [[TargetFunction]]
	                //   internal property.
	                // 2. If target has no [[Construct]] internal method, a
	                //   TypeError exception is thrown.
	                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Construct]] internal
	                //   method of target providing args as the arguments.
	
	                var result = target.apply(
	                    this,
	                    args.concat(array_slice.call(arguments))
	                );
	                if (Object(result) === result) {
	                    return result;
	                }
	                return this;
	
	            } else {
	                // 15.3.4.5.1 [[Call]]
	                // When the [[Call]] internal method of a function object, F,
	                // which was created using the bind function is called with a
	                // this value and a list of arguments ExtraArgs, the following
	                // steps are taken:
	                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
	                //   property.
	                // 2. Let boundThis be the value of F's [[BoundThis]] internal
	                //   property.
	                // 3. Let target be the value of F's [[TargetFunction]] internal
	                //   property.
	                // 4. Let args be a new list containing the same values as the
	                //   list boundArgs in the same order followed by the same
	                //   values as the list ExtraArgs in the same order.
	                // 5. Return the result of calling the [[Call]] internal method
	                //   of target providing boundThis as the this value and
	                //   providing args as the arguments.
	
	                // equiv: target.call(this, ...boundArgs, ...args)
	                return target.apply(
	                    that,
	                    args.concat(array_slice.call(arguments))
	                );
	
	            }
	
	        };
	
	        // 15. If the [[Class]] internal property of Target is "Function", then
	        //     a. Let L be the length property of Target minus the length of A.
	        //     b. Set the length own property of F to either 0 or L, whichever is
	        //       larger.
	        // 16. Else set the length own property of F to 0.
	
	        var boundLength = Math.max(0, target.length - args.length);
	
	        // 17. Set the attributes of the length own property of F to the values
	        //   specified in 15.3.5.1.
	        var boundArgs = [];
	        for (var i = 0; i < boundLength; i++) {
	            boundArgs.push('$' + i);
	        }
	
	        // XXX Build a dynamic function with desired amount of arguments is the only
	        // way to set the length property of a function.
	        // In environments where Content Security Policies enabled (Chrome extensions,
	        // for ex.) all use of eval or Function costructor throws an exception.
	        // However in all of these environments Function.prototype.bind exists
	        // and so this code will never be executed.
	        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
	
	        if (target.prototype) {
	            Empty.prototype = target.prototype;
	            bound.prototype = new Empty();
	            // Clean up dangling references.
	            Empty.prototype = null;
	        }
	
	        // TODO
	        // 18. Set the [[Extensible]] internal property of F to true.
	
	        // TODO
	        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
	        // 20. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
	        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
	        //   false.
	        // 21. Call the [[DefineOwnProperty]] internal method of F with
	        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
	        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
	        //   and false.
	
	        // TODO
	        // NOTE Function objects created using Function.prototype.bind do not
	        // have a prototype property or the [[Code]], [[FormalParameters]], and
	        // [[Scope]] internal properties.
	        // XXX can't delete prototype in pure-js.
	
	        // 22. Return F.
	        return bound;
	    }
	});
	
	//
	// Array
	// =====
	//
	
	// ES5 15.4.3.2
	// http://es5.github.com/#x15.4.3.2
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
	defineProperties(Array, { isArray: isArray });
	
	
	var boxedString = Object('a');
	var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
	
	var properlyBoxesContext = function properlyBoxed(method) {
	    // Check node 0.6.21 bug where third parameter is not boxed
	    var properlyBoxesNonStrict = true;
	    var properlyBoxesStrict = true;
	    if (method) {
	        method.call('foo', function (_, __, context) {
	            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
	        });
	
	        method.call([1], function () {
	            'use strict';
	            properlyBoxesStrict = typeof this === 'string';
	        }, 'x');
	    }
	    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
	};
	
	defineProperties(ArrayPrototype, {
	    forEach: function forEach(fun /*, thisp*/) {
	        var object = toObject(this),
	            self = splitString && isString(this) ? this.split('') : object,
	            thisp = arguments[1],
	            i = -1,
	            length = self.length >>> 0;
	
	        // If no callback function or if callback is not a callable function
	        if (!isFunction(fun)) {
	            throw new TypeError(); // TODO message
	        }
	
	        while (++i < length) {
	            if (i in self) {
	                // Invoke the callback function with call, passing arguments:
	                // context, property value, property key, thisArg object
	                // context
	                fun.call(thisp, self[i], i, object);
	            }
	        }
	    }
	}, !properlyBoxesContext(ArrayPrototype.forEach));
	
	// ES5 15.4.4.14
	// http://es5.github.com/#x15.4.4.14
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
	var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
	defineProperties(ArrayPrototype, {
	    indexOf: function indexOf(sought /*, fromIndex */ ) {
	        var self = splitString && isString(this) ? this.split('') : toObject(this),
	            length = self.length >>> 0;
	
	        if (!length) {
	            return -1;
	        }
	
	        var i = 0;
	        if (arguments.length > 1) {
	            i = toInteger(arguments[1]);
	        }
	
	        // handle negative indices
	        i = i >= 0 ? i : Math.max(0, length + i);
	        for (; i < length; i++) {
	            if (i in self && self[i] === sought) {
	                return i;
	            }
	        }
	        return -1;
	    }
	}, hasFirefox2IndexOfBug);
	
	//
	// String
	// ======
	//
	
	// ES5 15.5.4.14
	// http://es5.github.com/#x15.5.4.14
	
	// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
	// Many browsers do not split properly with regular expressions or they
	// do not perform the split correctly under obscure conditions.
	// See http://blog.stevenlevithan.com/archives/cross-browser-split
	// I've tested in many browsers and this seems to cover the deviant ones:
	//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
	//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
	//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
	//       [undefined, "t", undefined, "e", ...]
	//    ''.split(/.?/) should be [], not [""]
	//    '.'.split(/()()/) should be ["."], not ["", "", "."]
	
	var string_split = StringPrototype.split;
	if (
	    'ab'.split(/(?:ab)*/).length !== 2 ||
	    '.'.split(/(.?)(.?)/).length !== 4 ||
	    'tesst'.split(/(s)*/)[1] === 't' ||
	    'test'.split(/(?:)/, -1).length !== 4 ||
	    ''.split(/.?/).length ||
	    '.'.split(/()()/).length > 1
	) {
	    (function () {
	        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
	
	        StringPrototype.split = function (separator, limit) {
	            var string = this;
	            if (separator === void 0 && limit === 0) {
	                return [];
	            }
	
	            // If `separator` is not a regex, use native split
	            if (_toString.call(separator) !== '[object RegExp]') {
	                return string_split.call(this, separator, limit);
	            }
	
	            var output = [],
	                flags = (separator.ignoreCase ? 'i' : '') +
	                        (separator.multiline  ? 'm' : '') +
	                        (separator.extended   ? 'x' : '') + // Proposed for ES6
	                        (separator.sticky     ? 'y' : ''), // Firefox 3+
	                lastLastIndex = 0,
	                // Make `global` and avoid `lastIndex` issues by working with a copy
	                separator2, match, lastIndex, lastLength;
	            separator = new RegExp(separator.source, flags + 'g');
	            string += ''; // Type-convert
	            if (!compliantExecNpcg) {
	                // Doesn't need flags gy, but they don't hurt
	                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
	            }
	            /* Values for `limit`, per the spec:
	             * If undefined: 4294967295 // Math.pow(2, 32) - 1
	             * If 0, Infinity, or NaN: 0
	             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	             * If other: Type-convert, then use the above rules
	             */
	            limit = limit === void 0 ?
	                -1 >>> 0 : // Math.pow(2, 32) - 1
	                ToUint32(limit);
	            while (match = separator.exec(string)) {
	                // `separator.lastIndex` is not reliable cross-browser
	                lastIndex = match.index + match[0].length;
	                if (lastIndex > lastLastIndex) {
	                    output.push(string.slice(lastLastIndex, match.index));
	                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
	                    // nonparticipating capturing groups
	                    if (!compliantExecNpcg && match.length > 1) {
	                        match[0].replace(separator2, function () {
	                            for (var i = 1; i < arguments.length - 2; i++) {
	                                if (arguments[i] === void 0) {
	                                    match[i] = void 0;
	                                }
	                            }
	                        });
	                    }
	                    if (match.length > 1 && match.index < string.length) {
	                        ArrayPrototype.push.apply(output, match.slice(1));
	                    }
	                    lastLength = match[0].length;
	                    lastLastIndex = lastIndex;
	                    if (output.length >= limit) {
	                        break;
	                    }
	                }
	                if (separator.lastIndex === match.index) {
	                    separator.lastIndex++; // Avoid an infinite loop
	                }
	            }
	            if (lastLastIndex === string.length) {
	                if (lastLength || !separator.test('')) {
	                    output.push('');
	                }
	            } else {
	                output.push(string.slice(lastLastIndex));
	            }
	            return output.length > limit ? output.slice(0, limit) : output;
	        };
	    }());
	
	// [bugfix, chrome]
	// If separator is undefined, then the result array contains just one String,
	// which is the this value (converted to a String). If limit is not undefined,
	// then the output array is truncated so that it contains no more than limit
	// elements.
	// "0".split(undefined, 0) -> []
	} else if ('0'.split(void 0, 0).length) {
	    StringPrototype.split = function split(separator, limit) {
	        if (separator === void 0 && limit === 0) { return []; }
	        return string_split.call(this, separator, limit);
	    };
	}
	
	// ES5 15.5.4.20
	// whitespace from: http://es5.github.io/#x15.5.4.20
	var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' +
	    '\u2029\uFEFF';
	var zeroWidth = '\u200b';
	var wsRegexChars = '[' + ws + ']';
	var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');
	var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');
	var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
	defineProperties(StringPrototype, {
	    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
	    // http://perfectionkills.com/whitespace-deviations/
	    trim: function trim() {
	        if (this === void 0 || this === null) {
	            throw new TypeError("can't convert " + this + ' to object');
	        }
	        return String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');
	    }
	}, hasTrimWhitespaceBug);
	
	// ECMA-262, 3rd B.2.3
	// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
	// non-normative section suggesting uniform semantics and it should be
	// normalized across all browsers
	// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
	var string_substr = StringPrototype.substr;
	var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
	defineProperties(StringPrototype, {
	    substr: function substr(start, length) {
	        return string_substr.call(
	            this,
	            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
	            length
	        );
	    }
	}, hasNegativeSubstrBug);


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(78);
	
	// Some extra characters that Chrome gets wrong, and substitutes with
	// something else on the wire.
	var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
	  , extraLookup;
	
	// This may be quite slow, so let's delay until user actually uses bad
	// characters.
	var unrollLookup = function(escapable) {
	  var i;
	  var unrolled = {};
	  var c = [];
	  for (i = 0; i < 65536; i++) {
	    c.push( String.fromCharCode(i) );
	  }
	  escapable.lastIndex = 0;
	  c.join('').replace(escapable, function(a) {
	    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    return '';
	  });
	  escapable.lastIndex = 0;
	  return unrolled;
	};
	
	// Quote string, also taking care of unicode characters that browsers
	// often break. Especially, take care of unicode surrogates:
	// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
	module.exports = {
	  quote: function(string) {
	    var quoted = JSON3.stringify(string);
	
	    // In most cases this should be very fast and good enough.
	    extraEscapable.lastIndex = 0;
	    if (!extraEscapable.test(quoted)) {
	      return quoted;
	    }
	
	    if (!extraLookup) {
	      extraLookup = unrollLookup(extraEscapable);
	    }
	
	    return quoted.replace(extraEscapable, function(a) {
	      return extraLookup[a];
	    });
	  }
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:utils:transport');
	}
	
	module.exports = function(availableTransports) {
	  return {
	    filterToEnabled: function(transportsWhitelist, info) {
	      var transports = {
	        main: []
	      , facade: []
	      };
	      if (!transportsWhitelist) {
	        transportsWhitelist = [];
	      } else if (typeof transportsWhitelist === 'string') {
	        transportsWhitelist = [transportsWhitelist];
	      }
	
	      availableTransports.forEach(function(trans) {
	        if (!trans) {
	          return;
	        }
	
	        if (trans.transportName === 'websocket' && info.websocket === false) {
	          debug('disabled from server', 'websocket');
	          return;
	        }
	
	        if (transportsWhitelist.length &&
	            transportsWhitelist.indexOf(trans.transportName) === -1) {
	          debug('not in whitelist', trans.transportName);
	          return;
	        }
	
	        if (trans.enabled(info)) {
	          debug('enabled', trans.transportName);
	          transports.main.push(trans);
	          if (trans.facadeTransport) {
	            transports.facade.push(trans.facadeTransport);
	          }
	        } else {
	          debug('disabled', trans.transportName);
	        }
	      });
	      return transports;
	    }
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 94 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var logObject = {};
	['log', 'debug', 'warn'].forEach(function (level) {
	  var levelExists;
	
	  try {
	    levelExists = global.console && global.console[level] && global.console[level].apply;
	  } catch(e) {
	    // do nothing
	  }
	
	  logObject[level] = levelExists ? function () {
	    return global.console[level].apply(global.console, arguments);
	  } : (level === 'log' ? function () {} : logObject.log);
	});
	
	module.exports = logObject;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';
	
	function Event(eventType) {
	  this.type = eventType;
	}
	
	Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
	  this.type = eventType;
	  this.bubbles = canBubble;
	  this.cancelable = cancelable;
	  this.timeStamp = +new Date();
	  return this;
	};
	
	Event.prototype.stopPropagation = function() {};
	Event.prototype.preventDefault = function() {};
	
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	
	module.exports = Event;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	module.exports = global.location || {
	  origin: 'http://localhost:80'
	, protocol: 'http'
	, host: 'localhost'
	, port: 80
	, href: 'http://localhost/'
	, hash: ''
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , Event = __webpack_require__(95)
	  ;
	
	function CloseEvent() {
	  Event.call(this);
	  this.initEvent('close', false, false);
	  this.wasClean = false;
	  this.code = 0;
	  this.reason = '';
	}
	
	inherits(CloseEvent, Event);
	
	module.exports = CloseEvent;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , Event = __webpack_require__(95)
	  ;
	
	function TransportMessageEvent(data) {
	  Event.call(this);
	  this.initEvent('message', false, false);
	  this.data = data;
	}
	
	inherits(TransportMessageEvent, Event);
	
	module.exports = TransportMessageEvent;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  , urlUtils = __webpack_require__(49)
	  , XDR = __webpack_require__(72)
	  , XHRCors = __webpack_require__(67)
	  , XHRLocal = __webpack_require__(69)
	  , XHRFake = __webpack_require__(100)
	  , InfoIframe = __webpack_require__(101)
	  , InfoAjax = __webpack_require__(103)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:info-receiver');
	}
	
	function InfoReceiver(baseUrl, urlInfo) {
	  debug(baseUrl);
	  var self = this;
	  EventEmitter.call(this);
	
	  setTimeout(function() {
	    self.doXhr(baseUrl, urlInfo);
	  }, 0);
	}
	
	inherits(InfoReceiver, EventEmitter);
	
	// TODO this is currently ignoring the list of available transports and the whitelist
	
	InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
	  // determine method of CORS support (if needed)
	  if (urlInfo.sameOrigin) {
	    return new InfoAjax(url, XHRLocal);
	  }
	  if (XHRCors.enabled) {
	    return new InfoAjax(url, XHRCors);
	  }
	  if (XDR.enabled && urlInfo.sameScheme) {
	    return new InfoAjax(url, XDR);
	  }
	  if (InfoIframe.enabled()) {
	    return new InfoIframe(baseUrl, url);
	  }
	  return new InfoAjax(url, XHRFake);
	};
	
	InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
	  var self = this
	    , url = urlUtils.addPath(baseUrl, '/info')
	    ;
	  debug('doXhr', url);
	
	  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
	
	  this.timeoutRef = setTimeout(function() {
	    debug('timeout');
	    self._cleanup(false);
	    self.emit('finish');
	  }, InfoReceiver.timeout);
	
	  this.xo.once('finish', function(info, rtt) {
	    debug('finish', info, rtt);
	    self._cleanup(true);
	    self.emit('finish', info, rtt);
	  });
	};
	
	InfoReceiver.prototype._cleanup = function(wasClean) {
	  debug('_cleanup');
	  clearTimeout(this.timeoutRef);
	  this.timeoutRef = null;
	  if (!wasClean && this.xo) {
	    this.xo.close();
	  }
	  this.xo = null;
	};
	
	InfoReceiver.prototype.close = function() {
	  debug('close');
	  this.removeAllListeners();
	  this._cleanup(false);
	};
	
	InfoReceiver.timeout = 8000;
	
	module.exports = InfoReceiver;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  ;
	
	function XHRFake(/* method, url, payload, opts */) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.to = setTimeout(function() {
	    self.emit('finish', 200, '{}');
	  }, XHRFake.timeout);
	}
	
	inherits(XHRFake, EventEmitter);
	
	XHRFake.prototype.close = function() {
	  clearTimeout(this.to);
	};
	
	XHRFake.timeout = 2000;
	
	module.exports = XHRFake;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  , JSON3 = __webpack_require__(78)
	  , utils = __webpack_require__(46)
	  , IframeTransport = __webpack_require__(77)
	  , InfoReceiverIframe = __webpack_require__(102)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:info-iframe');
	}
	
	function InfoIframe(baseUrl, url) {
	  var self = this;
	  EventEmitter.call(this);
	
	  var go = function() {
	    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
	
	    ifr.once('message', function(msg) {
	      if (msg) {
	        var d;
	        try {
	          d = JSON3.parse(msg);
	        } catch (e) {
	          debug('bad json', msg);
	          self.emit('finish');
	          self.close();
	          return;
	        }
	
	        var info = d[0], rtt = d[1];
	        self.emit('finish', info, rtt);
	      }
	      self.close();
	    });
	
	    ifr.once('close', function() {
	      self.emit('finish');
	      self.close();
	    });
	  };
	
	  // TODO this seems the same as the 'needBody' from transports
	  if (!global.document.body) {
	    utils.attachEvent('load', go);
	  } else {
	    go();
	  }
	}
	
	inherits(InfoIframe, EventEmitter);
	
	InfoIframe.enabled = function() {
	  return IframeTransport.enabled();
	};
	
	InfoIframe.prototype.close = function() {
	  if (this.ifr) {
	    this.ifr.close();
	  }
	  this.removeAllListeners();
	  this.ifr = null;
	};
	
	module.exports = InfoIframe;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45), (function() { return this; }())))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inherits = __webpack_require__(57)
	  , EventEmitter = __webpack_require__(58).EventEmitter
	  , JSON3 = __webpack_require__(78)
	  , XHRLocalObject = __webpack_require__(69)
	  , InfoAjax = __webpack_require__(103)
	  ;
	
	function InfoReceiverIframe(transUrl) {
	  var self = this;
	  EventEmitter.call(this);
	
	  this.ir = new InfoAjax(transUrl, XHRLocalObject);
	  this.ir.once('finish', function(info, rtt) {
	    self.ir = null;
	    self.emit('message', JSON3.stringify([info, rtt]));
	  });
	}
	
	inherits(InfoReceiverIframe, EventEmitter);
	
	InfoReceiverIframe.transportName = 'iframe-info-receiver';
	
	InfoReceiverIframe.prototype.close = function() {
	  if (this.ir) {
	    this.ir.close();
	    this.ir = null;
	  }
	  this.removeAllListeners();
	};
	
	module.exports = InfoReceiverIframe;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var EventEmitter = __webpack_require__(58).EventEmitter
	  , inherits = __webpack_require__(57)
	  , JSON3 = __webpack_require__(78)
	  , objectUtils = __webpack_require__(82)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:info-ajax');
	}
	
	function InfoAjax(url, AjaxObject) {
	  EventEmitter.call(this);
	
	  var self = this;
	  var t0 = +new Date();
	  this.xo = new AjaxObject('GET', url);
	
	  this.xo.once('finish', function(status, text) {
	    var info, rtt;
	    if (status === 200) {
	      rtt = (+new Date()) - t0;
	      if (text) {
	        try {
	          info = JSON3.parse(text);
	        } catch (e) {
	          debug('bad json', text);
	        }
	      }
	
	      if (!objectUtils.isObject(info)) {
	        info = {};
	      }
	    }
	    self.emit('finish', info, rtt);
	    self.removeAllListeners();
	  });
	}
	
	inherits(InfoAjax, EventEmitter);
	
	InfoAjax.prototype.close = function() {
	  this.removeAllListeners();
	  this.xo.close();
	};
	
	module.exports = InfoAjax;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var urlUtils = __webpack_require__(49)
	  , eventUtils = __webpack_require__(46)
	  , JSON3 = __webpack_require__(78)
	  , FacadeJS = __webpack_require__(105)
	  , InfoIframeReceiver = __webpack_require__(102)
	  , iframeUtils = __webpack_require__(81)
	  , loc = __webpack_require__(96)
	  ;
	
	var debug = function() {};
	if (process.env.NODE_ENV !== 'production') {
	  debug = __webpack_require__(54)('sockjs-client:iframe-bootstrap');
	}
	
	module.exports = function(SockJS, availableTransports) {
	  var transportMap = {};
	  availableTransports.forEach(function(at) {
	    if (at.facadeTransport) {
	      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
	    }
	  });
	
	  // hard-coded for the info iframe
	  // TODO see if we can make this more dynamic
	  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
	  var parentOrigin;
	
	  /* eslint-disable camelcase */
	  SockJS.bootstrap_iframe = function() {
	    /* eslint-enable camelcase */
	    var facade;
	    iframeUtils.currentWindowId = loc.hash.slice(1);
	    var onMessage = function(e) {
	      if (e.source !== parent) {
	        return;
	      }
	      if (typeof parentOrigin === 'undefined') {
	        parentOrigin = e.origin;
	      }
	      if (e.origin !== parentOrigin) {
	        return;
	      }
	
	      var iframeMessage;
	      try {
	        iframeMessage = JSON3.parse(e.data);
	      } catch (ignored) {
	        debug('bad json', e.data);
	        return;
	      }
	
	      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
	        return;
	      }
	      switch (iframeMessage.type) {
	      case 's':
	        var p;
	        try {
	          p = JSON3.parse(iframeMessage.data);
	        } catch (ignored) {
	          debug('bad json', iframeMessage.data);
	          break;
	        }
	        var version = p[0];
	        var transport = p[1];
	        var transUrl = p[2];
	        var baseUrl = p[3];
	        debug(version, transport, transUrl, baseUrl);
	        // change this to semver logic
	        if (version !== SockJS.version) {
	          throw new Error('Incompatible SockJS! Main site uses:' +
	                    ' "' + version + '", the iframe:' +
	                    ' "' + SockJS.version + '".');
	        }
	
	        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
	            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
	          throw new Error('Can\'t connect to different domain from within an ' +
	                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
	        }
	        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
	        break;
	      case 'm':
	        facade._send(iframeMessage.data);
	        break;
	      case 'c':
	        if (facade) {
	          facade._close();
	        }
	        facade = null;
	        break;
	      }
	    };
	
	    eventUtils.attachEvent('message', onMessage);
	
	    // Start
	    iframeUtils.postMessage('s');
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var JSON3 = __webpack_require__(78)
	  , iframeUtils = __webpack_require__(81)
	  ;
	
	function FacadeJS(transport) {
	  this._transport = transport;
	  transport.on('message', this._transportMessage.bind(this));
	  transport.on('close', this._transportClose.bind(this));
	}
	
	FacadeJS.prototype._transportClose = function(code, reason) {
	  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
	};
	FacadeJS.prototype._transportMessage = function(frame) {
	  iframeUtils.postMessage('t', frame);
	};
	FacadeJS.prototype._send = function(data) {
	  this._transport.send(data);
	};
	FacadeJS.prototype._close = function() {
	  this._transport.close();
	  this._transport.removeAllListeners();
	};
	
	module.exports = FacadeJS;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(m) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _MessageRoom = __webpack_require__(12);
	
	var _MessageRoom2 = _interopRequireDefault(_MessageRoom);
	
	var _Helpers = __webpack_require__(3);
	
	var Helpers = _interopRequireWildcard(_Helpers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ChannelManager = function () {
		function ChannelManager(opts) {
			var _this = this;
	
			_classCallCheck(this, ChannelManager);
	
			this.bus = opts.bus;
			this.transport = opts.transport;
			this.rooms = [];
			this.active = m.prop(null);
	
			// When we reconnect, we need to re-join all of our rooms
			this.bus.on('transport.open', function (event) {
				if (!event.was_reconnection) {
					return;
				}
	
				var groups = _.map(_this.rooms, function (room) {
					return room.instance.transportSafeRoomName();
				});
	
				if (groups.length) {
					_this.transport.join(groups);
				}
			}, this);
	
			// If we get a channel invite for one we don't already have, open it
			this.bus.on('message.channel.invite', function (event) {
				var label = event.channel_label;
				if (event.invite_size === 2 && event.channel_type === 3) {
					// Only us and 1 other person in this channel, and it's a private channel? it's a PM
					label = event.user;
				}
	
				var channel = _this.getRoom(event.channel_name);
				if (channel) {
					channel.instance.label(label);
				} else {
					_this.createRoom(event.channel_name, {
						label: label
					});
				}
			});
	
			this.bus.on('action.ocbutton.click', function (event, channel_name) {
				if (!channel_name) {
					return;
				}
	
				event.preventDefault();
				var channel = _this.createRoom(channel_name);
				_this.setActive(channel.instance.name());
			});
		}
	
		_createClass(ChannelManager, [{
			key: 'transportSafeRoomName',
			value: function transportSafeRoomName(name) {
				return name.toLowerCase().replace('/r/', 'reddit_sub_');
			}
		}, {
			key: 'createRoom',
			value: function createRoom(room_name, args) {
				args = args || {};
				var room = this.getRoom(room_name);
	
				if (!room) {
					room = Helpers.subModule(_MessageRoom2.default, {
						name: room_name,
						label: args.label,
						read_upto: args.read_upto,
						access: args.access,
						linked_channels: args.linked_channels,
						bus: this.bus,
						room_manager: this
					});
	
					this.rooms.push(room);
					this.transport.join(room.instance.transportSafeRoomName());
	
					this.bus.trigger('channel.created', room.instance);
				}
	
				// If we don't currently have an active room, make this the active room
				if (!this.active()) {
					this.setActive(room.instance.name);
				}
	
				return room;
			}
		}, {
			key: 'closeRoom',
			value: function closeRoom(room_name) {
				var room = this.getRoom(room_name);
				if (!room) {
					return;
				}
	
				var room_idx = this.rooms.indexOf(room);
	
				this.rooms = _.without(this.rooms, room);
				this.transport.leave(room.instance.transportSafeRoomName());
				this.bus.trigger('channel.close', room);
	
				// The room after the one that was just removed should now be selected. If there
				// is none, then the one before it.
				if (this.rooms[room_idx]) {
					this.setActive(this.rooms[room_idx].instance.name());
				} else if (this.rooms[room_idx - 1]) {
					this.setActive(this.rooms[room_idx - 1].instance.name());
				} else {
					this.setActive(null);
				}
			}
		}, {
			key: 'getRoom',
			value: function getRoom(room_name) {
				if (typeof room_name !== 'string') {
					return;
				}
	
				var normalised_name = this.transportSafeRoomName(room_name);
				return _.find(this.rooms, function (room) {
					return normalised_name === room.instance.transportSafeRoomName();
				});
			}
		}, {
			key: 'setActive',
			value: function setActive(room_name) {
				var current_room = this.active();
				var selected_room = this.getRoom(room_name);
	
				if (!selected_room) {
					return false;
				}
	
				this.active(selected_room || null);
	
				if (current_room) {
					current_room.instance.is_active = false;
				}
				if (selected_room) {
					selected_room.instance.is_active = true;
				}
	
				this.bus.trigger('channel.active', selected_room ? selected_room.instance : null, current_room ? current_room.instance : null);
			}
		}, {
			key: 'setIndexActive',
			value: function setIndexActive(room_idx) {
				var room = this.rooms[0];
				this.setActive(room ? room.name() : null);
			}
		}]);
	
		return ChannelManager;
	}();
	
	exports.default = ChannelManager;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ModeratorToolbox = {};
	
	ModeratorToolbox.isActive = function () {
		return $('#tb-bottombar').length;
	};
	
	exports.default = ModeratorToolbox;

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Simple wrapper around localStorage
	 */
	var Storage = {};
	
	Storage.get = function (key, default_val) {
		var val = null;
	
		try {
			val = window.localStorage.getItem(key);
			val = JSON.parse(val);
		} catch (err) {}
	
		return val === null ? default_val : val;
	};
	
	Storage.set = function (key, val) {
		try {
			window.localStorage.setItem(key, JSON.stringify(val));
		} catch (err) {
			console.error(err);
		}
	};
	
	exports.default = Storage;

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Simple settings object
	 * @param {Object} values Object that stores the key/val settings
	 */
	function Settings(values) {
		var instance;
	
		var get = function get(key, default_val) {
			var val = values[key];
			return val === null || val === undefined ? default_val : val;
		};
	
		var set = function set(key, val) {
			var old_val = values[key];
			values[key] = val;
			if (typeof instance.onChange === 'function') {
				instance.onChange(key, val, old_val, values);
			}
		};
	
		// Support:
		// instance(getter)
		// instance.get(getter)
		// instance.set(setter)
	
		instance = get;
		instance.get = get;
		instance.set = set;
		instance.values = values;
	
		// This .onChange as a property is bad mmkay. Add it as an event listener or something
		instance.onChange = null;
	
		return instance;
	}
	
	exports.default = Settings;

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EventBus = function () {
		function EventBus() {
			_classCallCheck(this, EventBus);
	
			this.findandAssignEventEmitter();
			this.overloadAddEvent();
		}
	
		_createClass(EventBus, [{
			key: 'findandAssignEventEmitter',
			value: function findandAssignEventEmitter() {
				// reddit.com has backbone...
				if (Backbone && Backbone.Events) {
					_.extend(this, Backbone.Events);
				} else {
					// TODO: Include a very simple event emitter to use outside of reddit.com
					console.log('[error] No event emitter found!');
				}
			}
		}, {
			key: 'overloadAddEvent',
			value: function overloadAddEvent() {
				var self = this;
				var original_on = this.on;
				var original_once = this.once;
	
				this.on = function on(event, fn, context) {
					original_on.call(this, event, fn, context);
					return {
						off: function off() {
							self.off(event, fn, context);
						}
					};
				};
	
				this.once = function once(event, fn, context) {
					original_once.call(this, event, fn, context);
					return {
						off: function off() {
							self.off(event, fn, context);
						}
					};
				};
			}
		}]);
	
		return EventBus;
	}();
	
	exports.default = EventBus;

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Syncing between tabs/windows with the Kango extension framework
	 * @param {Object} values Object that stores the key/val settings
	 */
	
	var ExtensionSync = function () {
		function ExtensionSync(state, bus, body) {
			_classCallCheck(this, ExtensionSync);
	
			this.state = state;
			this.bus = bus;
			this.body = body;
			this.is_syncing = false;
		}
	
		_createClass(ExtensionSync, [{
			key: 'isExtensionAvailable',
			value: function isExtensionAvailable() {
				return !!(this.ext || window.__oc6789);
			}
		}, {
			key: 'init',
			value: function init(cb) {
				var _this = this;
	
				var cb_after_sync = null;
	
				this.bus.on('state.change', function (changed, new_value, old_value, values) {
					if (!_this.is_syncing && changed === 'channel_list') {
						_this.extCall('setChannels', new_value);
					}
				});
	
				this.body.addEventListener('__ocext', function (event) {
					var payload = JSON.parse(event.detail);
					if (payload[0] !== 'ext') {
						return;
					}
	
					if (payload[1] === 'channelsStateUpdated') {
						_this.is_syncing = true;
						_this.state.set('channel_list', payload[2]);
						_this.is_syncing = false;
	
						if (cb_after_sync) {
							cb_after_sync();
							cb_after_sync = null;
						}
					}
				});
	
				cb_after_sync = cb;
				this.extCall('sendMeChannels');
			}
		}, {
			key: 'extCall',
			value: function extCall(function_name, args) {
				var payload = ['app', function_name, args];
				var event = new CustomEvent('__ocext', {
					detail: JSON.stringify(payload)
				});
				this.body.dispatchEvent(event);
			}
		}]);
	
		return ExtensionSync;
	}();
	
	exports.default = ExtensionSync;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
