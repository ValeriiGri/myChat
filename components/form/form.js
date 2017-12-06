export class Form{
	constructor({el}){
		this.el = el;

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