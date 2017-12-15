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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_form_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_js__ = __webpack_require__(3);





class App {
		constructor({ el }) {
				this.el = el;
				this.nickName = __WEBPACK_IMPORTED_MODULE_2__user_user_js__["a" /* user */].getName();

				let chat = new __WEBPACK_IMPORTED_MODULE_0__chat_chat_js__["a" /* Chat */]({
						el: document.createElement('div'),
						getMessages: function () {
								let xhr = new XMLHttpRequest();

								xhr.addEventListener('readystatechange', function (event) {
										if (xhr.readyState !== 4 || xhr.status !== 200) {
												return;
										}
										const data = JSON.parse(xhr.responseText);

										let dataArr = [];

										for (let key in data) {
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

				let form = new __WEBPACK_IMPORTED_MODULE_1__form_form_js__["a" /* Form */]({
						el: document.createElement('div'),
						existMessages: {},
						nickName: this.nickName,
						onSubmit: function (message, nickName) {

								let time = new Date();
								let hours = time.getHours();
								let mins = time.getMinutes();
								let day = time.getDate();
								let month = time.getMonth() + 1;

								if (hours < 10) hours = '0' + hours;
								if (mins < 10) mins = '0' + mins;

								chat.messages.unshift({
										date: [hours, mins, day, month],
										name: nickName,
										text: message
								});

								chat.render();
						},
						writeMessage: function () {
								let addedMessage = chat.newArrayToApp();

								let xhr = new XMLHttpRequest();

								xhr.open('POST', 'https://mychat2130.firebaseio.com/messages.json', true);

								xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=');

								xhr.send(JSON.stringify(addedMessage));

								chat.render();
						}
				});

				//insert divs in js-app
				this.el.append(chat.el, form.el);
				//add classes to divs
				document.querySelector('.js-app>div').classList.add('chat');
				document.querySelector('.js-app>div:last-child').classList.add('form');

				chat.render();
				form.render();
		}

}

new App({
		el: document.querySelector('.js-app')
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Chat {
	constructor({ el, messages, getMessages }) {
		this.el = el;
		this.messages = messages;
		getMessages();
	}

	render() {

		let messagesHTML = this.messages.map(function ({ date, name, text }) {
			return `
								<li class="chat__messages__msg">
									<div class="chat__messages__msg__avatar"></div>
									<div class="chat__messages__msg__time">
										${date[0]}:${date[1]} - ${date[2]}.${date[3]}
									</div>
									<div>
										<span class="chat__messages__msg__sender">${name}:</span>
										<span class="chat__messages__msg__text">${text}</span>
									</div>
								</li>
							`;
		}).join('');

		this.el.innerHTML = `
							<div class="chat__header">Chat header</div>
							<ul class="chat__messages">${messagesHTML}</ul>
							`;
	}
	newArrayToApp() {
		return this.messages[0];
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Chat;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Form {
	constructor({ el, onSubmit, writeMessage, nickName }) {
		this.el = el;
		this.onSubmit = onSubmit;
		this.writeMessage = writeMessage;
		this.nickName = nickName;

		this.el.addEventListener('submit', this.eventListener.bind(this));
	}

	eventListener(event) {
		event.preventDefault();

		let target = event.target;

		let newMessage = target.querySelector('textarea').value;

		this.onSubmit(newMessage, this.nickName);
		this.writeMessage();
	}

	render() {
		this.el.innerHTML = `
							<form>
								<textarea placeholder="Type a message here"></textarea>
								<input type="submit" class="form__sendBtn" value="send">
							</form>
							`;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return user; });
class User {
	constructor() {}

	getName() {
		let nickName = prompt("Enter your name if you don't want be Anonymous ", 'Anonymous');
		if (nickName == null) {
			return 'Anonymous';
		}
		return nickName;
	}
}

let user = new User();

/***/ })
/******/ ]);