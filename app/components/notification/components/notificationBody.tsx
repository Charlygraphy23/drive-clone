"use client"

import { clearNotificationByIndex } from '@/app/store/actions'
import { NotificationDataType, NotificationType } from '@/app/store/reducers/notification.reducer'
import { useDispatch } from 'react-redux'
import style from '../style.module.scss'


type Props = {
    data: NotificationDataType,
    index: number
}

const NotificationBody = ({ data, index }: Props) => {
    const dispatch = useDispatch()

    const getNotificationColor = (type: NotificationType) => {
        switch (type) {
            case NotificationType.SUCCESS: return style[NotificationType.SUCCESS];
            case NotificationType.ERROR: return style[NotificationType.ERROR];
            case NotificationType.WARNING: return style[NotificationType.WARNING];
            default: return style[NotificationType.SUCCESS];
        }
    }

    const handleClose = () => {
        dispatch(clearNotificationByIndex(index))
    }

    return (
        <div className={`${style.body} ${getNotificationColor(data?.type)}`}>
            <button className={style.close} onClick={handleClose}>
                <i className="bi bi-x"></i>
            </button>
            NotificationBody
        </div>
    )
}

export default NotificationBody