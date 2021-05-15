const getAllSubtasksId = (tasksArr: Array<any>) => {
    const result: Array<number> = []
    tasksArr.forEach(task => {
        if(task.subtasksId && task.subtasksId.length){
            result.push(...task.subtasksId)
        }
        if(task.subsubtasksId && task.subsubtasksId.length){
            result.push(...task.subsubtasksId)
        }
    })
    return result
}

const getSubTasksFromTasks = (tasksArr: Array<any>, subtaskArr: Array<any>) => {
    const subtasksId = getAllSubtasksId(tasksArr)
    const targetSubtasks = subtaskArr.filter(subtask => subtasksId.indexOf(subtask.id) !== -1)
    return targetSubtasks
}

export default getSubTasksFromTasks