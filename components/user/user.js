export class User{
	constructor({el,elDivModal,onSubmit}){
		this.el = el;
		this.elDivModal = elDivModal;
		this.onSubmit = onSubmit;
	}

	render(){
		this.el.innerHTML = `
							<label>write your nickname here <input type="text" value="Anonymous"></label>
							<input type="submit" class="submitName" value="Create">
							`;

		this.el.addEventListener('submit', this.eventListener.bind(this));
	}

	eventListener(event){
		event.preventDefault();
		let target = event.target;

		let myNick = target.querySelector('label>input').value;
		this.onSubmit(myNick);
		this.elDivModal.style.transform = 'translateY(-500px)';
		this.elDivModal.style.transitionDuration = '2s'; 
	}
}
