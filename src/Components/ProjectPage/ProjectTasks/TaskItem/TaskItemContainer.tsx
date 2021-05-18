import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../Redux/reduxStore"
import { tasksActions } from "../../../../Redux/tasksReducer"
import TaskItem from "./TaskItem"
import TaskSubitemContainer from "./TaskSubitem/TaskSubitemContainer"

type TaskItemContainerPropsType = {
    text: string
    subtasksId?: Array<number>
    completed: boolean
    id: number
    order: number
    dragStartOrder: number
    setDragStartOrder: Dispatch<SetStateAction<number>>
    dragStartId: number
    setDragStartId: Dispatch<SetStateAction<number>>
    sortTasks: (a: any, b: any) => number
}

type MapStatePropsType = {
    subtasks: any
}

type MapDispatchPropsType = {
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    setCompletedStatus: (id: number, status: boolean, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void
    changeTaskOrder: (id: number, order: number, level: number) => void
    saveLastIdAndOrder: (id: number, order: number) => void
}


const TaskItemContainer: FC<TaskItemContainerPropsType & MapStatePropsType & MapDispatchPropsType> = ({id, text, order, subtasksId, completed, subtasks, deleteTask, changeCompletedStatus, setCompletedStatus, addNewTask, changeTaskOrder , dragStartOrder, setDragStartOrder, dragStartId, setDragStartId, sortTasks, saveLastIdAndOrder}) => {

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

    const subtasksGenerate = subtasksFind
        .sort(sortTasks)
        .map(subtask => {
        if(subtask && subtask.subsubtasksId){
            return <TaskSubitemContainer 
                key={subtask.id} 
                id={subtask.id} 
                order={subtask.order} 
                text={subtask.text} 
                completed={subtask.completed}
                subsubtasksId={subtask.subsubtasksId} 
                deleteTask={deleteTask} 
                changeCompletedStatus={changeCompletedStatus}
                dragStartOrder={dragStartOrder}
                setDragStartOrder={setDragStartOrder}
                dragStartId={dragStartId}
                setDragStartId={setDragStartId}
            />
        }
    })

    const isCompleted = subtasksId?.length ? subtasksFind?.every(subtask => subtask && subtask.completed) : completed

    useEffect(() => {
            setCompletedStatus(id, isCompleted, 0)
    }, [isCompleted])

    // ============ drag and drop ===============

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
        changeTaskOrder(dragStartId, order, 0)
        changeTaskOrder(id, dragStartOrder, 0)
        
    }

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
        changeTaskOrder={changeTaskOrder}
        dragStartHandler={dragStartHandler}
        dragEndHandler={dragEndHandler}
        dragOverHandler={dragOverHandler}
        dropHandler={dropHandler}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    subtasks: state.tasksReducer.subtasks
})

const mapDispatchToProps = {
    deleteTask: tasksActions.deleteTask,
    changeCompletedStatus: tasksActions.changeCompletedStatus,
    setCompletedStatus: tasksActions.setCompletedStatus,
    addNewTask: tasksActions.addNewTask,
    changeTaskOrder: tasksActions.changeTaskOrder,
    saveLastIdAndOrder: tasksActions.saveLastIdAndOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemContainer)