import { userService } from "../services/user.service.js"
import { SET_USER, store } from "./store.js"

export function signup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function login(credentials) {
    return userService.login(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function updateUser(user) {
    return userService.updateUser(user)
        .then((user) => store.dispatch({ type: SET_USER, loggedinUser: user }))
}
