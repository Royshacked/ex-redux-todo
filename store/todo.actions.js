import { todoService } from "../services/todo.service.js"
import { store, SET_TODOS, REMOVE_TODO } from "./store.js"

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))

}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}