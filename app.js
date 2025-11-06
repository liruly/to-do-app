document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#todo-form");
	const input = document.querySelector("#todo-text");
	const list = document.querySelector("#todos");
	const MAX_LENGTH = 200;

	if (!form || !input || !list) {
		console.error("Missing required DOM Elements; #todo-form, #todo-text and/or #todos");
		return;
	}

	let todos = loadToDos();
	renderToDos(todos);

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const text = input.value.trim();
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

	function renderToDos(items) {
		list.innerHTML = "";
		items.forEach((todo) => appendToDoItem(todo));
	}

	function saveToDos(items) {
		localStorage.setItem("todos", JSON.stringify(items));
	}

	function loadToDos() {
		const raw = localStorage.getItem("todos");
		if (!raw) {
			return [];
		}
		try {
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed : [];
		} catch (error) {
			console.error("Failed to parse saved todos", error);
			return [];
		}
	}

	function appendToDoItem(todo) {
		const li = document.createElement("li");
		li.dataset.id = todo.id;

		const label = document.createElement("span");
		label.textContent = todo.text;

		const toggleBtn = document.createElement("button");
		toggleBtn.type = "button";
		toggleBtn.className = "todo-action todo-toggle";
		const updateToggleLabel = () => {
			toggleBtn.textContent = todo.completed ? "未完了へ" : "完了";
		};
		updateToggleLabel();
		toggleBtn.addEventListener("click", () => {
			todo.completed = !todo.completed;
			li.classList.toggle("completed", todo.completed);
			updateToggleLabel();
			saveToDos(todos);
		});

		const deleteBtn = document.createElement("button");
		deleteBtn.type = "button";
		deleteBtn.className = "todo-action todo-delete";
		deleteBtn.textContent = "削除";
		deleteBtn.addEventListener("click", () => {
			todos = todos.filter((item) => item.id !== todo.id);
			li.remove();
			saveToDos(todos);
		});

		li.classList.toggle("completed", todo.completed);
		const actions = document.createElement("div");
		actions.className = "todo-actions";
		actions.append(toggleBtn, deleteBtn);

		li.append(label, actions);
		list.appendChild(li);
	}
});
