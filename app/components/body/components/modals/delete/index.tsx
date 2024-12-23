import { DELETE_CONFIRMATION } from '@/app/_config/const';
import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces';
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    moveToTrashFileAsync,
    moveToTrashFolderAsync,
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { FormEvent, useCallback, useState } from "react";
import style from './style.module.scss';

type Props = {
    isOpen: boolean;
    data: ModalDataType;
};


const DeleteConfirmationModal = ({ isOpen }: Props) => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.modals)
    const [loading, setLoading] = useState(false)

    const toggleModal = useCallback((isOpen?: boolean) => {
        dispatch(
            toggleModalState({
                isOpen: !!isOpen,
                name: DELETE_CONFIRMATION,
            })
        );

    }, [dispatch]);

    const handleModalSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (loading) return;

        if (!data?.id) return;

        try {
            setLoading(true)

            if (data?.type === DATA_TYPE.FILE) {
                await dispatch(moveToTrashFileAsync({ id: data?.id })).then(data => {
                    if (data?.meta?.requestStatus === "rejected") return Promise.reject()
                    return data
                })
            }
            else {
                await dispatch(moveToTrashFolderAsync({ id: data?.id })).then(data => {
                    if (data?.meta?.requestStatus === "rejected") return Promise.reject()
                    return data
                })
            }


            setLoading(false)
            toggleModal()
        }
        catch (err) {
            setLoading(false)

        }
    };

    return (
        <ModalComponent id={DELETE_CONFIRMATION} isOpen={isOpen}>
            <form onSubmit={handleModalSubmit} className={style.deleteModal}>
                <h5>
                    <span>Delete <i>{data?.value}</i></span>
                    <ButtonClose />
                </h5>

                <div className={style.body}>
                    {data?.message ?? "Are you sure you want to delete ?"}
                </div>

                <div className='d-flex justify-content-end align-items-center mt-5 mb-2'>

                    <ButtonGroup
                        type='submit'
                        className={`${style.delete} submit`}
                        disabled={loading}
                        submitText={loading ? "Deleting..." : "Delete"}
                    />

                </div>
            </form>
        </ModalComponent>
    )
}

export default DeleteConfirmationModal