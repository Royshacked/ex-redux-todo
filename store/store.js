import { userService } from "../services/user.service.js"

const { createStore } = Redux

const SET_TODOS = 'SET_TODOS'

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
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store