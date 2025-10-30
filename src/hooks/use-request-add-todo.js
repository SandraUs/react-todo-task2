import { useState } from "react"

export const useRequestAddTodo = (refreshTodos) => {
	const [text, setText] = useState('')

	const requestAddTodo = () => {
		if (!text.trim()) return

		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ text })
		})
		.then(() => {
			setText('')
			refreshTodos()
		})
	}

	return {
		text,
		setText,
		requestAddTodo
	}
}
