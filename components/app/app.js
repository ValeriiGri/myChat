
import {Chat} from './../chat/chat.js';
import {Form} from './../form/form.js';
import {User} from './../user/user.js';
import {Avatar} from './../avatar/avatar.js'

class App{
	constructor({el,elModal,elModalAva}){
		this.el = el;
		this.elModal = elModal;
		this.elModalAva = elModalAva;
		this.nickName = 'Anonymous';//nickName by default
		this.avatar = 'https://i.imgur.com/biq2MDZ.png';//avatar by default

		let chat = new Chat({
			el:document.createElement('div'),
			name:this.nickName,
			avatar:this.avatar,
			elModal:this.elModal,//for onClick method through chat component
			elModalAva:this.elModalAva, 
			onClick:function(el){
				el.style.transform = 'translateY(500px)';
				el.style.transitionDuration = '1s';
			},
			getMessages:function(){
				let xhr = new XMLHttpRequest();

				xhr.addEventListener('readystatechange',function(event) {
  					if (xhr.readyState !== 4 || xhr.status !== 200){
  						return;
  					}
  					const data =  JSON.parse(xhr.responseText);

  					let dataArr = [];

  					for(let key in data){
  						dataArr.unshift(data[key]);
  					}

  					chat.messages = dataArr;
  					chat.render();
				});

				xhr.open('GET', 'https://mychat2130.firebaseio.com/messages.json', true);
				xhr.send();	
			},
			messages:[]
		});

		let time = new Date();

		let hours = function(){
			if(time.getHours()<10){
				return '0' + time.getHours();
			}else return time.getHours();
		};

		let mins = function(){
			if(time.getMinutes()<10){
				return '0'+ time.getMinutes();
			}else return time.getMinutes();
		};

		let day = time.getDate();
		let month = time.getMonth()+1;

		let form = new Form({
			el:document.createElement('div'),
			existMessages:{},
			onSubmit:function(message){			//onSubmit for message form

					chat.messages.unshift({			//by submitting message form - add data in array messages
						date:[hours(),mins(),day,month],
						name:chat.name,
						text:message,
						avatar:chat.avatarLink
					});

				chat.render();
			},
			writeMessage:function(){
				let addedMessage = chat.newArrayToApp();

				let xhr = new XMLHttpRequest();
				
				xhr.open('POST', 'https://mychat2130.firebaseio.com/messages.json', true);

				xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=');
				
				xhr.send(JSON.stringify(addedMessage));

				chat.render();
			}
		});

		let avatar = new Avatar({
			el:document.createElement('form'),
			elDivAvatar:this.elModalAva,
			onClick:function(el){
				el.style.transform = 'translateY(500px)';
				el.style.transitionDuration = '1s';
			},
			onChange:function(avatar,el){			//onChange for avatar form
				chat.avatarLink = avatar;
				el.style.transform = 'translateY(-500px)';
				el.style.transitionDuration = '2s'; 
				chat.render();
			}
		});

		let user = new User({
			el:document.createElement('form'),
			elDivModal:this.elModal,
			onSubmit:function(name){			//onSubmit for userName form
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
		
		// let id = setInterval(()=>{
		// 	let update = chat.getMessagesToApp();
		// 		update();
		// },2000);
	}
}
new App({
		el:document.querySelector('.js-app'),
		elModal:document.querySelector('.modal'),
		elModalAva:document.querySelector('.modal-ava')
	});
