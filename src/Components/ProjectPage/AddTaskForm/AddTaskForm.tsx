import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import s from './addTaskForm.module.css'
import s2 from '../../common/AddNewTaskForm/addNewTaskForm.module.css'
import { tasksActions } from "../../../Redux/tasksReducer"
import { connect } from "react-redux"
import { AppStateType } from "../../../Redux/reduxStore"
import { toast } from "react-toastify"

type MapDispatchPropsType = {   
    addNewTask: (task: string, level: number, idTask: number | null, projectId?: number) => void
}

type AddTaskFormPropsType = {
    projectId: number
}

type ErrorsType = {
    newTask?: string
}

const AddTaskForm: FC<AddTaskFormPropsType & MapDispatchPropsType> = ({ addNewTask, projectId }) => {

    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        const input = document.querySelector('.addNewTaskForm_input__3EOqx')
        if(input){
            //@ts-ignore
            input.focus()
        }
    }, [openForm])

    return (
        <div className={s.container}>
            
            { openForm ? (
                <Formik
                    initialValues={{ newTask: '' }}
                    validate={values => {
                        const errors: ErrorsType = {};
                        if (!values.newTask) {
                            errors.newTask = '* Это поле не может быть пустым';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        addNewTask(values.newTask, -1, null, projectId)
                        toast.dark("Задача успешно добавлена!", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
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

const mapStateToProps = (state: AppStateType) => ({})

const mapDispatchToProps = {
    addNewTask: tasksActions.addNewTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)