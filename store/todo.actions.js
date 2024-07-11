import { todoService } from "../services/todo.service.js"
import { store, SET_TODOS, REMOVE_TODO, IS_LOADING, EDIT_TODO, ADD_TODO } from "./store.js"

export function loadTodos(filterBy = {}) {
    store.dispatch({ type: IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
            store.dispatch({ type: IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
    const action = todo._id ? EDIT_TODO : ADD_TODO
    return todoService.save(todo)
        .then(todo => store.dispatch({ type: action, todo }))
}

