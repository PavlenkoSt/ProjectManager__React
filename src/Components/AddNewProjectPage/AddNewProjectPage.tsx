import AddNewProjHeader from "./AddNewProjHeader/AddNewProjHeader"
import s from './addNewProjectPage.module.css'
import AddNewProjForm from "./AddNewProjForm/AddNewProjForm"


const AddNewProjectPage = () => {
    return (
        <div className={s.container}>
            <AddNewProjHeader/>
            <AddNewProjForm/>
        </div>
    )
}

export default AddNewProjectPage