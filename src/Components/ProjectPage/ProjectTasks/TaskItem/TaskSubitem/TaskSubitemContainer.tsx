import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../../Redux/reduxStore"
import { tasksActions } from "../../../../../Redux/tasksReducer"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import TaskSubitem from "./TaskSubitem"

type TaskSubitemContainerPropsType = {
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

const TaskSubitemContainer: FC<TaskSubitemContainerPropsType & MapStatePropsType & MapDispatchPropsType> = ({ id, text, subsubtasksId, subsubtasks, deleteTask, changeCompletedStatus, setCompletedStatus, addNewTask }) => {
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

    return <TaskSubitem 
        text={text} 
        isCompleted={isCompleted} 
        showTask={showTask}
        subtasksGenerate={subtasksGenerate}
        addSubtaskHandler={addSubtaskHandler}
        removeSubitem={removeSubitem}
        addSubtaskFromLevel1={addSubtaskFromLevel1}
        changeCreateSubtasksMode={changeCreateSubtasksMode}
        setShowTask={setShowTask}
        createSubtasksMode={createSubtasksMode}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    subsubtasks: state.tasksReducer.subsubtasks
})

const mapDispatchToProps = {
    setCompletedStatus: tasksActions.setCompletedStatus,
    addNewTask: tasksActions.addNewTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSubitemContainer)