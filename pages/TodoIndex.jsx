import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"

import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { loadTodos, removeTodo, saveTodo } from "../store/todo.actions.js"
import { SET_FILTERBY } from "../store/store.js"
import { updateUserBalance, updateUserActivities } from "../store/user.actions.js"

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const todos = useSelector(state => state.todos)
    const user = useSelector(state => state.user)
    const filterBy = useSelector(state => state.filterBy)
    const isLoading = useSelector(state => state.isLoading)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        dispatch({ type: SET_FILTERBY, filterBy: defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .then(() => showSuccessMsg('Todos been loaded..'))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        if (!user) return

        const confirmRemove = confirm('delete?')
        if (!confirmRemove) return

        const activityTitle = 'Removed Todo'

        const prm1 = removeTodo(todoId)
        const prm2 = updateUserActivities(user, activityTitle)

        Promise.all([prm1, prm2])
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot remove todo ')
            })
    }

    function onToggleTodo(todo) {
        if (!user) return

        const todoToSave = { ...todo, isDone: !todo.isDone }

        const prm1 = saveTodo(todoToSave)
        const prm2 = todoToSave.isDone ? updateUserBalance(user) : Promise.resolve()

        Promise.all([prm1, prm2])
            .then((res) => {
                const savedTodo = res[0].todo
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot change Todo status ')
            })
    }

    if (!todos) return <div>No TODOS to show...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} />
            <div>
                {user && <Link to="/todo/edit" className="btn" >Add Todo</Link>}
            </div>
            <h2>Todos List</h2>
            {!isLoading ? <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} /> : <div>Loading...</div>}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}