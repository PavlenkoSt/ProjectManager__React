import { NavLink } from "react-router-dom"
import Card from "./Card/Card"
import ProjectList from "./Card/ProjectList/ProjectList"
import s from './cards.module.scss'
import plus from '../../../assets/icons/plus-for-card.svg'

const Cards = () => {
    return (
        <div className={s.container}>
            <Card title='Добавить новый проект' addProject={true}>
                <NavLink to='/add-new-project'>
                    <img className={s.img} src={plus} alt='add'/>
                </NavLink>
            </Card>
            <Card title='Последние активные проекты' addProject={false}>
                <ProjectList allMode={false} />
            </Card>
            <Card title='Последние проекты' addProject={false}>
                <ProjectList allMode={true} />
            </Card>
        </div>
    )
}

export default Cards