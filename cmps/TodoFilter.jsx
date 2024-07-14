import { SET_FILTERBY } from "../store/todo.reducer.js"

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux


export function TodoFilter() {
    const filterBy = useSelector(state => state.todoModule.filterBy)
    const dispatch = useDispatch()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        dispatch({ type: SET_FILTERBY, filterBy: { ...filterBy, [field]: value } })
    }

    const { txt, importance, status } = filterBy
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>

            <label htmlFor="txt"></label>
            <input value={txt} onChange={handleChange} type="search" placeholder="By Txt" id="txt" name="txt" />

            <label htmlFor="importance">Importance: </label>
            <input value={importance} onChange={handleChange} type="number" placeholder="By Importance" id="importance" name="importance" />

            <label htmlFor="status">Status:</label>
            <select name="status" id="status" onChange={handleChange} value={status}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>
        </section>
    )
}