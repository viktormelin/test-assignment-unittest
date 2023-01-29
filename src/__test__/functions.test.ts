import { addTodo, changeTodo, removeAllTodos } from '../ts/functions';
import { Todo } from '../ts/models/Todo';

describe('should test the addTodo function', () => {
	test('should add todo', () => {
		const todoText = 'Some todo text';
		const todos: Todo[] = [];
		const result = addTodo(todoText, todos);

		expect(result.success).toBeTruthy();
	});

	test('should not add new todo', () => {
		const todoText = 'S';
		const todos: Todo[] = [];
		const result = addTodo(todoText, todos);

		expect(result.success).toBeFalsy();
	});
});

test('should change todo state', () => {
	const todo: Todo = { text: 'A mock todo', done: false };

	changeTodo(todo);

	expect(todo.done).toBeTruthy();
});

test('should remove all todos', () => {
	const todos: Todo[] = [
		{ text: 'A mock todo 1', done: false },
		{ text: 'A mock todo 2', done: false },
		{ text: 'A mock todo 3', done: false },
		{ text: 'A mock todo 4', done: false },
		{ text: 'A mock todo 5', done: false },
	];

	removeAllTodos(todos);

	expect(todos.length).toBe(0);
});
