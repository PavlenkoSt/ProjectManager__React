const changeCompletedTaskStatus = (tasks: any, id: number) => {
    return [ ...tasks.map((task: any) => {
        if(task.id === id){
            task.completed = !task.completed
        }
        return task
    }) ]
}


export default changeCompletedTaskStatus