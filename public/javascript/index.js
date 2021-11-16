const charactersAPI = new APIHandler('http://localhost:8000');
charactersAPI.getFullList().then(res => console.log(res.data));
window.addEventListener('load', () => {
	document.getElementById('fetch-all').addEventListener('click', function (event) {
		
		charactersAPI.getFullList()
			.then(res => {
				const charactersList = document.getElementById('fetch-all-container');
				charactersList.classList.toggle('hidden');
				let characterInfo = '';
				res.data.forEach(character => {
					characterInfo += `
						<div class="character-info">
							<div class="name">${character.name}</div>
							<div class="occupation">${character.occupation}</div>
							<div class="cartoon">${character.cartoon}</div>
							<div class="weapon">${character.weapon}</div>
						</div>`
				});
				charactersList.innerHTML = characterInfo;
			})
			.catch(error => {
				console.log(error);
			});
	});

	document.getElementById('fetch-one').addEventListener('click', function (event) {

		const input = document.querySelectorAll('#search-id-input');
		const id = input[0].value;

		charactersAPI.getOneRegister(id)
			.then((res) => {
				const charactersListInputs = document.querySelectorAll('.character-info div');
				console.log(res);
				charactersListInputs[0].innerHTML += `:  ${res.data.name}`;
				charactersListInputs[1].innerHTML += `:  ${res.data.occupation}`;
				charactersListInputs[2].innerHTML += `:  ${res.data.cartoon}`;
				charactersListInputs[3].innerHTML += `:  ${res.data.weapon}`;
				
			})
			.catch(error => {
				input[0].value = 'id not found';
				console.log(error);
			});

	});

	document.getElementById('delete-one').addEventListener('click', function (event) {

		const input = document.querySelectorAll('#delete-input');
		const deleteForm = event.target;
		const id = input[0].value;

		charactersAPI.deleteOneRegister(id)
			.then((res) => {
				input[0].value = "";
				deleteForm.classList.toggle('green');
			})
			.catch(error => {
				console.log(error)
				deleteForm.classList.toggle('red');
			})

	});

	document.getElementById('get-edit').addEventListener('click', function (event) {
		
		event.preventDefault();
		const input = document.querySelectorAll('#edit-character-form input');
		const id = input[0].value;
		if (id){
			charactersAPI.getOneRegister(id)
				.then((res) => {
					input[1].value = res.data.name
					input[2].value = res.data.occupation
					input[3].value = res.data.weapon
					if (res.data.cartoon)
						input[4].checked = 'checked'
				})
				.catch(error => {
					input[0].value = 'id not found';
					console.log(error);
				})
		}
	});

	document.getElementById('send-edit').addEventListener('click', function (event){
		event.preventDefault();
		const editForm = document.querySelector('#edit-character-form');
		const input = document.querySelectorAll('#edit-character-form input');
		const id = input[0].value;
		const btn = document.querySelector('#send-edit');
		if (id) {
			const characterInfo = {
				name: input[1].value,
				occupation: input[2].value,
				weapon: input[3].value,
				cartoon: input[4].checked
			}
			charactersAPI.updateOneRegister(id, characterInfo)
				.then((res) => {
					editForm.reset();
					btn.classList.toggle('green');
				})
				.catch(error => {
					console.log(error);
					btn.classList.toggle('red');
				})
		}
	});

	document.getElementById('new-character-form').addEventListener('submit', function (event) {

		event.preventDefault();
		const newCharacterForm = document.querySelector('#new-character-form');
		const inputs = document.querySelectorAll("#new-character-form input")
		const name = inputs[0].value;
		const occupation = inputs[1].value;
		const weapon = inputs[2].value;
		const cartoon = inputs[3].checked;
		const btn = document.querySelector('#new-character-form button');

		charactersAPI.createOneRegister({name, occupation, weapon, cartoon})
			.then((res) => {
				newCharacterForm.reset()
				btn.classList.toggle('green')
			})
			.catch(error => {
				console.log(error)
				btn.classList.toggle('red');
			})
	});
});
