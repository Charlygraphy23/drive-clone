"use client"

import { RootState } from '@/app/store'
import { NotificationStateType } from '@/app/store/reducers/notification.reducer'
import { useSelector } from 'react-redux'
import style from '../style.module.scss'
import NotificationBody from './notificationBody'


const NotificationContainer = () => {

    const { notifications = [] } = useSelector<RootState, NotificationStateType>(state => state.notification)

    return (
        <div className={style.container}>
            {notifications?.map((value, index) => <NotificationBody key={index} data={value} index={index} />)}
        </div>
    )
}

export default NotificationContainer