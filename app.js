document.addEventListener("DOMContentLoaded", ()=>{
	const form = document.querySelector("#todo-form");
	const input = document.querySelector("#todo-text");
	const list = document.querySelector("#todos");

	form.addEventListener("submit", (event)=>{
		event.preventDefault();
		const text = input.value.trim();
		if (!text)
			return;
		addTodoItem(text);
		input.value = "";
	});

	function addTodoItem(text) {
		const li = document.createElement("li");
		li.textContent = text;
		list.appendChild(li);
	}
});
