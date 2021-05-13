import { FC } from 'react'
import s from './card.module.css'

type CardPropsType = {
    title: string
}

const Card: FC<CardPropsType> = ({ children, title }) => {
    return (
        <div className={s.card}>
            <h2 className={s.header}>{ title }</h2>
            <div className={s.body}>
                { children }
            </div>
        </div>
    )
}

export default Card