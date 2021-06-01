import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { tasksSelector } from "../../../Redux/selectors/tasksSelector"
import { TaskType } from "../../../Redux/tasksReducer"
import s from './projectTasks.module.css'
import TaskItemContainer from "./TaskItem/TaskItemContainer"


type ProjectTasksPropsType = {
    projectId: number
}

const ProjectTasks: FC<ProjectTasksPropsType> = ({ projectId }) => {
    const tasks = useSelector(tasksSelector)

    const findedTasks = tasks.filter((task: TaskType) => task.forProject === projectId)

    const [dragStartOrder, setDragStartOrder] = useState(0)
    const [dragStartId, setDragStartId] = useState(0)

    if(!findedTasks.length){
        return <p className={s.noTasks}>Задач на проект пока нет!</p>
    }

    const sortTasks = (a: TaskType, b: TaskType) => a.order > b.order ? 1 : -1

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

export default ProjectTasks