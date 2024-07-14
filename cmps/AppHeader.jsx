const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { Link, NavLink } = ReactRouterDOM

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'


export function AppHeader() {
    const user = useSelector(state => state.userModule.user)
    const todos = useSelector(state => state.todoModule.todos)
    const [todoProg, setTodoProg] = useState(0)

    useEffect(() => {
        getTodosProgressPercent(todos)
    }, [todos])

    function onLogout() {
        logout()
            .then(() => showSuccessMsg('Logged out'))
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function getTodosProgressPercent(todos) {
        const doneTodos = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)

        const totalTodos = todos.length
        setTodoProg(Math.round(100 * doneTodos / totalTodos))
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                <div className="header-user">
                    {user ? (
                        < section >
                            <div className="header-user-details">
                                <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                                <span>{user.balance}</span>
                            </div>
                            <button onClick={onLogout}>Logout</button>
                            <label htmlFor="progress">Todos progress:</label>
                            <progress id="progress" value={!todoProg ? 0 : todoProg} max="100"></progress>
                            {!todoProg ? 0 : todoProg}%
                        </ section >
                    ) : (
                        <section>
                            <LoginSignup />
                        </section>
                    )}
                </div>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
