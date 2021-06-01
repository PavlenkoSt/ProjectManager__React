import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { subtasksSelector } from "../../../../Redux/selectors/tasksSelector"
import { tasksActions } from "../../../../Redux/tasksReducer"
import TaskItem from "./TaskItem"
import TaskSubitem from "./TaskSubitem/TaskSubitem"

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
}

const TaskItemContainer: FC<TaskItemContainerPropsType> = ({id, text, order, subtasksId, completed, dragStartOrder, setDragStartOrder, dragStartId, setDragStartId}) => {
    const dispatch = useDispatch()
    const subtasks = useSelector(subtasksSelector)

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
        .map(subtask => {
        if(subtask && subtask.subsubtasksId){
            return <TaskSubitem 
                key={subtask.id} 
                id={subtask.id} 
                text={subtask.text} 
                completed={subtask.completed}
                subsubtasksId={subtask.subsubtasksId} 
            />
        }
    })

    const isCompleted = subtasksId?.length ? subtasksFind?.every(subtask => subtask && subtask.completed) : completed

    useEffect(() => {
        dispatch(tasksActions.setCompletedStatus(id, isCompleted, 0))
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
        dispatch(tasksActions.changeTaskOrder(dragStartId, order))
        dispatch(tasksActions.changeTaskOrder(id, dragStartOrder))
        
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
        createSubtasksMode={createSubtasksMode}
        changeCreateSubtasksMode={changeCreateSubtasksMode}
        dragStartHandler={dragStartHandler}
        dragEndHandler={dragEndHandler}
        dragOverHandler={dragOverHandler}
        dropHandler={dropHandler}
    />
}

export default TaskItemContainer