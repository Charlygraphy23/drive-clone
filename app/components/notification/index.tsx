"use client"

import { RootState } from "@/app/store"
import { NotificationStateType } from "@/app/store/reducers/notification.reducer"
import { useSelector } from "react-redux"
import NotificationContainer from "./components/notificationContainer"

const Notifications = () => {

    const { notifications } = useSelector<RootState, NotificationStateType>(state => state.notification)
    return (

        <>{notifications.length && <NotificationContainer /> || null}</>
    )
}

export default Notifications