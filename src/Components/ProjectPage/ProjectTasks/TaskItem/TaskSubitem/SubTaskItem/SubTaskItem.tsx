import { FC } from 'react'
import s from './subTaskItem.module.css'

type SubTaskItemPropsType = {
    id: number
    text: string
    completed: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
}

const SubTaskItem: FC<SubTaskItemPropsType> = ({id,  text, completed, deleteTask, changeCompletedStatus }) => {

    const removeSubtaskItem = () => {
        deleteTask(id, 2, null)
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 2)
    }

    return (
        <div className={s.subInnerTrigger}>
            <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
            <div className={s.optionsBar}>
                <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                <button title='Удалить' onClick={removeSubtaskItem} className={s.delete}></button>
            </div>
        </div>
    )
}

export default SubTaskItem