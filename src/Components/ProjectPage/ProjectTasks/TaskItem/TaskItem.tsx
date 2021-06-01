import { Dispatch, FC, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { tasksActions } from '../../../../Redux/tasksReducer'
import AddNewTaskForm from '../../../common/AddNewTaskForm/AddNewTaskForm'
import s from './taskItem.module.css'

type TaskItemPropsType = {
    id: number
    text: string
    completed: boolean
    subsubtasksId?: Array<number> 
    showSubtasks: boolean
    subtasksGenerate: Array<JSX.Element> | any
    isCompleted: boolean
    createSubtasksMode: boolean    
    setShowSubtasks: Dispatch<SetStateAction<boolean>>
    changeCreateSubtasksMode: Dispatch<SetStateAction<boolean>>
    dragStartHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void
    dropHandler: (e: React.DragEvent<HTMLDivElement>) => void
}

const TaskItem: FC<TaskItemPropsType> = ({ id, text, completed, subsubtasksId, setShowSubtasks, showSubtasks, subtasksGenerate, isCompleted, createSubtasksMode, changeCreateSubtasksMode, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler }) => {
    const dispatch = useDispatch()

    const addSubtaskFromLevel0 = (task: string) => {
        dispatch(tasksActions.addNewTask(task, 0, id))
        toast.dark("Подзадача успешно добавлена!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const addSubtaskHandler = () => {
        setShowSubtasks(true)
        changeCreateSubtasksMode(true)
    }

    const removeTask = () => {
        dispatch(tasksActions.deleteTask(id, 0, subsubtasksId as null | Array<number>))
        toast.dark("Задача успешно удалена!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const toggleCompletedStatus = () => {
        dispatch(tasksActions.changeCompletedStatus(id, 0))
        toast.dark(completed ? 'Невыполнено!' : 'Выполнено!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <div 
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            draggable='true' 
            className={`${s.item} ${subsubtasksId?.length && showSubtasks ? s.show : ''} ${!subsubtasksId?.length ? s.without : ''}`}
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
                {showSubtasks && subtasksGenerate.length ? subtasksGenerate : ''}
                { createSubtasksMode && <div className={s.subForm}><AddNewTaskForm addSubtask={addSubtaskFromLevel0} changeCreateSubtasksMode={changeCreateSubtasksMode} setShowSubtasks={setShowSubtasks} /></div> }
            </div>
        </div>
    )
}

export default TaskItem