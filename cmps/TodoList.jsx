import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    const user = useSelector(state => state.user)
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        {user && <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>}
                    </section>
                </li>
            )}
        </ul>
    )
}