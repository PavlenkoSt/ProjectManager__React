import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC } from "react"
import { connect } from "react-redux"
import isUniqueProjectName from "../../../heplers/isUniqueProjectName"
import { projectsActions, ProjectType } from "../../../Redux/projectsReducer"
import { AppStateType } from "../../../Redux/reduxStore"
import s from './addNewProjForm.module.css'

type MapDispatchPropsType = {
    addNewProj: (name: string, core: string, desc: string) => void
}

type MapStatePropsType = {
    projects: Array<ProjectType>
}

const AddNewProjForm: FC<MapDispatchPropsType & MapStatePropsType> = ({ addNewProj, projects }) => {
    return (
        <Formik
            initialValues={{ name: '', title: '', desc: '' }}
            validate={values => {
                const errors: any = {};
                if (!values.name) {
                    errors.name = '* Это поле не может быть пустым';
                }
                if(!isUniqueProjectName(projects, values.name)){
                    errors.name = '* Проект с таким именем уже существует';
                }
                if (!values.title) {
                    errors.title = '* Это поле не может быть пустым';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                addNewProj(values.name, values.title, values.desc)
            }}
        >
        {({ isSubmitting, errors, touched }) => (
            <Form className={s.form} >
                <div  className={s.item}>
                    <label htmlFor='title' >Заголовок / Суть:</label>
                    <Field type="text" name="title" id='title' autoComplete='off' className={`${s.input} ${errors.title && touched.title ? s.errInp : ''}`} />
                    <ErrorMessage className={s.err} name="title" component="div"  />
                </div>
                <div className={s.item}>
                    <label htmlFor='name'>Название:</label>
                    <Field type="text" name="name" id='name' autoComplete='off' className={`${s.input} ${errors.name && touched.name ? s.errInp : ''}`} />
                    <ErrorMessage className={s.err} name="name" component="div"  />
                </div>
                <div  className={s.item}>
                    <label htmlFor='desc'>Описание:</label>
                    <Field name="desc" autoComplete='off' id='desc' component='textarea' className={s.textarea} />
                </div>

                <button className={s.btn} type="submit" disabled={isSubmitting}>Сохранить и перейти в проект</button>
            </Form>
        )}
        </Formik>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    projects: state.projectsReducer.projects
})
const mapDispatchToProps = {
    addNewProj: projectsActions.addNewProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProjForm)