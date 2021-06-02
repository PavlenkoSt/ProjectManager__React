import { ErrorMessage, Field, Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import s from './addTaskForm.module.scss'
import s2 from '../../common/AddNewTaskForm/addNewTaskForm.module.scss'
import { tasksActions } from "../../../Redux/tasksReducer"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

type AddTaskFormPropsType = {
    projectId: number
}

type ErrorsType = {
    newTask?: string
}

const AddTaskForm: FC<AddTaskFormPropsType> = ({ projectId }) => {
    const dispatch = useDispatch()
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
                        dispatch(tasksActions.addNewTask(values.newTask, -1, null, projectId))
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

export default AddTaskForm