export class Chat{
	constructor({el, messages}){
		this.el = el;
		this.messages = messages;
	}

	render(){

		let messagesHTML = this.messages.map(function({avatar,time,sender,messageText}){
			return `
					<li class="chat__messages__msg">
						<div>
							<span class="chat__messages__msg__avatar">${avatar}</span>
							<span class="chat__messages__msg__time">${time}</span>
						</div>
						<div>
							<span class="chat__messages__msg__sender">${sender}</span>
							<span class="chat__messages__msg__text">${messageText}</span>
						</div>
					</li>
			`;
		}).join('');

		this.el.innerHTML = `
							<div class="chat__header">Chat header</div>
							<ul class="chat__messages">${messagesHTML}</ul>
							`;
	}
}