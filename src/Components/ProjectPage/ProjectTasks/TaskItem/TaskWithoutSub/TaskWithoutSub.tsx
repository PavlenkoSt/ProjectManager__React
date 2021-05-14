import { FC } from "react"
import s from './taskWithoutSub.module.css'

type TaskWithoutSubPropsType = {
    id: number
    text: string
    completed: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
}

const TaskWithoutSub: FC<TaskWithoutSubPropsType> = ({ id, text, completed, deleteTask, changeCompletedStatus }) => {

    const removeSubItem = () => {
        deleteTask(id, 1, null)
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 1)
    }

    return (
        <div className={s.subInnerTrigger}>
            <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
            <div className={s.optionsBar}>
                <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                <button title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                <button title='Удалить' onClick={removeSubItem} className={s.delete}></button>
            </div>
        </div>
    )
}

export default TaskWithoutSub