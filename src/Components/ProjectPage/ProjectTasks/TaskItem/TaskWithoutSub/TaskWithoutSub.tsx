import { Dispatch, FC, SetStateAction, useState } from "react"
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"
import s from './taskWithoutSub.module.css'

type TaskWithoutSubPropsType = {
    id: number
    text: string
    completed: boolean
    order: number
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void
    dragStartOrder: number
    setDragStartOrder: Dispatch<SetStateAction<number>>
    dragStartId: number
    setDragStartId: Dispatch<SetStateAction<number>> 
    changeTaskOrder: (id: number, order: number, level: number) => void

}

const TaskWithoutSub: FC<TaskWithoutSubPropsType> = ({ id, text, completed, order, deleteTask, changeCompletedStatus, addNewTask, dragStartOrder, setDragStartOrder, dragStartId, setDragStartId, changeTaskOrder }) => {

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

    const dragStartHandler = (e: any) => {
        setDragStartId(id)
        setDragStartOrder(order)
        e.target.style.opacity = '0.5'
    }

    const dragEndHandler = (e: any) => {
        e.target.style.opacity = '1'
        if(e.target.classList.contains('taskItem_dragOver__2O2xP')){
            e.target.classList.remove('taskItem_dragOver__2O2xP')
        }else{
            const childsArr = document.querySelectorAll('.taskItem_dragOver__2O2xP')
            if(childsArr.length){
                childsArr.forEach(child => child.classList.remove('taskItem_dragOver__2O2xP'))
            }
        }
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault()
        if(e.target.classList.contains('taskItem_target__1AnYX')){
            e.target.classList.add('taskItem_dragOver__2O2xP')
        }
        
    }

    const dropHandler = (e: any) => {
        e.preventDefault()
        changeTaskOrder(dragStartId, order, 1)
        changeTaskOrder(id, dragStartOrder, 1)
        console.log(dragStartId, order);
        console.log(id, dragStartOrder);
        
    }

    return (
        <div>
            <div 
                draggable='true'
                className={s.subInnerTrigger}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e)}
            >
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