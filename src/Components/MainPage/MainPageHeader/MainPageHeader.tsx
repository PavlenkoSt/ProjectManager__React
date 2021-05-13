import s from './mainPageHeader.module.css'

const MainPageHeader = () => {
    return (
        <div>
            <h1 className={s.header}>Добро пожаловать в менеджер проектов!</h1>
            <div className={s.info}>
                <p>Данная программа поможет вам управлять своими проектами.</p> 
                <p>Вы сможете составлять пошаговую схему проекта, контролировать прогресс разработки, ставить задачи, а также разбивать их на подзадачи.</p>
                <p>Приятного пользования и хороших проектов!</p>
            </div>
        </div>
    )
}


export default MainPageHeader