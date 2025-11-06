document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("#todo-form");
	const input = document.querySelector("#todo-text");
	const list = document.querySelector("#todos");

	if (!form || !input || !list) {
		console.error("Missing required DOM Elements; #todo-form, #todo-text and/or #todos");
		return;
	}

	const existingItems = Array.from(list.querySelectorAll("li"))
		.map((item) => item.textContent.trim())
		.filter((text) => text.length > 0);
	list.innerHTML = "";
	existingItems.forEach((text) => addTodoItem(text));

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
		addTodoItem(text);
		input.value = "";
	});

	function addTodoItem(text) {
		const li = document.createElement("li");
		const label = document.createElement("span");
		label.textContent = text;

		const deleteBtn = document.createElement("button");
		deleteBtn.type = "button";
		deleteBtn.textContent = "削除";
		deleteBtn.addEventListener("click", () => {
			li.remove();
		});

		li.append(label, deleteBtn);
		list.appendChild(li);
	}
});
