import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './card.module.scss'

type CardPropsType = {
    title: string
    addProject: boolean
}

const Card: FC<CardPropsType> = ({ children, title, addProject }) => {
    return (
        <div className={s.card}>
            <h2 className={s.header}>{ title }</h2>
            <div className={s.body}>
                { children }
            </div>
            { !addProject && (
                <div>
                    <NavLink className={s.showAllLink} to='/all-projects'>Показать все...</NavLink>
                </div> 
            )}
        </div>
    )
}

export default Card