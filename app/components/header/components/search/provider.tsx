"use client"

import Modal from '@/app/components/modal';
import { SEARCH_MODAL } from '@/app/config/const';
import { PropsWithChildren, useState } from 'react';
import SearchStateProvider from './store/provider';
import style from './style.module.scss';

const SearchProvider = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <SearchStateProvider>
            <button onClick={toggleModal}>
                <i className='bi bi-search'></i>
                <p>Search File..</p>
            </button>
            <Modal centered={false} isOpen={isOpen} id={SEARCH_MODAL} size="xl">
                <Modal.ButtonClose className={style.modalClose} />
                {children}
            </Modal>
        </SearchStateProvider>
    )
}

export default SearchProvider