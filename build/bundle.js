/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _chat = __webpack_require__(1);

var _form = __webpack_require__(2);

var _user = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App(_ref) {
		var el = _ref.el;

		_classCallCheck(this, App);

		this.el = el;
		this.nickName = _user.user.getName();

		var chat = new _chat.Chat({
				el: document.createElement('div'),
				getMessages: function getMessages() {
						var xhr = new XMLHttpRequest();

						xhr.addEventListener('readystatechange', function (event) {
								if (xhr.readyState !== 4 || xhr.status !== 200) {
										return;
								}
								var data = JSON.parse(xhr.responseText);

								var dataArr = [];

								for (var key in data) {
										dataArr.unshift(data[key]);
								}

								chat.messages = dataArr;
								chat.render();
						});

						xhr.open('GET', 'https://mychat2130.firebaseio.com/messages.json', true);
						xhr.send();
				},
				messages: []
		});

		var form = new _form.Form({
				el: document.createElement('div'),
				existMessages: {},
				nickName: this.nickName,
				onSubmit: function onSubmit(message, nickName) {

						var time = new Date();
						var hours = time.getHours();
						var mins = time.getMinutes();
						var day = time.getDate();
						var month = time.getMonth() + 1;

						if (hours < 10) hours = '0' + hours;
						if (mins < 10) mins = '0' + mins;

						chat.messages.unshift({
								date: [hours, mins, day, month],
								name: nickName,
								text: message
						});

						chat.render();
				},
				writeMessage: function writeMessage() {
						var addedMessage = chat.newArrayToApp();

						var xhr = new XMLHttpRequest();

						xhr.open('POST', 'https://mychat2130.firebaseio.com/messages.json', true);

						xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=');

						xhr.send(JSON.stringify(addedMessage));

						chat.render();
				}
		});

		//insert divs in js-app
		this.el.appendChild(chat.el);
		this.el.appendChild(form.el);
		//add classes to divs
		document.querySelector('.js-app>div').classList.add('chat');
		document.querySelector('.js-app>div:last-child').classList.add('form');

		chat.render();
		form.render();
};

new App({
		el: document.querySelector('.js-app')
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = exports.Chat = function () {
	function Chat(_ref) {
		var el = _ref.el,
		    messages = _ref.messages,
		    getMessages = _ref.getMessages;

		_classCallCheck(this, Chat);

		this.el = el;
		this.messages = messages;
		getMessages();
	}

	_createClass(Chat, [{
		key: 'render',
		value: function render() {

			var messagesHTML = this.messages.map(function (_ref2) {
				var date = _ref2.date,
				    name = _ref2.name,
				    text = _ref2.text;

				return '\n\t\t\t\t\t\t\t\t<li class="chat__messages__msg">\n\t\t\t\t\t\t\t\t\t<div class="chat__messages__msg__avatar"></div>\n\t\t\t\t\t\t\t\t\t<div class="chat__messages__msg__time">\n\t\t\t\t\t\t\t\t\t\t' + date[0] + ':' + date[1] + ' - ' + date[2] + '.' + date[3] + '\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<span class="chat__messages__msg__sender">' + name + ':</span>\n\t\t\t\t\t\t\t\t\t\t<span class="chat__messages__msg__text">' + text + '</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t';
			}).join('');

			this.el.innerHTML = '\n\t\t\t\t\t\t\t<div class="chat__header">Chat header</div>\n\t\t\t\t\t\t\t<ul class="chat__messages">' + messagesHTML + '</ul>\n\t\t\t\t\t\t\t';
		}
	}, {
		key: 'newArrayToApp',
		value: function newArrayToApp() {
			return this.messages[0];
		}
	}]);

	return Chat;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = exports.Form = function () {
	function Form(_ref) {
		var el = _ref.el,
		    onSubmit = _ref.onSubmit,
		    writeMessage = _ref.writeMessage,
		    nickName = _ref.nickName;

		_classCallCheck(this, Form);

		this.el = el;
		this.onSubmit = onSubmit;
		this.writeMessage = writeMessage;
		this.nickName = nickName;

		this.el.addEventListener('submit', this.eventListener.bind(this));
	}

	_createClass(Form, [{
		key: 'eventListener',
		value: function eventListener(event) {
			event.preventDefault();

			var target = event.target;

			var newMessage = target.querySelector('textarea').value;

			this.onSubmit(newMessage, this.nickName);
			this.writeMessage();
		}
	}, {
		key: 'render',
		value: function render() {
			this.el.innerHTML = '\n\t\t\t\t\t\t\t<form>\n\t\t\t\t\t\t\t\t<textarea placeholder="Type a message here"></textarea>\n\t\t\t\t\t\t\t\t<input type="submit" class="form__sendBtn" value="send">\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t';
		}
	}]);

	return Form;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
	function User() {
		_classCallCheck(this, User);
	}

	_createClass(User, [{
		key: 'getName',
		value: function getName() {
			var nickName = prompt("Enter your name if you don't want be Anonymous ", 'Anonymous');
			if (nickName == null) {
				return 'Anonymous';
			}
			return nickName;
		}
	}]);

	return User;
}();

var user = exports.user = new User();

/***/ })
/******/ ]);