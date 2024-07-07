import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: null,
    user: null,
}

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            const todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store