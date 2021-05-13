import { FC, useState } from "react"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import s from './taskSubitem.module.css'


type TaskSubitemPropsType = {
    text: string
    subtasks: Array<any>
}

const TaskSubitem: FC<TaskSubitemPropsType> = ({ text, subtasks }) => {

    const [showTask, setShowTask] = useState(false)

    // Увеличить структуру, чтоб работало так же как и иннер тригер
    // написать стили красивого свертывания\развертывания списка
    const subtasksElems = subtasks.map((subsubtask: any) => <SubTaskItem key={subsubtask.id} completed={subsubtask.completed} text={subsubtask.text} />)

    const isCompleted = subtasks.every(subsubtask => subsubtask.completed)

    return (
        <div className={`${s.subitem} ${showTask ? s.show : ''}`}> 
            <div className={s.innerTrigger}>
                <div className={s.trigger} onClick={() => setShowTask(!showTask)} style={isCompleted ? {textDecoration: 'line-through'} : {}} >- {text}</div>
                <div className={s.optionsBar}>
                    <button title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                    <button title='Удалить' className={s.delete}></button>
                </div>
            </div> 
            <div className={s.body}>{showTask ? subtasksElems : ''}</div>
        </div>
    )
}

export default TaskSubitem