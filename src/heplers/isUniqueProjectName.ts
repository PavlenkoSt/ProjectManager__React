import { ProjectType } from './../Redux/projectsReducer'

const isUniqueProjectName = (allProhects: Array<ProjectType>, projectName: string) => {
    let isUnique = true
    allProhects.forEach(project => {
        if(project.name === projectName){
            isUnique = false
        }
    })
    return isUnique
}

export default isUniqueProjectName