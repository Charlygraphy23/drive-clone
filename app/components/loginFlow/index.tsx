"use client"

import { useState } from 'react';
import EmailPassword from './components/emailPassword';
import EmailSendSuccess from './components/emailSendSuccess';
import ForgotPassword from './components/forgotPassword';
import { LoginFlowState } from './interfaces/index.interface';
import style from './style.module.scss';


const LoginFlow = () => {
    const [activePage, setActivePage] = useState(0);
    const [state, setState] = useState<LoginFlowState>({} as LoginFlowState)

    const onNext = () => {
        setActivePage(prev => prev + 1)
    }

    const goBack = (number: number) => {
        setActivePage(prev => {

            if (typeof number === 'number') {
                return number
            }

            return prev <= 0 ? 0 : --prev
        })
    }

    const clearState = () => {
        setState({} as LoginFlowState)
    }

    return (

        <div className={style.loginFlow}>
            <EmailPassword goBack={goBack} index={0} onNext={onNext} active={activePage} title='Login' rememberMe submitText='Login' setState={setState} value={state} />
            <ForgotPassword goBack={goBack} index={1} onNext={onNext} active={activePage} title='Forgot Password' submitText='Submit' setState={setState} value={state} />
            <EmailSendSuccess index={2} goBack={goBack} active={activePage} submitText='Back to Login' onClear={clearState} />
        </div>
    )
}

export default LoginFlow