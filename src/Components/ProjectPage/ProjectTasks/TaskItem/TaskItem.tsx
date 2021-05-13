import { FC, useState } from 'react'
import s from './taskItem.module.css'
import TaskSubitem from './TaskSubitem/TaskSubitem'
import TaskWithoutSub from './TaskWithoutSub/TaskWithoutSub'

type TaskItemPropsType = {
    text: string
    subtasks?: Array<any>
    completed: boolean
}

const TaskItem: FC<TaskItemPropsType> = ({text, subtasks, completed}) => {

    const [showSubtasks, setShowSubtasks] = useState(false)

    const subtasksGenerate = subtasks?.map(subtask => {
        if(subtask.subtasks && subtask.subtasks.length){
            return <TaskSubitem key={subtask.id} text={subtask.text} subtasks={subtask.subtasks}/>
        }else{
            return <TaskWithoutSub key={subtask.id} completed={subtask.completed} text={subtask.text} />
        }
    })

    const isCompleted = subtasks?.length ? subtasks?.every(subtask => subtask.completed) : completed

    // стили для таска, развертывание, удаление, добавление новой подзадачи и т.д
    return (
        <div className={`${s.item} ${subtasks?.length && showSubtasks ? s.show : ''} ${!subtasks?.length ? s.without : ''}`}>
            <div className={s.innerTrigger}>
                <div className={s.target} onClick={() => setShowSubtasks(!showSubtasks)} style={isCompleted ? {textDecoration: 'line-through'} : {}}>- {text}</div>
                <div className={s.options}>
                    {!subtasks?.length ? <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button> : ''}
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