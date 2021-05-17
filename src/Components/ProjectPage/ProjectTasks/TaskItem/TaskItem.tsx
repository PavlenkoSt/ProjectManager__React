import { Dispatch, FC, SetStateAction } from 'react'
import AddNewTaskForm from '../../../common/AddNewTaskForm/AddNewTaskForm'
import s from './taskItem.module.css'

type TaskItemPropsType = {
    id: number
    text: string
    completed: boolean
    subsubtasksId?: Array<number> 
    showSubtasks: boolean
    setShowSubtasks: Dispatch<SetStateAction<boolean>>
    subtasksGenerate: Array<JSX.Element>
    isCompleted: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void
    createSubtasksMode: boolean
    changeCreateSubtasksMode: Dispatch<SetStateAction<boolean>>
    changeTaskOrder: (id: number, order: number, level: number) => void
    dragStartHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dropHandler: (e: React.DragEvent<HTMLDivElement>) => void
}

const TaskItem: FC<TaskItemPropsType> = ({ id, text, completed, subsubtasksId, setShowSubtasks, showSubtasks, subtasksGenerate, isCompleted, deleteTask, changeCompletedStatus, addNewTask, createSubtasksMode, changeCreateSubtasksMode, changeTaskOrder, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler }) => {

    const addSubtaskFromLevel0 = (task: string) => {
        addNewTask(task, 0, id)
    }

    const addSubtaskHandler = () => {
        setShowSubtasks(true)
        changeCreateSubtasksMode(true)
    }

    const removeTask = () => {
        deleteTask(id, 0, subsubtasksId as null | Array<number>)
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 0)
    }

    return (
        <div 
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            draggable='true' className={`${s.item} ${subsubtasksId?.length && showSubtasks ? s.show : ''} ${!subsubtasksId?.length ? s.without : ''}`}
        >
            <div className={s.innerTrigger}>
                <div className={s.target} onClick={() => setShowSubtasks(!showSubtasks)} style={isCompleted ? {textDecoration: 'line-through'} : {}}>- {text}</div>
                <div className={s.options}>
                    {!subsubtasksId?.length ? <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button> : ''}
                    <button title='Добавить подзадачу' onClick={addSubtaskHandler} className={s.addSubtaskbtn}></button>
                    <button title='Удалить' onClick={removeTask} className={s.delete}></button>
                </div>
            </div>
            <div className={s.body}>
                {showSubtasks ? subtasksGenerate : ''}
                { createSubtasksMode && <div className={s.subForm}><AddNewTaskForm addSubtask={addSubtaskFromLevel0} changeCreateSubtasksMode={changeCreateSubtasksMode} setShowSubtasks={setShowSubtasks} /></div> }
            </div>
        </div>
    )
}

export default TaskItem