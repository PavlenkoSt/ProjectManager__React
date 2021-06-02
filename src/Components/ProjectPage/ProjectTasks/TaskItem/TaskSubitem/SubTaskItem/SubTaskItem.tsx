import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { tasksActions } from '../../../../../../Redux/tasksReducer'
import s from './subTaskItem.module.scss'

type SubTaskItemPropsType = {
    id: number
    text: string
    completed: boolean
}

const SubTaskItem: FC<SubTaskItemPropsType> = ({id,  text, completed }) => {
    const dispatch = useDispatch()

    const removeSubtaskItem = () => {
        dispatch(tasksActions.deleteTask(id, 2, null))
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
        dispatch(tasksActions.changeCompletedStatus(id, 2))
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