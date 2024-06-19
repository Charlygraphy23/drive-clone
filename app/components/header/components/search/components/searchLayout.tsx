"use client"

import { SEARCH_MODAL } from "@/app/_config/const"
import Modal, { ButtonClose } from "@/app/components/modal"
import { PropsWithChildren, useContext } from "react"
import { toggleSearchModal } from "../store/actions"
import { SearchContext } from "../store/context"
import style from '../style.module.scss'


const SearchLayout = ({ children }: PropsWithChildren) => {
    const { dispatch, state } = useContext(SearchContext)
    return (
        <>
            <button onClick={() => dispatch(toggleSearchModal())}>
                <i className='bi bi-search'></i>
                <p>Search File..</p>
            </button >
            <Modal centered={false} isOpen={state?.isOpen} id={SEARCH_MODAL} size="xl">
                <ButtonClose className={style.modalClose} onClick={() => dispatch(toggleSearchModal())} />
                {children}
            </Modal>
        </>

    )
}

export default SearchLayout