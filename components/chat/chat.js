export class Chat{
	constructor({el,messages,getMessages,name}){
		this.el = el;
		this.messages = messages;
		this.name = name;
		getMessages();

	}

	render(){

		let messagesHTML = this.messages.map(function({date,name,text}){
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
							<div class="chat__header">
								<span>You are as "${this.name}" here</span>
								<input type="button" class="chat__header__btn" value="set your nick name">
							</div>
							<ul class="chat__messages">${messagesHTML}</ul>
							`;
	}
	newArrayToApp(){
		return this.messages[0];
	}
}