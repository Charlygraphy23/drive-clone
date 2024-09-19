"use client"

import { SEARCH_MODAL } from "@/app/_config/const"
import Modal, { ButtonClose } from "@/app/components/modal"
import useDeviceWidth from "@/app/hooks/useWidth"
import { useAppDispatch } from "@/app/store"
import { toggleSidebar } from "@/app/store/actions/config.action"
import { PropsWithChildren, useContext } from "react"
import { toggleSearchModal } from "../store/actions"
import { SearchContext } from "../store/context"
import style from '../style.module.scss'


const SearchLayout = ({ children }: PropsWithChildren) => {
    const { dispatch, state } = useContext(SearchContext);
    const { isTablet } = useDeviceWidth()
    const stateDispatch = useAppDispatch()

    return (
        <div className={style.wrapper}>
            {isTablet && <i id="sidebar-toggle" className="bi bi-list" onClick={() => stateDispatch(toggleSidebar())}></i>}
            <button onClick={() => dispatch(toggleSearchModal())}>
                <i className='bi bi-search'></i>
                <p>Search File..</p>
            </button >
            <Modal centered={false} isOpen={state?.isOpen} id={SEARCH_MODAL} size="xl">
                <ButtonClose className={style.modalClose} onClick={() => dispatch(toggleSearchModal())} />
                {children}
            </Modal>
        </div>

    )
}

export default SearchLayout