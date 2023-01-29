/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as func from '../ts/functions';
import { Todo } from '../ts/models/Todo';

beforeEach(() => {
	document.body.innerHTML = '';
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe('should test initial eventlisteners', () => {
	test('should clear todos on button click', () => {
		document.body.innerHTML = '<button type="button" id="clearTodos">Rensa lista</button>';

		const spy = jest.spyOn(main, 'clearTodos').mockReturnValue();

		main.initTestButton();

		const clearTodosButton = document.querySelector('#clearTodos') as HTMLButtonElement;
		clearTodosButton.click();

		expect(spy).toHaveBeenCalled();
	});

	test('should add new todo item on button click', () => {
		document.body.innerHTML = `<form id="newTodoForm">
			<div>
				<input type="text" id="newTodoText" />
				<button>Skapa</button>
				<button type="button" id="clearTodos">Rensa lista</button>
			</div>
			<div id="error" class="error"></div>
		</form>`;

		const spy = jest.spyOn(main, 'createNewTodo');

		main.initTestButton();

		const formElement = document.querySelector('#newTodoForm') as HTMLFormElement;
		formElement.submit();

		expect(spy).toHaveBeenCalled();
	});

	describe('should test all sort functions', () => {
		test('should clear all todos before creating a sorted list', () => {
			document.body.innerHTML =
				'<ul id="todos" class="todo">' +
				'<li class="todo__text">AAAA</li>' +
				'<li class="todo__text">CCCC</li>' +
				'<li class="todo__text">BBBB</li>' +
				'<li class="todo__text">EEEE</li>' +
				'<li class="todo__text">DDDD</li>' +
				'</ul>';

			const todos: Todo[] = [
				{ text: 'AAAA', done: false },
				{ text: 'CCCC', done: false },
				{ text: 'BBBB', done: false },
				{ text: 'EEEE', done: false },
				{ text: 'DDDD', done: false },
			];

			const todosShouldBe =
				'<li class="todo__text">AAAA</li>' +
				'<li class="todo__text">BBBB</li>' +
				'<li class="todo__text">CCCC</li>' +
				'<li class="todo__text">DDDD</li>' +
				'<li class="todo__text">EEEE</li>';

			const sortTodosSpy = jest.spyOn(main, 'sortTodos');

			main.sortTodos(todos);

			expect(sortTodosSpy).toHaveBeenCalled();
			expect(document.querySelector('#todos')?.innerHTML).toBe(todosShouldBe);
		});

		test('should sort todos on button click', () => {
			document.body.innerHTML = '<button type="button" id="sortTodos"></button>';

			const todos: Todo[] = [];

			const sortTodosSpy = jest.spyOn(main, 'sortTodos').mockImplementation(() => main.createHtml(todos));
			const createHtmlSpy = jest.spyOn(main, 'createHtml').mockReturnValue();

			main.initTestButton();

			const sortTodosButton = document.querySelector('#sortTodos') as HTMLButtonElement;
			sortTodosButton.click();

			expect(sortTodosSpy).toHaveBeenCalled();
			expect(createHtmlSpy).toHaveBeenCalled();
		});
	});
});

describe('should test createNewTodo function', () => {
	test('should create new todo', () => {
		document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

		const todoText = 'Some todo text';
		const todos: Todo[] = [];

		main.createNewTodo(todoText, todos);

		expect(document.querySelector('#todos')?.innerHTML).toEqual(`<li class="todo__text">${todoText}</li>`);
	});

	test('should not create new todo', () => {
		document.body.innerHTML = '<div id="error" class="error"></div>' + '<ul id="todos" class="todo"></ul>';

		const todoText = 'S';
		const todos: Todo[] = [];

		main.createNewTodo(todoText, todos);

		expect(document.querySelector('#error')?.classList.contains('show')).toBeTruthy();
	});
});

describe('should test the error function', () => {
	test('should display error', () => {
		document.body.innerHTML = `<div id="error" class="error"></div>`;

		const errorString = 'An error string';
		const showError = true;

		main.displayError(errorString, showError);

		const errorElement = document.querySelector('#error');
		expect(errorElement?.classList.contains('show')).toBeTruthy();
	});

	test('should remove error', () => {
		document.body.innerHTML = `<div id="error" class="error show"></div>`;

		const errorString = 'An error string';
		const showError = false;

		main.displayError(errorString, showError);

		const errorElement = document.querySelector('#error');
		expect(errorElement?.classList.contains('show')).toBeFalsy();
	});
});

test('should clear todos', () => {
	document.body.innerHTML =
		'<ul id="todos" class="todo">' +
		'<li class="todo__text">A mock todo 1</li>' +
		'<li class="todo__text">A mock todo 2</li>' +
		'<li class="todo__text">A mock todo 3</li>' +
		'<li class="todo__text">A mock todo 4</li>' +
		'<li class="todo__text">A mock todo 5</li>' +
		'</ul>';

	const todos: Todo[] = [
		{ text: 'A mock todo 1', done: false },
		{ text: 'A mock todo 2', done: false },
		{ text: 'A mock todo 3', done: false },
		{ text: 'A mock todo 4', done: false },
		{ text: 'A mock todo 5', done: false },
	];

	const spy = jest.spyOn(func, 'removeAllTodos');

	main.clearTodos(todos);

	expect(spy).toHaveBeenCalled();
});

test('should create HTML', () => {
	document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

	const todos: Todo[] = [
		{ text: 'A mock todo 1', done: false },
		{ text: 'A mock todo 2', done: true },
		{ text: 'A mock todo 3', done: false },
		{ text: 'A mock todo 4', done: true },
		{ text: 'A mock todo 5', done: false },
	];

	const todosShouldBe =
		'<ul id="todos" class="todo">' +
		'<li class="todo__text">A mock todo 1</li>' +
		'<li class="todo__text--done todo__text">A mock todo 2</li>' +
		'<li class="todo__text">A mock todo 3</li>' +
		'<li class="todo__text--done todo__text">A mock todo 4</li>' +
		'<li class="todo__text">A mock todo 5</li>' +
		'</ul>';

	main.createHtml(todos);

	expect(document.querySelector('#todos')?.outerHTML).toEqual(todosShouldBe);
});

test('should test toggleTodo click', () => {
	document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;

	const todos: Todo[] = [{ text: 'A mock todo 1', done: false }];

	const spy = jest.spyOn(main, 'toggleTodo');

	main.createHtml(todos);

	document.querySelector('li')?.click();

	expect(spy).toHaveBeenCalled();
});

test('should toggle todo state', () => {
	document.body.innerHTML =
		'<ul id="todos" class="todo">' +
		'<li class="todo__text">A mock todo 1</li>' +
		'<li class="todo__text">A mock todo 2</li>' +
		'<li class="todo__text">A mock todo 3</li>' +
		'<li class="todo__text">A mock todo 4</li>' +
		'<li class="todo__text">A mock todo 5</li>' +
		'</ul>';

	const todos: Todo[] = [
		{ text: 'A mock todo 1', done: false },
		{ text: 'A mock todo 2', done: false },
		{ text: 'A mock todo 3', done: false },
		{ text: 'A mock todo 4', done: false },
		{ text: 'A mock todo 5', done: false },
	];

	const spy = jest.spyOn(func, 'changeTodo');

	main.toggleTodo(todos[0]);

	expect(spy).toHaveBeenCalled();
});
