export class Chat{
	constructor({el,elModal,elModalAva,messages,getMessages,name,avatar,onClick}){
		this.el = el;
		this.elModal = elModal;
		this.elModalAva = elModalAva;
		this.messages = messages;
		this.name = name;
		this.getMessages = getMessages;
		this.getMessages();
		this.onClick = onClick;
		this.avatarLink = avatar;
		let self = this;

		this.el.addEventListener('click', this.eventListener.bind(this));
	}

	eventListener(event){
		let target = event.target;
		console.log(target.className);
		console.log(this.elModal);
		console.log(this.elModalAva);
		if(target.className == 'chat__header__btn nick'){
			this.onClick(this.elModal);
		}else this.onClick(this.elModalAva);
	}	

	render(){

		let messagesHTML = this.messages.map(function({date,name,text,avatar}){
							return `
								<li class="chat__messages__msg">
									<div class="chat__messages__msg__avatar"><img src="${avatar}" width = '50px' height = '50px'></div>
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
							<div class="chat__header">
								<span>You are as "${this.name}" here</span>
								<input type="button" class="chat__header__btn nick" value="Create your nickname">
								<input type="button" class="chat__header__btn avatar" value="Set your avatar">
							</div>
							<ul class="chat__messages">${messagesHTML}</ul>
							`;
	}

	newArrayToApp(){
		return this.messages[0];
	}

	//transfer function getMessages body to app
	getMessagesToApp(){
		return this.getMessages;
	}
}