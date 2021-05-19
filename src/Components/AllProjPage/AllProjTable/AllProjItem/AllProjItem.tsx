import { FC } from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import getProcentCompletedProj from "../../../../heplers/getProcentCompletedProj"
import getSubTasksFromTasks from "../../../../heplers/getSubTasksFromTasks"
import { AppStateType } from "../../../../Redux/reduxStore"
import { tasksActions } from '../../../../Redux/tasksReducer'
import s from '../allProjTable.module.css'



type AllProjItemPropsType = {
    core: string
    name: string
    desc: string
    id: number
    completed: boolean
    link: string
    deleteProject: (id: number) => void
}

type MapStatePropsType = {
    tasks: Array<any>
    subtasks: Array<any>
    subsubtasks: Array<any>
}

type MapDispatchPropsType = {
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
}

const AllProjItem: FC<AllProjItemPropsType & MapStatePropsType & MapDispatchPropsType> = ({ core, name, desc, completed, link, id, tasks, subtasks, subsubtasks, deleteProject, deleteTask }) => {

    const targetTasks = tasks.filter(task => task.forProject === id)
    const targetSubtasks = getSubTasksFromTasks(targetTasks, subtasks)
    const targetSubSubtasks = getSubTasksFromTasks(targetSubtasks, subsubtasks)
    
    const procent = getProcentCompletedProj({
        tasks: targetTasks,
        subtasks: targetSubtasks,
        subsubtasks: targetSubSubtasks
    }, id)

    const deleteItem = () => {
        deleteProject(id)
        targetTasks.forEach(task => {
            deleteTask(task.id, 0, task.subtasksId)
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

const mapStateToProps = (state: AppStateType) => ({
    tasks: state.tasksReducer.tasks,
    subtasks: state.tasksReducer.subtasks,
    subsubtasks: state.tasksReducer.subsubtasks
})

const mapDispatchToProps = {
    deleteTask: tasksActions.deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjItem)