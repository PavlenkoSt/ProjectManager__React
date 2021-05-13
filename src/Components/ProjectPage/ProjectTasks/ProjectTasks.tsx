import { FC } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../Redux/reduxStore"
import { TaskType } from "../../../Redux/tasksReducer"
import s from './projectTasks.module.css'
import TaskItem from "./TaskItem/TaskItem"


type ProjectTasksPropsType = {
    projectId: number
}

type MapStatePropsType = {
    tasks: Array<TaskType>
}

const ProjectTasks: FC<ProjectTasksPropsType & MapStatePropsType> = ({ projectId, tasks }) => {

    const findedTasks = tasks.filter(task => task.forProject === projectId)

    if(!findedTasks.length){
        return <p className={s.noTasks}>Задач на проект пока нет!</p>
    }

    const taskElem = findedTasks.map(task => <TaskItem key={task.id} text={task.text} subtasks={task.subtasks} completed={task.completed} />)

    return (
        <div className={s.container}>
            {taskElem}
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    tasks: state.tasksReducer.tasks
})

export default connect(mapStateToProps)(ProjectTasks)