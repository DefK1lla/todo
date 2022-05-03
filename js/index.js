document.addEventListener('DOMContentLoaded', function () {
	const list = document.querySelector('.todo__list');
	const addForm = document.querySelector('.todo__add');

	let tasks =
		JSON.parse(localStorage.getItem('listItems')) ||
		[{ text: "Добавьте задачу", checked: false }];


	render(list, tasks);

	list.addEventListener('click', cllickHandler);


	addForm.addEventListener('submit', addHandler);


	function cllickHandler(e) {
		const task = e.target.closest('.todo__item');
		const index = task.dataset.index;

		if (e.target.classList.contains('todo__delete')) {
			tasks.splice(index, 1);
			render(list, tasks);
		}

		if (e.target.type === 'checkbox') {
			tasks[index].checked = e.target.checked;
			render(list, tasks);
		}

	}

	function addHandler(e) {
		e.preventDefault();

		let value = this.task.value.trim();

		if (value === '') {
			this.task.style.borderColor = 'red';
			return;
		} else {
			this.task.style.borderColor = '#2d5be3';
		}

		tasks.push({ text: value, checked: false });
		render(list, tasks);

		this.reset();
	}

	function render(list, tasks) {
		list.innerHTML = '';
		localStorage.setItem('listItems', JSON.stringify(tasks));

		list.innerHTML = tasks.map((task, index) => {
			return `
				<li class="todo__item" data-index="${index}">
					<div class="todo__task">
						<label>
							<input type="checkbox" ${task.checked ? "checked" : ""}>
							<span>${task.text}</span>
						</label>
	
						<button class="todo__delete">&#10060;</button>
					</div>
				</li>
				`;
		}).join('');
	}
});