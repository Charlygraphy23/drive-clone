"use client"

import useDeviceWidth from '@/app/hooks/useWidth'
import { useAppDispatch } from '@/app/store'
import { toggleSidebar } from '@/app/store/actions/config.action'

const Hamburger = () => {
    const { isTablet } = useDeviceWidth()
    const stateDispatch = useAppDispatch()
    return (
        <>{isTablet && <i id="sidebar-toggle" className="bi bi-list" onClick={() => stateDispatch(toggleSidebar())}></i> || null}</>
    )
}

export default Hamburger