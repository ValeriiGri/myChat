
import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

export class App{
	constructor({el}){
		this.el = el;

		let chat = new Chat({
			el:document.createElement('div'),
			messages:[
				{
					avatar:'avatar',
					hours:'21',
					mins:'00',
					sender:'sender_1:',
					messageText:'first message'
				},

				{
					avatar:'avatar',
					hours:'21',
					mins:'00',
					sender:'sender_2:',
					messageText:'first message'
				},

				{
					avatar:'avatar',
					hours:'21',
					mins:'00',
					sender:'sender_1:',
					messageText:'second message'
				}
			]
		});

		let form = new Form({
			el:document.createElement('div'),
			onSubmit:function(message){

					let time = new Date();
					let hours = time.getHours();
					let mins = time.getMinutes();
					
					if(hours<10) hours ='0' + hours;
					if(mins<10) mins ='0'+ mins;

					chat.messages.unshift({
						avatar:'avatar',
						hours:hours,
						mins:mins,
						sender:'me:',
						messageText:message
					});

				chat.render();
			}
		});

		//insert divs in js-app
		this.el.append(chat.el,form.el);
		//add classes to divs
		document.querySelector('.js-app>div').classList.add('chat');
		document.querySelector('.js-app>div:last-child').classList.add('form');

		chat.render();
		form.render();

	}

}