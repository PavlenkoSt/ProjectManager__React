import Card from "./Card/Card"
import ProjectList from "./Card/ProjectList/ProjectList"
import s from './cards.module.css'

const Cards = () => {
    return (
        <div className={s.container}>
            <Card title='Добавить новый проект'>

            </Card>
            <Card title='Активные проекты'>
                <ProjectList allMode={false} />
            </Card>
            <Card title='Все проекты'>
                <ProjectList allMode={true} />
            </Card>
        </div>
    )
}

export default Cards