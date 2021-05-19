import { FC } from 'react'
import { toast } from 'react-toastify'
import s from './subTaskItem.module.css'

type SubTaskItemPropsType = {
    id: number
    text: string
    completed: boolean
    deleteTask: (id: number, level: number, subtasksId: Array<number> | null) => void
    changeCompletedStatus: (id: number, level: number) => void
}

const SubTaskItem: FC<SubTaskItemPropsType> = ({id,  text, completed, deleteTask, changeCompletedStatus }) => {

    const removeSubtaskItem = () => {
        deleteTask(id, 2, null)
        toast.dark("Подподзадача успешно удалена!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const toggleCompletedStatus = () => {
        changeCompletedStatus(id, 2)
        toast.dark(completed ? 'Невыполнено!' : 'Выполнено!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <div 
            draggable='true' 
            className={s.subInnerTrigger}
        >
            <div className={s.subtaskItem} style={completed ? {textDecoration: 'line-through'} : {}}>- {text}</div>
            <div className={s.optionsBar}>
                <button title={completed ? 'Отметить как невыполненное' : 'Отметить как выполеннное'} onClick={toggleCompletedStatus} className={`${s.completed} ${completed ? s.done : s.noDone}`}></button>
                <button title='Удалить' onClick={removeSubtaskItem} className={s.delete}></button>
            </div>
        </div>
    )
}

export default SubTaskItem