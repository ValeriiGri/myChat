export class Chat{
	constructor({el, messages}){
		this.el = el;
		this.messages = messages;
	}

	render(){


		this.el.innerHTML = `
							<div class="chat__header">
							</div>
							<ul class="chat__messages">${}</ul>
							`;
		let messageList = document.querySelector('chat__messages');
		messageList.innerHTML = `
							<li class="chat__messages__msg">
								<span class="chat__messages__msg__text"></span>
								<span class="chat__messages__msg__time"></span>
								<span class="chat__messages__msg__avatar"></span>
							</li>
							`;
		document.querySelector('.chat__messages').append(liItem);
	}
}