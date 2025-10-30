export const useRequestDeleteTodo = (refreshTodos) => {
	const requestDeleteTodo = (id) => {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		}).finally(() => refreshTodos());
	};

	return {
		requestDeleteTodo,
	};
};
