import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import s from './taskSubitem.module.css'
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"

type TaskSubitemPropsType = {
    text: string
    showTask: boolean
    isCompleted: boolean
    subtasksGenerate: any
    addSubtaskHandler: () => void
    removeSubitem: () => void
    addSubtaskFromLevel1: (task: string) => void
    changeCreateSubtasksMode: Dispatch<SetStateAction<boolean>>
    setShowTask: Dispatch<SetStateAction<boolean>>
    createSubtasksMode: boolean
}

const TaskSubitem: FC<TaskSubitemPropsType> = ({ text, showTask, isCompleted, subtasksGenerate, addSubtaskHandler, removeSubitem, addSubtaskFromLevel1, changeCreateSubtasksMode, setShowTask, createSubtasksMode }) => {

   

    return (
        <div draggable='true' className={`${s.subitem} ${showTask ? s.show : ''}`}> 
            <div className={s.innerTrigger}>
                <div className={s.trigger} onClick={() => setShowTask(!showTask)} style={isCompleted ? {textDecoration: 'line-through'} : {}} >- {text}</div>
                <div className={s.optionsBar}>
                    <button onClick={addSubtaskHandler} title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                    <button onClick={removeSubitem} title='Удалить' className={s.delete}></button>
                </div>
            </div> 
            <div className={s.body}>{showTask ? subtasksGenerate : ''}</div>
            { createSubtasksMode && <div className={s.subForm}><AddNewTaskForm addSubtask={addSubtaskFromLevel1} changeCreateSubtasksMode={changeCreateSubtasksMode} setShowSubtasks={setShowTask} /></div> }
        </div>
    )
}


export default TaskSubitem