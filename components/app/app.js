
import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';

export class App{
	constructor({el}){
		this.el = el;

		let chat = new Chat({
			el:document.createElement('div'),
			getMessages:function(){
				let xhr = new XMLHttpRequest();

				xhr.addEventListener('readystatechange',function(event) {
  					if (xhr.readyState !== 4 || xhr.status !== 200){
  						return;
  					}
  					const data =  JSON.parse(xhr.responseText);

  					let dataArr = [];

  					for(let key in data){
  						dataArr.push(data[key]);
  					}

  					chat.messages = dataArr;
  					chat.render();
				});
				//https://components-1601-1930.firebaseio.com/chat/messages.json
				xhr.open('GET', 'https://mychat2130.firebaseio.com/', true);
				xhr.send();
			},
			messages:[]
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
						date:[hours,mins],
						name:'me',
						text:message
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