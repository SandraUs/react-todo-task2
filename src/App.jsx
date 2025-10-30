import { useState } from 'react'
import styles from './app.module.css'
import { useDebounce } from './hooks/use-debounce'
import { useRequestAddTodo } from './hooks/use-request-add-todo'
import { useRequestGetTodos } from './hooks/use-request-get-todos'
import { useRequestUpdateTodo } from './hooks/use-request-update-todos.js'
import { useRequestDeleteTodo } from './hooks/use-request-delete-todo'

export const App = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [isSorted, setIsSorted] = useState(false)
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false)

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag)
	const debounceQuery = useDebounce(searchQuery, 500)

	const { text, setText, requestAddTodo } = useRequestAddTodo(refreshTodos)
	const { todos, isLoading } = useRequestGetTodos(refreshTodosFlag, debounceQuery, isSorted)
	const { requestUpdateTodo } = useRequestUpdateTodo(refreshTodos)
	const { requestDeleteTodo } = useRequestDeleteTodo(refreshTodos)

	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
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

			<button className={styles.sortBtn} onClick={() => setIsSorted(!isSorted)}>
				{isSorted ? 'Отключить сортировку' : 'Сортировать А-Я'}
			</button>

			{isLoading
				? <div>Загружаю...</div>
				: todos.map(({ id, text }) => (
					<div className={styles.todoItem} key={id}>
						<span className={styles.todoText}> {text} </span>
						<button onClick={() => requestUpdateTodo(id)}>Изменить</button>
						<button className={styles.deleteBtn} onClick={() => requestDeleteTodo(id)}>Удалить</button>
					</div>
				))
			}
		</div>
	)
}
