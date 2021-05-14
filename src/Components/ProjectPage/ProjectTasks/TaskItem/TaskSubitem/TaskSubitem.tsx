import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../../Redux/reduxStore"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import s from './taskSubitem.module.css'
import { tasksActions } from '../../../../../Redux/tasksReducer'
import AddNewTaskForm from "../../../../common/AddNewTaskForm/AddNewTaskForm"


type TaskSubitemPropsType = {
    id: number
    text: string
    subsubtasksId: Array<number>
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
}

type MapStatePropsType = {
    subsubtasks: any
}

type MapDispatchPropsType = {
    setCompletedStatus: (id: number, status: boolean, level: number) => void
    addNewTask: (task: string, level: number, idTask: number) => void 
}

const TaskSubitem: FC<TaskSubitemPropsType & MapStatePropsType & MapDispatchPropsType> = ({ id, text, subsubtasksId, subsubtasks, deleteTask, changeCompletedStatus, setCompletedStatus, addNewTask }) => {

    const [showTask, setShowTask] = useState(false)

    const [createSubtasksMode, changeCreateSubtasksMode] = useState(false)

    const addSubtaskFromLevel1 = (task: string) => {
        addNewTask(task, 1, id)
    }

    const addSubtaskHandler = () => {
        setShowTask(true)
        changeCreateSubtasksMode(true)
    }

    const subtasksElems = subsubtasksId.map((subtaskId: any) => {
        for(let i = 0; i <= subsubtasks.length; i++){
            if(subsubtasks[i] && subsubtasks[i].id === subtaskId){
                return subsubtasks[i]
            }
        }
    })

    const subtasksGenerate = subtasksElems.map((subsubtask: any) => subsubtask && <SubTaskItem key={subsubtask.id} id={subsubtask.id} completed={subsubtask.completed} text={subsubtask.text} deleteTask={deleteTask} changeCompletedStatus={changeCompletedStatus} /> )

    const isCompleted = subtasksElems.every(subsubtasksId => subsubtasksId && subsubtasksId.completed)

    useEffect(() => {
        setCompletedStatus(id, isCompleted, 1)
    }, [isCompleted])

    const removeSubitem = () => {
        deleteTask(id, 1, subsubtasksId)
    }

    return (
        <div className={`${s.subitem} ${showTask ? s.show : ''}`}> 
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

const mapStateToProps = (state: AppStateType) => ({
    subsubtasks: state.tasksReducer.subsubtasks
})

const mapDispatchToProps = {
    setCompletedStatus: tasksActions.setCompletedStatus,
    addNewTask: tasksActions.addNewTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSubitem)