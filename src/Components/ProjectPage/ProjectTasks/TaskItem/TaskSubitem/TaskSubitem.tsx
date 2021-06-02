import { FC, useState } from "react"
import s from './taskSubitem.module.scss'
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"
import { useDispatch, useSelector } from "react-redux"
import { subsubtasksSelector } from "../../../../../Redux/selectors/tasksSelector"
import { SubsubtaskType, tasksActions } from "../../../../../Redux/tasksReducer"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import { toast } from "react-toastify"

type TaskSubitemPropsType = {
    id: number
    text: string
    completed: boolean
    subsubtasksId: Array<number>
}

const TaskSubitem: FC<TaskSubitemPropsType> = ({ id, text, completed, subsubtasksId }) => {
    const dispatch = useDispatch()

    const [showTask, setShowTask] = useState(false)
    const [createSubtasksMode, changeCreateSubtasksMode] = useState(false)

    const subsubtasks = useSelector(subsubtasksSelector)

    const subtasksElems = subsubtasksId.map((subtaskId: number) => {
        for(let i = 0; i <= subsubtasks.length; i++){
            if(subsubtasks[i] && subsubtasks[i].id === subtaskId){
                return subsubtasks[i]
            }
        }
    })

    const subtasksGenerate = subtasksElems.map((subsubtask?: SubsubtaskType) => subsubtask && (
        <SubTaskItem 
            key={subsubtask.id} 
            id={subsubtask.id} 
            completed={subsubtask.completed} 
            text={subsubtask.text} 
        />)
    )

    const isCompleted = subtasksElems.every(subsubtasksId => subsubtasksId && subsubtasksId.completed)

    const completedSubtask = !subtasksGenerate?.length ? completed : isCompleted

    const removeSubitem = () => {
        dispatch(tasksActions.deleteTask(id, 1, subsubtasksId))
        toast.dark("Подзадача успешно удалена!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const addSubtaskFromLevel1 = (task: string) => {
        dispatch(tasksActions.addNewTask(task, 1, id))
        toast.dark("Подподзадача успешно добавлена!", {
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
        setShowTask(true)
        changeCreateSubtasksMode(true)
    }

    const toggleCompletedStatus = () => {
        dispatch(tasksActions.changeCompletedStatus(id, 1))
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