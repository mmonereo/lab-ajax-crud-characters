class APIHandler {
	constructor(baseUrl) {
		this.BASE_URL = baseUrl;
	}

	getFullList() {
		return	axios.get('https://minions-api.herokuapp.com/characters')
	}

	getOneRegister(id) {
		return	axios.get(`https://minions-api.herokuapp.com/characters/${id}`)
				.catch(error => {
					console.log(error);
				})
	}

	createOneRegister(info) {
		return axios.post('https://minions-api.herokuapp.com/characters', info)
				.then(response => {
					console.log("character created",response.data);
				})
				.catch(error => {
					console.log(error);
				});
	}

	updateOneRegister(id, info) {
		return	axios.put(`https://minions-api.herokuapp.com/characters/${id}`, info)
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				});
	}

	deleteOneRegister(id) {
		return	axios.delete(`https://minions-api.herokuapp.com/characters/${id}`)
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				});
	}

	createBots(number, name){

		for (let i = 0; i < number; i++){
			const botID = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toFixed()
			const botInfo = {
				name: `${name}-${botID}`,
				occupation: "spamming",
				weapon: "spaming"
			}
			this.createOneRegister(botInfo);
		}
	}

	clear(number){
		for (let i = 0; i < number; i++){
			this.deleteOneRegister(i);
		}
	}
}
