type allTaskObjType = {
    tasks: Array<any>
    subtasks: Array<any>
    subsubtasks: Array<any>
}

const taskLevel = (allTaskObj: allTaskObjType, projectId: number ) => {
    let taskCompletedPoin = 0

    const taskNotCompletedPoint: Array<any> = []
    const tasksLength = allTaskObj.tasks.length
    const oneCompletedTaskProcent = tasksLength ? (100 / tasksLength) : 0  

    allTaskObj.tasks
        .filter(task => task.forProject === projectId)
        .forEach(task => {
            if(task.completed){
                taskCompletedPoin += 1
            }else{
                if(task.subtasksId.length){
                    const items = allTaskObj.subtasks.filter(subtask => task.subtasksId.indexOf(subtask.id) !== -1 )
                    const ids: Array<number> = []
                    items.forEach(item => ids.push(item.id) )

                    taskNotCompletedPoint.push({ procentForOneItem: oneCompletedTaskProcent / items.length, subTasks: [ ...items ], subTasksId: ids })
                }
            }
        })

    return  {
        procent: oneCompletedTaskProcent * taskCompletedPoin,
        taskNotCompletedPoint
    }
}

const subTaskLevel = (allTaskObj: allTaskObjType, taskNotCompletedPoint: Array<any>) => {
    let subtaskCompletedProcent = 0
    const subtaskNotCompletedPoint: Array<any> = []

    taskNotCompletedPoint.forEach(subtask => {
        subtask.subTasks.forEach((subTask: any) => {
            if(subTask.completed){
                subtaskCompletedProcent += subtask.procentForOneItem
            }else{
                if(subTask.subsubtasksId.length){
                    const items = allTaskObj.subsubtasks.filter(subsubtask => subtask.subTasksId.indexOf(subsubtask.id) !== -1 )
                    subtaskNotCompletedPoint.push({ procentForOneItem: subtask.procentForOneItem / items.length, subTasks: [ ...items ] })
                }
            }
        });
    })
    return {
        procent: subtaskCompletedProcent,
        subtaskNotCompletedPoint
    }
}

const subSubTaksLevel = (subtaskNotCompletedPoint: Array<any>) => {
    let subsubtaskCompletedProcent = 0

    subtaskNotCompletedPoint.forEach(subsubtask => {
        subsubtask.subTasks.forEach((element: any) => {
            if(element.completed){
                subsubtaskCompletedProcent = subsubtaskCompletedProcent + subsubtask.procentForOneItem
            }
        });
    })
    return {
        procent: subsubtaskCompletedProcent
    }
}

const getProcentCompletedProj = (allTaskObj:allTaskObjType, projectId: number ) => {
    let completedProcent: number = 0

    const taskLevelResult = taskLevel(allTaskObj, projectId)
    completedProcent = completedProcent + taskLevelResult.procent

    const subtaskLevelResult = subTaskLevel(allTaskObj, taskLevelResult.taskNotCompletedPoint)
    completedProcent = completedProcent + subtaskLevelResult.procent

    const subSubtaskLevelResult = subSubTaksLevel(subtaskLevelResult.subtaskNotCompletedPoint)
    completedProcent = completedProcent + subSubtaskLevelResult.procent

    return Math.ceil(completedProcent) > 100 ? 100 : Math.ceil(completedProcent)
}

export default getProcentCompletedProj