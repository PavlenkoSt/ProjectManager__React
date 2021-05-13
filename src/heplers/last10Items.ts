import { ProjectType } from "../Redux/projectsReducer"

const last10Items = (arr: Array<ProjectType>) => {
    const resultArr: Array<ProjectType> = []
    for(let i = 0; i <10; i++){
        if(arr[i]){
            resultArr.push(arr[i])
        }else break
    }
    return resultArr.reverse()
}

export default last10Items