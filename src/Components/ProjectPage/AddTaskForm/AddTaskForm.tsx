import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC, useState } from "react"
import s from './addTaskForm.module.css'
import s2 from '../../common/AddNewTaskForm/addNewTaskForm.module.css'
import { tasksActions } from "../../../Redux/tasksReducer"
import { connect } from "react-redux"
import { AppStateType } from "../../../Redux/reduxStore"

type MapDispatchPropsType = {   
    addNewTask: (task: string, level: number, idTask: number | null) => void
}

const AddTaskForm: FC<MapDispatchPropsType> = ({ addNewTask }) => {

    const [openForm, setOpenForm] = useState(false)

    return (
        <div className={s.container}>
            
            { openForm ? (
                <Formik
                    initialValues={{ newTask: '' }}
                    validate={values => {
                        const errors: any = {};
                        if (!values.newTask) {
                            errors.newTask = '* Это поле не может быть пустым';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        addNewTask(values.newTask, -1, null)
                        setOpenForm(false)
                        setSubmitting(false)
                    }}
                >
                {({ isSubmitting, errors, touched }) => (
                    <Form className={`${s2.form} ${touched.newTask && errors.newTask ? s2.err : ''}`}>
                        <Field type="text" name="newTask" autoComplete='off' className={s2.input}/>
                        <ErrorMessage name="newTask" component="div" className={s2.errorMess} />
                        <button className={`${s2.btn} ${s2.add}`} type="submit" disabled={isSubmitting}></button>
                        <button className={`${s2.btn} ${s2.close}`} onClick={() => setOpenForm(false)} type="reset" disabled={isSubmitting}></button>
                    </Form>
                )}
                </Formik>
            ) : (
                <div className={s.togglerInner}>
                    - <button className={s.toggler} onClick={() => setOpenForm(true)} ></button>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {

}

const mapDispatchToProps = {
    addNewTask: tasksActions.addNewTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)