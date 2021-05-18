import { ErrorMessage, Field, Form, Formik } from "formik"
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import s from './addNewTaskForm.module.css'


type AddNewTaskFormPropType = {
    addSubtask: (task: string) => void
    changeCreateSubtasksMode: Dispatch<SetStateAction<boolean>>
    setShowSubtasks?: Dispatch<SetStateAction<boolean>>
}

const AddNewTaskForm: FC<AddNewTaskFormPropType> = ({ addSubtask, changeCreateSubtasksMode, setShowSubtasks }) => {

    useEffect(() => {
        const input = document.querySelector('.addNewTaskForm_input__3EOqx')
        if(input){
            //@ts-ignore
            input.focus()
        }
    }, [])

    return (
        <Formik
            initialValues={{ task: '' }}
            validate={values => {
                const errors: any = {};
                if (!values.task) {
                    errors.task = '* Это поле не может быть пустым';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                if(setShowSubtasks){
                    setShowSubtasks(true)
                }
                addSubtask(values.task)
                setSubmitting(false)
                changeCreateSubtasksMode(false)
            }}
        >
        {({ isSubmitting, errors, touched }) => (
            <Form className={`${s.form} ${touched.task && errors.task ? s.err : ''}`}>
                <Field type="text" name="task" autoComplete='off' className={s.input}/>
                <ErrorMessage name="task" component="div" className={s.errorMess} />
                <button className={`${s.btn} ${s.add}`} type="submit" disabled={isSubmitting}></button>
                <button className={`${s.btn} ${s.close}`} onClick={() => changeCreateSubtasksMode(false)} type="reset" disabled={isSubmitting}></button>
            </Form>
        )}
        </Formik>
    )
}

export default AddNewTaskForm