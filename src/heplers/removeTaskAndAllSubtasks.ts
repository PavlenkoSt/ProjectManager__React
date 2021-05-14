import { TaskType } from "../Redux/tasksReducer"

const removeTaskAndAllSubtasks = (tasks: Array<any>, removeId: number, subtasks: any, subsubtasks: any = null) => {
    const filteredTasks = tasks.filter(task => task.id === removeId) || subtasks.filter((task: any) => task.id === removeId)
    const subtasksId = filteredTasks[0].subtasksId || filteredTasks[0].subsubtasksId
    const targetSubtasks = (subtasksId && subtasks.filter((subtask: any) => subtasksId.indexOf(subtask.id) !== -1)) || [] 
    
    const allSubSubId: Array<number> = []
    if(targetSubtasks.length){
        targetSubtasks.forEach((subtask: any) => {
            if(subtask.subsubtasksId && subtask.subsubtasksId.length){
                allSubSubId.push( ...subtask.subsubtasksId )
            }
        });
    }

    const newSubSubTasks = allSubSubId.length ? subsubtasks.filter((subsubtask: any) => allSubSubId.indexOf(subsubtask.id) === -1) : subsubtasks
    const newSubtasks = subtasksId && subtasksId.length ? subtasks.filter((subtask: any) => subtasksId.indexOf(subtask.id) === -1) : subtasks
    const newTasks = tasks.filter(task => task.id !== removeId)

    return {
        newTasks,
        newSubtasks,
        newSubSubTasks
    }
    
}


export default removeTaskAndAllSubtasks