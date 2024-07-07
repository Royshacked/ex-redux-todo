import { todoService } from "../services/todo.service.js"
import { store, SET_TODOS } from "./store.js"

export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))

}