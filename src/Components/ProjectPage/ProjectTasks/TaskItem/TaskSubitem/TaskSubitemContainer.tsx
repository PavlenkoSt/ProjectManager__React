import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../../Redux/reduxStore"
import { tasksActions } from "../../../../../Redux/tasksReducer"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import TaskSubitem from "./TaskSubitem"

type TaskSubitemContainerPropsType = {
    id: number
    text: string
    subsubtasksId: Array<number>
    order: number
    completed: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
    dragStartOrder: number
    setDragStartOrder: Dispatch<SetStateAction<number>>
    dragStartId: number
    setDragStartId: Dispatch<SetStateAction<number>>
}

type MapStatePropsType = {
    subsubtasks: any
}

type MapDispatchPropsType = {
    setCompletedStatus: (id: number, status: boolean, level: number) => void
    addNewTask: (task: string, level: number, idTask: number | null) => void 
    changeTaskOrder: (id: number, order: number, level: number) => void
}

const TaskSubitemContainer: FC<TaskSubitemContainerPropsType & MapStatePropsType & MapDispatchPropsType> = ({ id, text, order, subsubtasksId, completed, subsubtasks, deleteTask, changeCompletedStatus, setCompletedStatus, addNewTask, changeTaskOrder, dragStartOrder, setDragStartOrder, dragStartId, setDragStartId }) => {
    const [showTask, setShowTask] = useState(false)

    const [createSubtasksMode, changeCreateSubtasksMode] = useState(false)

    const addSubtaskFromLevel1 = (task: string) => {
        addNewTask(task, 1, id)
    }

    const addSubtaskHandler = () => {
        setShowTask(true)
        changeCreateSubtasksMode(true)
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 1)
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

    // ============ drag and drop =============

    const dragStartHandler = (e: any) => {
        setDragStartId(id)
        setDragStartOrder(order)
        e.target.style.opacity = '0.5'
    }

    const dragEndHandler = (e: any) => {
        e.target.style.opacity = '1'
        if(e.target.classList.contains('taskSubitem_dragOver__1gUGU')){
            e.target.classList.remove('taskSubitem_dragOver__1gUGU')
        }else{
            const childsArr = document.querySelectorAll('.taskSubitem_dragOver__1gUGU')
            if(childsArr.length){
                childsArr.forEach(child => child.classList.remove('taskSubitem_dragOver__1gUGU'))
            }
        }
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault()
        if(e.target.classList.contains('taskSubitem_trigger__3h9-7')){
            e.target.classList.add('taskSubitem_dragOver__1gUGU')
        }
        
    }

    const dropHandler = (e: any) => {
        e.preventDefault()
        changeTaskOrder(dragStartId, order, 1)
        changeTaskOrder(id, dragStartOrder, 1)
        console.log(id, order);
        // console.log(dragStartId, order);
        // console.log(id, dragStartOrder);
    }

    return <TaskSubitem 
        text={text} 
        completed={completed}
        isCompleted={isCompleted} 
        showTask={showTask}
        subtasksGenerate={subtasksGenerate}
        addSubtaskHandler={addSubtaskHandler}
        removeSubitem={removeSubitem}
        addSubtaskFromLevel1={addSubtaskFromLevel1}
        changeCreateSubtasksMode={changeCreateSubtasksMode}
        setShowTask={setShowTask}
        createSubtasksMode={createSubtasksMode}
        dragStartHandler={dragStartHandler}
        dragEndHandler={dragEndHandler}
        dragOverHandler={dragOverHandler}
        dropHandler={dropHandler}
        toggleCompletedStatus={toggleCompletedStatus}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    subsubtasks: state.tasksReducer.subsubtasks
})

const mapDispatchToProps = {
    setCompletedStatus: tasksActions.setCompletedStatus,
    addNewTask: tasksActions.addNewTask,
    changeTaskOrder: tasksActions.changeTaskOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSubitemContainer)