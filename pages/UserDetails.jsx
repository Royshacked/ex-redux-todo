import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"

import { editUser } from "../store/user.actions.js"

const { useState, useEffect } = React
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

export function UserDetails() {
    const user = useSelector(state => state.user)
    const [userToEdit, setUserToEdit] = useState(userService.getEmptyUserToEdit(user))

    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name, value } = target

        setUserToEdit(userToEdit => ({ ...userToEdit, [name]: value }))
    }

    function submitChanges(ev) {
        ev.preventDefault()

        const editedUser = {
            ...user, fullname: userToEdit.fullname,
            prefs: {
                color: userToEdit.color,
                bgColor: userToEdit.bgColor
            }
        }

        editUser(editedUser)
            .then((editedUser) => {
                navigate('/todo')
                showSuccessMsg(`User ${editedUser.username} preferences changed successlly`)
            })
            .catch(() => showErrorMsg('Couldn\'nt change user preferences'))
    }

    if (!user) return <h2>User not logged in</h2>

    return <section className="user-details">
        <h2>Profile</h2>
        <article className="user-activities">Activities:
            <ul className="activities-list">
                {user.activities.map(activity =>
                    <li key={activity.at}>
                        <span>{activity.txt}</span>
                        <span> At: {new Date(activity.at).toLocaleString()}</span>
                    </li>
                )}
            </ul>
        </article>
        <form onSubmit={submitChanges} className="user-prefs">
            <label htmlFor="fullname">Name:</label>
            <input type="text" id="fullname" name="fullname" value={userToEdit.fullname} onChange={handleChange} />

            <label htmlFor="color">Color:</label>
            <input type="color" id="color" name="color" value={userToEdit.color} onChange={handleChange} />

            <label htmlFor="bgcolor">Backgroung Color:</label>
            <input type="color" id="bgcolor" name="bgColor" value={userToEdit.bgColor} onChange={handleChange} />

            <button>Save</button>
        </form>

        <Link to='/todo'><button className="close-btn">X</button></Link>
    </section>
}