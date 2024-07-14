import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    incrementUserBalance,
    editUser,
    getEmptyUserToEdit,
    updateUserActivities,
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    user.createdAt = user.updatedAt = Date.now()
    user.balance = 10000
    user.activities = []
    user.prefs = {
        color: '#000000',
        bgColor: '#ffffff'
    }

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function incrementUserBalance(user) {
    user.balance += 10
    return storageService.put(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function editUser(userToEdit) {
    return storageService.put(STORAGE_KEY, userToEdit)
        .then(_setLoggedinUser)
}

function updateUserActivities(user, activityTitle) {
    const activity = {
        txt: activityTitle,
        at: Date.now(),
    }

    user.activities.push(activity)

    return storageService.put(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

function getEmptyUserToEdit(user) {
    return {
        fullname: user.fullname,
        color: user.prefs.color,
        bgColor: user.prefs.bgColor,
    }
}

function _setLoggedinUser(user) {
    const loggedinUser = user
    delete loggedinUser.password
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedinUser))
    return loggedinUser
}


// signup({ username: 'muki', password: 'muki1', fullname: 'Muki Ja' })
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }