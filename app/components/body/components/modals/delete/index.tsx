import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { DELETE_CONFIRMATION } from '@/app/config/const';
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    moveToTrashAsync,
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { useRouter } from "next/navigation";
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
    const router = useRouter()

    const toggleModal = useCallback((isOpen?: boolean) => {
        dispatch(
            toggleModalState({
                isOpen: !!isOpen,
                name: "deleteModal",
            })
        );

    }, [dispatch]);

    const handleModalSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (loading) return;

        if (!data?.id) return;

        setLoading(true)
        await dispatch(moveToTrashAsync({ id: data?.id }))
        setLoading(false)
        router.refresh()
        toggleModal()
    };

    return (
        <ModalComponent id={DELETE_CONFIRMATION} isOpen={isOpen} toggle={toggleModal}>
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