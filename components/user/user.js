class User{
	constructor(){
	}

	getName(){
		let nickName = prompt("Enter your name if you don't want to be Anonymous ", 'Anonymous');
		if(nickName == null){
			return 'Anonymous';
		}
		return nickName;
	}
}

export let user = new User();