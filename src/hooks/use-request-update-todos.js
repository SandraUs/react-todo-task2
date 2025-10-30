export const useRequestUpdateTodo = (refreshTodos) => {
	const requestUpdateTodo = (id) => {
		const newText = prompt('Введите новый текст:');
		if (!newText) return;

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ text: newText }),
		}).then(() => refreshTodos());
	};

	return {
		requestUpdateTodo,
	};
};
