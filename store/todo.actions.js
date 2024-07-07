import { todoService } from "../services/todo.service.js"
import { store, SET_TODOS, REMOVE_TODO, SAVE_TODO, IS_LOADING } from "./store.js"

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
    return todoService.save(todo)
        .then(todo => store.dispatch({ type: SAVE_TODO, todo }))
}