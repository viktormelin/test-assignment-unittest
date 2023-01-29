import { addTodo, changeTodo, removeAllTodos } from './functions';
import { Todo } from './models/Todo';

let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

export function initTestButton() {
	document.getElementById('clearTodos')?.addEventListener('click', () => {
		// @ts-ignore
		exports.clearTodos(todos);
	});

	document.getElementById('sortTodos')?.addEventListener('click', () => {
		// @ts-ignore
		exports.sortTodos(todos);
	});

	(document.getElementById('newTodoForm') as HTMLFormElement)?.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault();

		let todoText: string = (document.getElementById('newTodoText') as HTMLInputElement).value;
		// @ts-ignore
		exports.createNewTodo(todoText, todos);
	});
}

export function createNewTodo(todoText: string, todos: Todo[]) {
	let result = addTodo(todoText, todos);

	if (result.success) {
		createHtml(todos);
	} else {
		displayError(result.error, true);
	}
}

export function createHtml(todos: Todo[]) {
	localStorage.setItem('todos', JSON.stringify(todos));

	let todosContainer: HTMLUListElement = document.getElementById('todos') as HTMLUListElement;

	todosContainer.innerHTML = '';

	for (let i = 0; i < todos.length; i++) {
		let li: HTMLLIElement = document.createElement('li');

		if (todos[i].done) {
			li.classList.add('todo__text--done');
		}

		li.classList.add('todo__text');
		li.innerHTML = todos[i].text;
		li.addEventListener('click', () => {
			// @ts-ignore
			exports.toggleTodo(todos[i]);
		});

		todosContainer.appendChild(li);
	}
}

export function toggleTodo(todo: Todo) {
	changeTodo(todo);
	createHtml(todos);
}

export function displayError(error: string, show: boolean) {
	let errorContainer: HTMLDivElement = document.getElementById('error') as HTMLDivElement;

	errorContainer.innerHTML = error;

	if (show) {
		errorContainer.classList.add('show');
	} else {
		errorContainer.classList.remove('show');
	}
}

export function clearTodos(todos: Todo[]) {
	removeAllTodos(todos);
	createHtml(todos);
}

export function sortTodos(todos: Todo[]) {
	const todosElement = document.querySelector('#todos') as HTMLDivElement;
	todosElement.innerHTML = '';
	createHtml(todos.sort((a, b) => a.text.localeCompare(b.text)));
}

createHtml(todos);
initTestButton();
