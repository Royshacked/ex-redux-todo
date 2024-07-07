const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { Link, NavLink } = ReactRouterDOM

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'


export function AppHeader() {
    const user = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)
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
        setTodoProg(100 * doneTodos / totalTodos)
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                        <label htmlFor="progress">Todos progress:{!todoProg ? 0 : todoProg}%</label>
                        <progress id="progress" value={!todoProg ? 0 : todoProg} max="100"></progress>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}

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
