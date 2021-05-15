import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../Redux/reduxStore"
import { tasksActions } from "../../../../Redux/tasksReducer"
import TaskItem from "./TaskItem"
import TaskSubitemContainer from "./TaskSubitem/TaskSubitemContainer"
import TaskWithoutSub from "./TaskWithoutSub/TaskWithoutSub"

type TaskItemContainerPropsType = {
    text: string
    subtasksId?: Array<number>
    completed: boolean
    id: number
}

type MapStatePropsType = {
    subtasks: any
}

type MapDispatchPropsType = {
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    setCompletedStatus: (id: number, status: boolean, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void
}


const TaskItemContainer: FC<TaskItemContainerPropsType & MapStatePropsType & MapDispatchPropsType> = ({id, text, subtasksId, completed, subtasks, deleteTask, changeCompletedStatus, setCompletedStatus, addNewTask}) => {

    const [showSubtasks, setShowSubtasks] = useState(false)

    const [createSubtasksMode, changeCreateSubtasksMode] = useState(false)

    const subtasksFind = subtasksId?.length ? 
        subtasksId.map(subtaskId => {
            for(let i = 0; i <= subtasks.length; i++){
                if(subtasks[i] && subtasks[i].id === subtaskId){
                    return subtasks[i]
                }
            }
        })
        : []


    const subtasksGenerate = subtasksFind.map(subtask => {
        if(subtask && subtask.subsubtasksId && subtask.subsubtasksId.length){
            return <TaskSubitemContainer key={subtask.id} id={subtask.id} text={subtask.text} subsubtasksId={subtask.subsubtasksId} deleteTask={deleteTask} changeCompletedStatus={changeCompletedStatus} />
        }else{
            return subtask && <TaskWithoutSub key={subtask.id} id={subtask.id} completed={subtask.completed} text={subtask.text} deleteTask={deleteTask} changeCompletedStatus={changeCompletedStatus} addNewTask={addNewTask} />
        }
    })

    const isCompleted = subtasksId?.length ? subtasksFind?.every(subtask => subtask && subtask.completed) : completed

    useEffect(() => {
            setCompletedStatus(id, isCompleted, 0)
    }, [isCompleted])

    return <TaskItem
        id={id}
        text={text} 
        completed={completed} 
        subsubtasksId={subtasksId} 
        showSubtasks={showSubtasks} 
        setShowSubtasks={setShowSubtasks}
        isCompleted={isCompleted}
        subtasksGenerate={subtasksGenerate}
        deleteTask={deleteTask}
        changeCompletedStatus={changeCompletedStatus}
        addNewTask={addNewTask}
        createSubtasksMode={createSubtasksMode}
        changeCreateSubtasksMode={changeCreateSubtasksMode}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    subtasks: state.tasksReducer.subtasks
})

const mapDispatchToProps = {
    deleteTask: tasksActions.deleteTask,
    changeCompletedStatus: tasksActions.changeCompletedStatus,
    setCompletedStatus: tasksActions.setCompletedStatus,
    addNewTask: tasksActions.addNewTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemContainer)