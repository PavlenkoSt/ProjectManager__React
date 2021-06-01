import { ErrorMessage, Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import constructLinkFromProjectName from "../../../heplers/constructLinkFromProjectName"
import isUniqueProjectName from "../../../heplers/isUniqueProjectName"
import { projectsActions } from "../../../Redux/projectsReducer"
import { projectsSelector } from "../../../Redux/selectors/projectsSelectors"
import s from './addNewProjForm.module.css'

type ErrorsType = {
    name?: string
    title?: string
}

const AddNewProjForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const projects = useSelector(projectsSelector)

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
                dispatch(projectsActions.addNewProject(values.name, values.title, values.desc))
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

export default AddNewProjForm