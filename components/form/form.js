export class Form{
	constructor({el}){
		this.el = el;
		this.newMessage;

		this.el.addEventListener('submit', this.eventListener.bind(this));

								
	}

	eventListener(event){
		event.preventDefault();

		let target = event.target;

		if(target.tagName == 'FORM'){
			this.newMessage = target.querySelector('textarea').value;
		}
		console.log(this.newMessage);
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