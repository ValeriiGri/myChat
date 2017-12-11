export class Chat{
	constructor({el,messages,getMessages}){
		this.el = el;
		this.messages = messages;
		getMessages();
		console.log(this.messages);
	}

	render(){

		let messagesHTML = this.messages.map(function({avatar,hours,mins,sender,messageText}){
			if(sender == 'me:'){
				return `
						<li class="chat__messages__msg_my">
							<div class="chat__messages__msg__avatar">${avatar}</div>
							<div class="chat__messages__msg__time">${hours}:${mins}</div>
							<div>
								<span class="chat__messages__msg__sender">${sender}</span>
								<span class="chat__messages__msg__text_my">${messageText}</span>
							</div>
						</li>
						`;
						}else{
							return `
								<li class="chat__messages__msg">
									<div class="chat__messages__msg__avatar">${avatar}</div>
									<div class="chat__messages__msg__time">${hours}:${mins}</div>
									<div>
										<span class="chat__messages__msg__sender">${sender}</span>
										<span class="chat__messages__msg__text">${messageText}</span>
									</div>
								</li>
							`;	
						}
					}).join('');

		this.el.innerHTML = `
							<div class="chat__header">Chat header</div>
							<ul class="chat__messages">${messagesHTML}</ul>
							`;
	}
}