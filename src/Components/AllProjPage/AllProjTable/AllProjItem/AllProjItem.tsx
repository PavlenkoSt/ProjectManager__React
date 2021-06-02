import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import getProcentCompletedProj from "../../../../heplers/getProcentCompletedProj"
import getSubTasksFromTasks from "../../../../heplers/getSubTasksFromTasks"
import { projectsActions } from "../../../../Redux/projectsReducer"
import { subsubtasksSelector, subtasksSelector, tasksSelector } from "../../../../Redux/selectors/tasksSelector"
import { tasksActions } from '../../../../Redux/tasksReducer'
import s from '../allProjTable.module.scss'

type AllProjItemPropsType = {
    core: string
    name: string
    desc: string
    id: number
    completed: boolean
    link: string
}

const AllProjItem: FC<AllProjItemPropsType> = ({ core, name, desc, completed, link, id }) => {
    const dispatch = useDispatch()

    const tasks = useSelector(tasksSelector)
    const subtasks = useSelector(subtasksSelector)
    const subsubtasks = useSelector(subsubtasksSelector)

    const targetTasks = tasks.filter(task => task.forProject === id)
    const targetSubtasks = getSubTasksFromTasks(targetTasks, subtasks)
    const targetSubSubtasks = getSubTasksFromTasks(targetSubtasks, subsubtasks)
    
    const procent = getProcentCompletedProj({
        tasks: targetTasks,
        subtasks: targetSubtasks,
        subsubtasks: targetSubSubtasks
    }, id)

    const deleteItem = () => {
        dispatch(projectsActions.deleteProject(id))
        targetTasks.forEach(task => {
            dispatch(tasksActions.deleteTask(task.id, 0, task.subtasksId))
        })
        toast.dark("Проект успешно удален!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <tr>
            <td>{core}</td>
            <td><NavLink to={`/${link}`}>{name}</NavLink></td>
            <td>{desc || '-'}</td>
            <td>{ completed ? '100%' : procent + '%'}</td>
            <td>{ completed ? <span className={s.green}>&#10004;</span> : <span>&#10008;</span>}</td>
            <td>
                <button onClick={deleteItem} className={s.btn}>&#9746;</button>    
            </td>
        </tr>
    )
}

export default AllProjItem