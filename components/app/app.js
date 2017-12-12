
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

				xhr.open('GET', 'https://components-1601-1930.firebaseio.com/chat/messages.json', true);
				xhr.send();	
			},
			messages:[]
		});

		let form = new Form({
			el:document.createElement('div'),
			existMessages:{},
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
			},
			writeMessage:function(){
				let body={};
				let arrRez = chat.newArrayToApp();
				let boundary;

				function makeBoundary(){
				    let text = "";
				    let possible = "abcdefghijklmnopqrstuvwxyz";

				    for( let i=0; i < 19; i++ ){
				        text += possible.charAt(Math.floor(Math.random() * possible.length));
				    }

				    return text;
				}			

				for(let item of arrRez){
					boundary = makeBoundary();
					let key = boundary;
					body[key] = item;
				}
				

				// let boundaryMiddle = '--' + boundary + '\r\n';
				// let boundaryLast = '--' + boundary + '--\r\n';
				// let body = ['\r\n'];

				// for(let key in data){
				// 	body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
				// } 

				// body = body.join(boundaryMiddle) + boundaryLast;

				let xhr = new XMLHttpRequest();
				
				xhr.open('POST', 'https://components-1601-1930.firebaseio.com/chat/messages.json', true);

				xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary='+'-');
				
				xhr.send(body);
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