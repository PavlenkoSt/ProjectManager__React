import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router"
import { toast } from "react-toastify"
import constructLinkFromProjectName from "../../../heplers/constructLinkFromProjectName"
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

type ErrorsType = {
    name?: string,
    title?: string
}

const AddNewProjForm: FC<MapDispatchPropsType & MapStatePropsType & RouteComponentProps> = ({ addNewProj, projects, history }) => {
    return (
        <Formik
            initialValues={{ name: '', title: '', desc: '' }}
            validate={values => {
                const errors: ErrorsType = {};
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
                setSubmitting(false)
                toast.dark("Проект успешно добавлен!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                history.push(`${constructLinkFromProjectName(values.title)}-${constructLinkFromProjectName(values.name)}`)                
            }}
        >
        {({ isSubmitting, errors, touched }) => (
            <Form className={s.form} >
                <div  className={s.item}>
                    <label htmlFor='title' >Заголовок / Суть:</label>
                    <Field type="text" name="title" id='title' autoComplete='off' className={`${s.input} ${errors.title && touched.title ? s.errInp : ''}`} />
                    <ErrorMessage className={s.err} name="title" component="div"/>
                </div>
                <div className={s.item}>
                    <label htmlFor='name'>Название:</label>
                    <Field type="text" name="name" id='name' autoComplete='off' className={`${s.input} ${errors.name && touched.name ? s.errInp : ''}`} />
                    <ErrorMessage className={s.err} name="name" component="div"/>
                </div>
                <div  className={s.item}>
                    <label htmlFor='desc'>Описание:</label>
                    <Field name="desc" autoComplete='off' id='desc' component='textarea' className={s.textarea}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewProjForm))