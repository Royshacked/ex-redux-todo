import { todoService } from "../services/todo.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const ADD_TODO = 'ADD_TODO'

export const SET_FILTERBY = 'SET_FILTERBY'

export const IS_LOADING = 'IS_LOADING'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
}

export function todoReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case EDIT_TODO:
            var todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case ADD_TODO:
            var todos = [...state.todos, action.todo]
            return { ...state, todos }

        case SET_FILTERBY:
            return { ...state, filterBy: action.filterBy }

        case IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}
