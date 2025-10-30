import { useEffect, useState } from 'react'

export const useRequestGetTodos = (refreshTodosFlag, debounceQuery, isSorted) => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		fetch('http://localhost:3000/todos')
			.then(res => res.json())
			.then((loadedTodos) => {
				let filtered = loadedTodos.filter(todo =>
					todo.text.toLowerCase().includes(debounceQuery.toLowerCase())
				)

				if (isSorted) {
					filtered = [...filtered].sort((a, b) => a.text.localeCompare(b.text))
				}

				setTodos(filtered)
			})
			.finally(() => setIsLoading(false))
	}, [refreshTodosFlag, debounceQuery, isSorted])

	return {
		todos,
		isLoading
	}
}
