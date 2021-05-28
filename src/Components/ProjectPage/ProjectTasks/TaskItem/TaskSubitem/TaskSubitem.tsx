import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import s from './taskSubitem.module.css'
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"

type TaskSubitemPropsType = {
    text: string
    showTask: boolean
    isCompleted: boolean
    subtasksGenerate: Array<JSX.Element> | any
    completed: boolean
    addSubtaskHandler: () => void
    removeSubitem: () => void
    toggleCompletedStatus: () => void
    addSubtaskFromLevel1: (task: string) => void
    changeCreateSubtasksMode: Dispatch<SetStateAction<boolean>>
    setShowTask: Dispatch<SetStateAction<boolean>>
    createSubtasksMode: boolean
}

const TaskSubitem: FC<TaskSubitemPropsType> = ({ text, showTask, isCompleted, completed, subtasksGenerate, addSubtaskHandler, removeSubitem, toggleCompletedStatus, addSubtaskFromLevel1, changeCreateSubtasksMode, setShowTask, createSubtasksMode }) => {

    const completedSubtask = !subtasksGenerate?.length ? completed : isCompleted

    return (
        <div className={`${s.subitem} ${showTask ? s.show : ''}`}> 
            <div className={s.innerTrigger}>
                <div className={`${s.trigger} ${!subtasksGenerate?.length ? s.withoutArr : ''}`} onClick={() => setShowTask(!showTask)} style={completedSubtask ? {textDecoration: 'line-through'} : {}} >- {text}</div>
                <div className={`${s.optionsBar} ${!subtasksGenerate?.length ? s.big : ''}`}>
                    {!subtasksGenerate?.length ? <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button> : ''}
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