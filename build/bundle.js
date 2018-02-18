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

var _avatar = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App(_ref) {
	var el = _ref.el,
	    elModal = _ref.elModal,
	    elModalAva = _ref.elModalAva;

	_classCallCheck(this, App);

	this.el = el;
	this.elModal = elModal;
	this.elModalAva = elModalAva;
	this.nickName = 'Anonymous'; //nickName by default
	this.avatar = 'https://i.imgur.com/biq2MDZ.png'; //avatar by default

	var chat = new _chat.Chat({
		el: document.createElement('div'),
		name: this.nickName,
		avatar: this.avatar,
		elModal: this.elModal, //for onClick method through chat component
		elModalAva: this.elModalAva,
		onClick: function onClick(el) {
			el.style.transform = 'translateY(500px)';
			el.style.transitionDuration = '1s';
		},
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

	var time = new Date();

	var hours = function hours() {
		if (time.getHours() < 10) {
			return '0' + time.getHours();
		} else return time.getHours();
	};

	var mins = function mins() {
		if (time.getMinutes() < 10) {
			return '0' + time.getMinutes();
		} else return time.getMinutes();
	};

	var day = time.getDate();
	var month = time.getMonth() + 1;

	var form = new _form.Form({
		el: document.createElement('div'),
		existMessages: {},
		onSubmit: function onSubmit(message) {
			//onSubmit for message form

			chat.messages.unshift({ //by submitting message form - add data in array messages
				date: [hours(), mins(), day, month],
				name: chat.name,
				text: message,
				avatar: chat.avatarLink
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

	var avatar = new _avatar.Avatar({
		el: document.createElement('form'),
		elDivAvatar: this.elModalAva,
		onClick: function onClick(el) {
			el.style.transform = 'translateY(500px)';
			el.style.transitionDuration = '1s';
		},
		onChange: function onChange(avatar, el) {
			//onChange for avatar form
			chat.avatarLink = avatar;
			el.style.transform = 'translateY(-500px)';
			el.style.transitionDuration = '2s';
			chat.render();
		}
	});

	var user = new _user.User({
		el: document.createElement('form'),
		elDivModal: this.elModal,
		onSubmit: function onSubmit(name) {
			//onSubmit for userName form
			chat.name = name;
			chat.render();
		}
	});

	//insert divs in js-app
	//append is not work in IE, I had to use appendChild
	this.el.appendChild(chat.el);
	this.el.appendChild(form.el);
	this.elModal.appendChild(user.el);
	this.elModalAva.appendChild(avatar.el);
	//add classes to divs
	document.querySelector('.js-app>div').classList.add('chat');
	document.querySelector('.js-app>div:nth-child(2)').classList.add('form');
	//document.querySelector('.modal>form').classList.add('user-form');

	chat.render();
	form.render();
	user.render();
	avatar.render();

	//for updating chat messages when another user write message 

	var id = setInterval(function () {
		var update = chat.getMessagesToApp();
		update();
	}, 2000);
};

new App({
	el: document.querySelector('.js-app'),
	elModal: document.querySelector('.modal'),
	elModalAva: document.querySelector('.modal-ava')
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
		    elModal = _ref.elModal,
		    elModalAva = _ref.elModalAva,
		    messages = _ref.messages,
		    getMessages = _ref.getMessages,
		    name = _ref.name,
		    avatar = _ref.avatar,
		    onClick = _ref.onClick;

		_classCallCheck(this, Chat);

		this.el = el;
		this.elModal = elModal;
		this.elModalAva = elModalAva;
		this.messages = messages;
		this.name = name;
		this.getMessages = getMessages;
		this.getMessages();
		this.onClick = onClick;
		this.avatarLink = avatar;
		var self = this;

		this.el.addEventListener('click', this.eventListener.bind(this));
	}

	_createClass(Chat, [{
		key: 'eventListener',
		value: function eventListener(event) {
			var target = event.target;
			console.log(target.className);
			console.log(this.elModal);
			console.log(this.elModalAva);
			if (target.className == 'chat__header__btn nick') {
				this.onClick(this.elModal);
			} else this.onClick(this.elModalAva);
		}
	}, {
		key: 'render',
		value: function render() {

			var messagesHTML = this.messages.map(function (_ref2) {
				var date = _ref2.date,
				    name = _ref2.name,
				    text = _ref2.text,
				    avatar = _ref2.avatar;

				return '\n\t\t\t\t\t\t\t\t<li class="chat__messages__msg">\n\t\t\t\t\t\t\t\t\t<div class="chat__messages__msg__avatar"><img src="' + avatar + '" width = \'50px\' height = \'50px\'></div>\n\t\t\t\t\t\t\t\t\t<div class="chat__messages__msg__time">\n\t\t\t\t\t\t\t\t\t\t' + date[0] + ':' + date[1] + ' - ' + date[2] + '.' + date[3] + '\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<span class="chat__messages__msg__sender">' + name + ':</span>\n\t\t\t\t\t\t\t\t\t\t<span class="chat__messages__msg__text">' + text + '</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t';
			}).join('');

			this.el.innerHTML = '\n\t\t\t\t\t\t\t<div class="chat__header">\n\t\t\t\t\t\t\t\t<span>You are as "' + this.name + '" here</span>\n\t\t\t\t\t\t\t\t<input type="button" class="chat__header__btn nick" value="Create your nickname">\n\t\t\t\t\t\t\t\t<input type="button" class="chat__header__btn avatar" value="Set your avatar">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<ul class="chat__messages">' + messagesHTML + '</ul>\n\t\t\t\t\t\t\t';
		}
	}, {
		key: 'newArrayToApp',
		value: function newArrayToApp() {
			return this.messages[0];
		}

		//transfer function getMessages body to app

	}, {
		key: 'getMessagesToApp',
		value: function getMessagesToApp() {
			return this.getMessages;
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
		    writeMessage = _ref.writeMessage;

		_classCallCheck(this, Form);

		this.el = el;
		this.onSubmit = onSubmit;
		this.writeMessage = writeMessage;

		this.el.addEventListener('submit', this.eventListener.bind(this));
	}

	_createClass(Form, [{
		key: 'eventListener',
		value: function eventListener(event) {
			event.preventDefault();

			var target = event.target;

			var newMessage = target.querySelector('textarea').value;

			this.onSubmit(newMessage);
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

var User = exports.User = function () {
	function User(_ref) {
		var el = _ref.el,
		    elDivModal = _ref.elDivModal,
		    onSubmit = _ref.onSubmit;

		_classCallCheck(this, User);

		this.el = el;
		this.elDivModal = elDivModal;
		this.onSubmit = onSubmit;
	}

	_createClass(User, [{
		key: 'render',
		value: function render() {
			this.el.innerHTML = '\n\t\t\t\t\t\t\t<label>write your nickname here <input type="text" value="Anonymous"></label>\n\t\t\t\t\t\t\t<input type="submit" class="submitName" value="Create">\n\t\t\t\t\t\t\t';

			this.el.addEventListener('submit', this.eventListener.bind(this));
		}
	}, {
		key: 'eventListener',
		value: function eventListener(event) {
			event.preventDefault();
			var target = event.target;

			var myNick = target.querySelector('label>input').value;
			this.onSubmit(myNick);
			this.elDivModal.style.transform = 'translateY(-500px)';
			this.elDivModal.style.transitionDuration = '2s';
		}
	}]);

	return User;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Avatar = exports.Avatar = function () {
	function Avatar(_ref) {
		var el = _ref.el,
		    elDivAvatar = _ref.elDivAvatar,
		    onChange = _ref.onChange,
		    setAvatar = _ref.setAvatar;

		_classCallCheck(this, Avatar);

		this.el = el;
		this.elDivAvatar = elDivAvatar;
		this.onChange = onChange;
		this.setAvatar = setAvatar;

		this.el.addEventListener('change', this.eventListenerAv.bind(this));
	}

	_createClass(Avatar, [{
		key: 'render',
		value: function render() {
			this.el.innerHTML = '\n\t\t\t\t\t\t\t<label>set your avatar</label>\n\t\t\t\t\t\t\t<input type="file" class="submitName">\n\t\t\t\t\t\t\t';
		}
	}, {
		key: 'eventListenerAv',
		value: function eventListenerAv(event) {
			event.preventDefault();
			var target = event.target;

			var file = target.files[0];

			var url = 'https://api.imgur.com/3/image';
			var data = new FormData();

			data.append('image', file);
			var self = this;

			var xhr = new XMLHttpRequest();

			xhr.addEventListener('readystatechange', function () {
				if (xhr.readyState !== 4 || xhr.status !== 200) {
					return;
				}

				var resp = JSON.parse(xhr.response);

				self.avatarLink = resp.data.link;
				self.onChange(self.avatarLink, self.elDivAvatar);
			});

			xhr.open("POST", url, true);
			xhr.setRequestHeader('Content-type', 'multipart/form-data');
			xhr.setRequestHeader('Authorization', 'Client-ID cc2383c189b2a3d');
			xhr.send(file);
		}
	}]);

	return Avatar;
}();

/***/ })
/******/ ]);