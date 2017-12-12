export class Form{
	constructor({el,onSubmit,writeMessage}){
		this.el = el;
		this.onSubmit = onSubmit;
		this.writeMessage = writeMessage;

		this.el.addEventListener('submit', this.eventListener.bind(this));
							
	}

	eventListener(event){
		event.preventDefault();

		let target = event.target;

		let newMessage = target.querySelector('textarea').value;

		this.onSubmit(newMessage);
		this.writeMessage();
	}	

	render(){
		this.el.innerHTML = `
							<form>
								<textarea placeholder="Type a message here"></textarea>
								<input type="submit" class="form__sendBtn" value="send">
							</form>
							`;
	}
}