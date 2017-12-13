export class Chat{
	constructor({el,messages,getMessages}){
		this.el = el;
		this.messages = messages;
		getMessages();
	}

	render(){

		let messagesHTML = this.messages.map(function({date,name,text}){
			if(name == 'me'){
				return `
						<li class="chat__messages__msg_my">
							<div class="chat__messages__msg__avatar"></div>
							<div class="chat__messages__msg__time">${date[0]}:${date[1]}</div>
							<div>
								<span class="chat__messages__msg__sender">${name}:</span>
								<span class="chat__messages__msg__text_my">${text}</span>
							</div>
						</li>
						`;
						}else{
							return `
								<li class="chat__messages__msg">
									<div class="chat__messages__msg__avatar"></div>
									<div class="chat__messages__msg__time">
										${new Date(date).getHours()}:${new Date(date).getMinutes()}
									</div>
									<div>
										<span class="chat__messages__msg__sender">${name}:</span>
										<span class="chat__messages__msg__text">${text}</span>
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
	newArrayToApp(){
		return this.messages[0];
	}
}