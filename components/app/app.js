
import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

export class App{
	constructor({el}){
		this.el = el;

		let chat = new Chat({
			el:document.createElement('div'),
			messages:[
				{
					sender:'sender_1',
					message:'first message'
				},

				{
					sender:'sender_2',
					message:'first message'
				},

				{
					sender:'sender_1',
					message:'second message'
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

	}

}