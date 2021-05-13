import { FC } from "react"
import s from './taskWithoutSub.module.css'

type TaskWithoutSubPropsType = {
    text: string
    completed: boolean
}

const TaskWithoutSub: FC<TaskWithoutSubPropsType> = ({ text, completed }) => {
    return (
        <div className={s.subInnerTrigger}>
            <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
            <div className={s.optionsBar}>
                <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                <button title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                <button title='Удалить' className={s.delete}></button>
            </div>
        </div>
    )
}

export default TaskWithoutSub