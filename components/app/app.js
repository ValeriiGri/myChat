
import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

export class App{
	constructor({el}){
		this.el = el;

		let chat = new Chat({
			el:document.createElement('div'),
			messages:[
				{
					avatar:'qwe',
					time:'21:00',
					sender:'sender_1',
					messageText:'first message'
				},

				{
					avatar:'qwe',
					time:'21:00',
					sender:'sender_2',
					messageText:'first message'
				},

				{
					avatar:'qwe',
					time:'21:00',
					sender:'sender_1',
					messageText:'second message'
				}
			]
		});

		let form = new Form({
			el:document.createElement('div')
		});

		//insert divs in js-app
		this.el.append(chat.el,form.el);
		//add classes to divs
		document.querySelector('.js-app>div').classList.add('chat');
		document.querySelector('.js-app>div:last-child').classList.add('form');

		chat.render();

	}

}