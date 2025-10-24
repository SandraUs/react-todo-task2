import { useEffect, useState } from 'react'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [text, setText] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [isSorted, setIsSorted] = useState(false)
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)

	useEffect(() => {
		setIsLoading(true)

		fetch('http://localhost:3000/todos')
			.then(res => res.json())
			.then((loadedTodos) => {
				let filtered = loadedTodos.filter(todo =>
					todo.text.toLowerCase().includes(searchQuery.toLowerCase())
				)

				if (isSorted) {
					filtered = [...filtered].sort((a,b) => a.text.localeCompare(b.text))
				}

				setTodos(filtered)
			})
			.finally(() => setIsLoading(false))
	}, [refreshTodosFlag, searchQuery, isSorted])

	const requestAddTodo = () => {
		if (!text.trim()) return

		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({ text })
		})
		.then(() => {
			setText('')
			refreshTodos()
		})
	}

	const requestUpdateTodos = (id) => {
		const newText = prompt ('Введите новый текст:')
		if (!newText) return

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({text: newText})
		})
		.then(() => refreshTodos())
	}

	const requestDeleteTodo = (id) => {

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',

		})
		.finally(() => refreshTodos())
	}

	return (
        <div className={styles.app}>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Новое дело"
            />
            <button onClick={requestAddTodo}>Добавить</button>

            <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
            />

            <button onClick={() => setIsSorted(!isSorted)}>
                {isSorted ? 'Отключить сортировку' : 'Сортировать А-Я'}
            </button>

            {isLoading
                ? <div>Загружаю...</div>
                : todos.map(({ id, text }) => (
                    <div key={id}>
                        {text}
                        <button onClick={() => requestUpdateTodos(id)}>Изменить</button>
                        <button onClick={() => requestDeleteTodo(id)}>Удалить</button>
                    </div>
                ))
            }
        </div>
    )
}
