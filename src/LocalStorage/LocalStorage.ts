export const projectsLS = 'projects'
export const tasksLS = 'tasks'
export const subtasksLS = 'subtasks'
export const subsubtasksLS = 'subsubtasks'

const LocalStorage = {
    set(name: string, data: any){
        const stringifyData = JSON.stringify(data)
        localStorage.setItem(name, stringifyData)
    },
    get(name: string){
        const data = localStorage.getItem(name)
        if(data){
            return JSON.parse(data)
        }
    }
}

export default LocalStorage