import { FC, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../Redux/reduxStore"
import { TaskType } from "../../../Redux/tasksReducer"
import s from './projectTasks.module.css'
import TaskItemContainer from "./TaskItem/TaskItemContainer"


type ProjectTasksPropsType = {
    projectId: number
}

type MapStatePropsType = {
    tasks: Array<TaskType>
}

const ProjectTasks: FC<ProjectTasksPropsType & MapStatePropsType> = ({ projectId, tasks }) => {

    const findedTasks = tasks.filter(task => task.forProject === projectId)

    const [dragStartOrder, setDragStartOrder] = useState(0)
    const [dragStartId, setDragStartId] = useState(0)

    if(!findedTasks.length){
        return <p className={s.noTasks}>Задач на проект пока нет!</p>
    }

    const sortTasks = (a: any, b: any) => a.order > b.order ? 1 : -1

    const taskElem = findedTasks
        .sort(sortTasks)
        .map(task => <TaskItemContainer 
            key={task.id} 
            id={task.id} 
            order={task.order} 
            text={task.text} 
            subtasksId={task.subtasksId} 
            completed={task.completed} 
            dragStartOrder={dragStartOrder}
            setDragStartOrder={setDragStartOrder}
            dragStartId={dragStartId}
            setDragStartId={setDragStartId}
        />)

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