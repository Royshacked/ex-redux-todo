import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SAVE_TODO = 'SAVE_TODO'

export const SET_USER = 'SET_USER'

export const SET_FILTERBY = 'SET_FILTERBY'

export const IS_LOADING = 'IS_LOADING'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    user: userService.getLoggedinUser(),
}

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case SAVE_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case SET_USER:
            return { ...state, user: action.loggedinUser }

        case SET_FILTERBY:
            return { ...state, filterBy: action.filterBy }

        case IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store