export class Avatar{
	constructor({el,elDivAvatar,onChange,setAvatar}){
		this.el = el;
		this.elDivAvatar = elDivAvatar;
		this.onChange = onChange;
		this.setAvatar = setAvatar;

		this.el.addEventListener('change', this.eventListenerAv.bind(this));
	}

	render(){
		this.el.innerHTML = `
							<label>set your avatar</label>
							<input type="file" class="submitName">
							`;	
	}

	eventListenerAv(event){
		event.preventDefault();
		let target = event.target;

		let file = target.files[0];

		const url = 'https://api.imgur.com/3/image';
        const data = new FormData();
        
          data.append('image',file);
          let self = this;

          let xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange',function() {
              if (xhr.readyState !== 4 || xhr.status !== 200){
                return;
              }

              const resp = JSON.parse(xhr.response);

              self.avatarLink = resp.data.link;
              self.onChange(self.avatarLink,self.elDivAvatar);

            });

          xhr.open("POST", url, true);
          xhr.setRequestHeader('Content-type','multipart/form-data');
          xhr.setRequestHeader('Authorization', 'Client-ID cc2383c189b2a3d');
          xhr.send(file);
	}
}