import { FC } from 'react'
import s from './subTaskItem.module.css'

type SubTaskItemPropsType = {
    text: string
    completed: boolean
}

const SubTaskItem: FC<SubTaskItemPropsType> = ({ text, completed }) => {
    return (
        <div className={s.subInnerTrigger}>
            <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
            <div className={s.optionsBar}>
                <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                <button title='Удалить' className={s.delete}></button>
            </div>
        </div>
    )
}

export default SubTaskItem