import StepFormChatUI from './components/formChatUI'
import StepFormUI from './components/formUI'
import style from './style.module.scss'


const StepForm = () => {
    return (
        <div className={style.stepForm}>
            <StepFormUI />
            <StepFormChatUI />
        </div>
    )
}

export default StepForm