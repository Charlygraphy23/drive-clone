"use client"

import { useDispatch } from 'react-redux'
import { pushNotification } from '../store/actions'
import { NotificationType } from '../store/reducers/notification.reducer'

const useNotification = () => {
    const dispatch = useDispatch()

    function sendNotification(message: string | undefined, type: NotificationType = NotificationType.SUCCESS) {
        dispatch(pushNotification({
            message, type
        }))
    }

    return { sendNotification }
}

export default useNotification