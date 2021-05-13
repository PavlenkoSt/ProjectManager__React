import { Dispatch, FC, SetStateAction } from 'react'
import s from './taskItem.module.css'

type TaskItemPropsType = {
    text: string
    completed: boolean
    subtasksId?: Array<number> 
    showSubtasks: boolean
    setShowSubtasks: Dispatch<SetStateAction<boolean>>
    subtasksGenerate: Array<JSX.Element>
    isCompleted: boolean
}

const TaskItem: FC<TaskItemPropsType> = ({ text, completed, subtasksId, setShowSubtasks, showSubtasks, subtasksGenerate, isCompleted }) => {
    return (
        <div className={`${s.item} ${subtasksId?.length && showSubtasks ? s.show : ''} ${!subtasksId?.length ? s.without : ''}`}>
            <div className={s.innerTrigger}>
                <div className={s.target} onClick={() => setShowSubtasks(!showSubtasks)} style={isCompleted ? {textDecoration: 'line-through'} : {}}>- {text}</div>
                <div className={s.options}>
                    {!subtasksId?.length ? <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button> : ''}
                    <button title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                    <button title='Удалить' className={s.delete}></button>
                </div>
            </div>
            <div className={s.body}>
                {showSubtasks ? subtasksGenerate : ''}
            </div>
        </div>
    )
}

export default TaskItem