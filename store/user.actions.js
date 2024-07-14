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

export function editUser(userToEdit) {
    return userService.editUser(userToEdit)
        .then((editedUser) => store.dispatch({ type: SET_USER, loggedinUser: editedUser }))
}

export function updateUserBalance(user) {
    return userService.incrementUserBalance(user)
        .then((updatedUser) => store.dispatch({ type: SET_USER, loggedinUser: updatedUser }))
}

export function updateUserActivities(user, activityTitle) {
    return userService.updateUserActivities(user, activityTitle)
        .then((updatedUser) => store.dispatch({ type: SET_USER, loggedinUser: updatedUser }))
}
