import { FC, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../Redux/reduxStore"
import TaskItem from "./TaskItem"
import TaskSubitem from "./TaskSubitem/TaskSubitem"
import TaskWithoutSub from "./TaskWithoutSub/TaskWithoutSub"

type TaskItemContainerPropsType = {
    text: string
    subtasksId?: Array<number>
    completed: boolean
}

type MapStatePropType = {
    subtasks: any
}

const TaskItemContainer: FC<TaskItemContainerPropsType & MapStatePropType> = ({text, subtasksId, completed, subtasks}) => {

    const [showSubtasks, setShowSubtasks] = useState(false)

    const subtasksFind = subtasksId?.length ? 
        subtasksId.map(subtaskId => {
            for(let i = 0; i<= subtasks.length; i++){
                if(subtasks[i].id === subtaskId){
                    return subtasks[i]
                }
            }
        })
        : []

    const subtasksGenerate = subtasksFind.map(subtask => {
        if(subtask.subtasksId && subtask.subtasksId.length){
            return <TaskSubitem key={subtask.id} text={subtask.text} subtasksId={subtask.subtasksId}/>
        }else{
            return <TaskWithoutSub key={subtask.id} completed={subtask.completed} text={subtask.text} />
        }
    })

    const isCompleted = subtasksId?.length ? subtasksFind?.every(subtask => subtask.completed) : completed

    return <TaskItem 
        text={text} 
        completed={completed} 
        subtasksId={subtasksId} 
        showSubtasks={showSubtasks} 
        setShowSubtasks={setShowSubtasks}
        isCompleted={isCompleted}
        subtasksGenerate={subtasksGenerate}
    />
}

const mapStateToProps = (state: AppStateType) => ({
    subtasks: state.tasksReducer.subtasks
})

export default connect(mapStateToProps)(TaskItemContainer)