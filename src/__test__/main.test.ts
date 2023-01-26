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

// test('button should clear todos', () => {
// 	document.body.innerHTML = '<button type="button" id="clearTodos">Rensa lista</button>';
// 	const spy = jest.spyOn(main, 'clearTodos');

// 	main.initTestButton();

// 	document.getElementById('#clearTodos')?.click();

// 	expect(spy).toHaveBeenCalled();
// 	expect(spy).toBeCalledTimes(1);
// });

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
