import { FC } from 'react';
import s from './allProjFilter.module.css'

type AllProjFilterPropsType = {
    filterOption: string
    changeFilterOption: (filterOption: string) => void
}

const AllProjFilter: FC<AllProjFilterPropsType> = ({ filterOption, changeFilterOption }) => {

    const onChange = (e: any) => {
        changeFilterOption(e.target.value)
    }

    return (
        <div className={s.item}>
            <div>
                <div className={s.optionItem}>
                    <input onChange={onChange} defaultChecked={filterOption === 'all'} type="radio" name="filter" value="all" id="all" className={s.input}/>
                    <label htmlFor="all" className={s.optionLabel}><span>Все</span></label>
                </div> 
                <div className={s.optionItem}>
                    <input onChange={onChange} defaultChecked={filterOption === 'completed'} type="radio" name="filter" value="completed" id="completed" className={s.input}/>
                    <label htmlFor="completed" className={s.optionLabel}><span>Завершенные</span></label>
                </div>
                <div className={s.optionItem}>
                    <input onChange={onChange} defaultChecked={filterOption === 'notCompleted'} type="radio" name="filter" value="notCompleted" id="notCompleted" className={s.input}/>
                    <label htmlFor="notCompleted" className={s.optionLabel}><span>Незавершенные</span></label>
                </div>
            </div>
        </div>
    )
}

export default AllProjFilter