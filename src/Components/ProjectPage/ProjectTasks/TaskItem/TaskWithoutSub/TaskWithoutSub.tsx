import { FC, useState } from "react"
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"
import s from './taskWithoutSub.module.css'

type TaskWithoutSubPropsType = {
    id: number
    text: string
    completed: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void 
}

const TaskWithoutSub: FC<TaskWithoutSubPropsType> = ({ id, text, completed, deleteTask, changeCompletedStatus, addNewTask }) => {

    const [createSubtasksMode, changeCreateSubtasksMode] = useState(false)

    const addSubtaskFromLevel1 = (task: string) => {
        addNewTask(task, 1, id)
    }

    const removeSubItem = () => {
        deleteTask(id, 1, null)
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 1)
    }

    return (
        <div>
            <div className={s.subInnerTrigger}>
                <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
                <div className={s.optionsBar}>
                    <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                    <button title='Добавить подзадачу' onClick={() => changeCreateSubtasksMode(true)} className={s.addSubtaskbtn}></button>
                    <button title='Удалить' onClick={removeSubItem} className={s.delete}></button>
                </div>
            </div>
            { createSubtasksMode && <div className={s.subForm}><AddNewTaskForm addSubtask={addSubtaskFromLevel1} changeCreateSubtasksMode={changeCreateSubtasksMode} /></div> }
        </div>
    )
}

export default TaskWithoutSub