const removeSubtaskNum = (tasks: any, id: number) => {
    return tasks.map((task: any) => {
        if(task.subtasksId && task.subtasksId.indexOf(id) !== -1){
            task.subtasksId = task.subtasksId.filter((subtaskId: any) => subtaskId !== id)
        }
        if(task.subsubtasksId && task.subsubtasksId.indexOf(id) !== -1){
            task.subsubtasksId = task.subsubtasksId.filter((subsubtaskId: any) => subsubtaskId !== id)
        }
        return task
    })
}

export default removeSubtaskNum