document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#todo-form");
	const input = document.querySelector("#todo-text");
	const list = document.querySelector("#todos");

	if (!form || !input || !list) {
		console.error("Missing required DOM Elements; #todo-form, #todo-text and/or #todos");
		return;
	}

	let todos = loadToDos();

	renderToDos(todos);

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const text = input.value.trim();
		const MAX_LENGTH = 200;
		if (!text) {
			return;
		}
		if (text.length > MAX_LENGTH) {
			alert("ToDo is too long. Maximum length is " + MAX_LENGTH + " characters.");
			return;
		}
		const todo = {
			id: crypto.randomUUID(),
			text,
			completed: false,
		};
		todos.push(todo);

		appendToDoItem(todo);
		saveToDos(todos);
		input.value = "";
	});

	function renderToDos(todos) {
		list.innerHTML = "";
		todos.forEach((todo) => appendToDoItem(todo));
	}

	function saveToDos(todos) {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	function loadToDos() {
		const raw = localStorage.getItem("todos");
		if (!raw)
			return [];
		return JSON.parse(raw);
	}

	function appendToDoItem(todo) {
		const li = document.createElement("li");
		li.dataset.id = todo.id;
		const label = document.createElement("span");
		label.textContent = todo.text;
		if (todo.completed)
			li.classList.add("completed");

		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "削除";
		deleteBtn.addEventListener("click", () => {
			todos = todos.filter((item) => item.id !== todo.id);
			li.remove();
			saveToDos(todos);
		});

		li.append(label, deleteBtn);
		list.appendChild(li);
	}
});
