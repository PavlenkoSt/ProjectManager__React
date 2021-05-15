import Card from "./Card/Card"
import ProjectList from "./Card/ProjectList/ProjectList"
import s from './cards.module.css'

const Cards = () => {
    return (
        <div className={s.container}>
            <Card title='Добавить новый проект' addProject={true}>

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