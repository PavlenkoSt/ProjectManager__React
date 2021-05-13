import { FC, useState } from "react"
import { connect } from "react-redux"
import { AppStateType } from "../../../../../Redux/reduxStore"
import SubTaskItem from "./SubTaskItem/SubTaskItem"
import s from './taskSubitem.module.css'


type TaskSubitemPropsType = {
    text: string
    subtasksId: Array<number>
}

type MapStatePropsType = {
    subsubtasks: any
}

const TaskSubitem: FC<TaskSubitemPropsType & MapStatePropsType> = ({ text, subtasksId, subsubtasks }) => {

    const [showTask, setShowTask] = useState(false)

    const subtasksElems = subtasksId.map((subtaskId: any) => {
        for(let i = 0; i <= subsubtasks.length; i++){
            if(subtaskId === subsubtasks[i].id){
                return subsubtasks[i]
            }
        }
    })

    const subtasksGenerate = subtasksElems.map((subsubtask: any) => <SubTaskItem key={subsubtask.id} completed={subsubtask.completed} text={subsubtask.text} /> )

    const isCompleted = subtasksElems.every(subsubtask => subsubtask.completed)

    return (
        <div className={`${s.subitem} ${showTask ? s.show : ''}`}> 
            <div className={s.innerTrigger}>
                <div className={s.trigger} onClick={() => setShowTask(!showTask)} style={isCompleted ? {textDecoration: 'line-through'} : {}} >- {text}</div>
                <div className={s.optionsBar}>
                    <button title='Добавить подзадачу' className={s.addSubtaskbtn}></button>
                    <button title='Удалить' className={s.delete}></button>
                </div>
            </div> 
            <div className={s.body}>{showTask ? subtasksGenerate : ''}</div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    subsubtasks: state.tasksReducer.subsubtasks
})

export default connect(mapStateToProps)(TaskSubitem)