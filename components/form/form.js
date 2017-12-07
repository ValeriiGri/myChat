export class Form{
	constructor({el,onSubmit}){
		this.el = el;
		this.onSubmit = onSubmit;
		this.newMessage;

		this.el.addEventListener('submit', this.eventListener.bind(this));

								
	}

	eventListener(event){
		event.preventDefault();

		let target = event.target;

		if(target.tagName == 'FORM'){
			this.newMessage = target.querySelector('textarea').value;
		}
		this.onSubmit(this.newMessage);
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