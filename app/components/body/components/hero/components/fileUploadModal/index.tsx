"use client"

import { FILE_UPLOAD } from "@/app/_config/const";
import ButtonGroup from "@/app/components/buttonGroup";
import FileListItem from "@/app/components/fileListItem";
import ModalComponent from "@/app/components/modal";
import { useAppDispatch } from "@/app/store";
import {
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import React, { useCallback, useState } from "react";
import style from "./style.module.scss";

type Props = {
    isOpen: boolean;
    data: ModalDataType;
};

const FileUploadModal = ({ isOpen }: Props) => {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const dispatch = useAppDispatch();

    const handleFiles = (file?: File | null) => {
        if (file)
            setFiles(prev => {
                const isSameName = prev?.find(f => f?.name === file?.name)
                if (!isSameName) prev.push(file)

                return Array.from(prev)
            })
    }

    const handleDragOver = (event: any) => {
        event.preventDefault();
        setIsDragging(true)
    }

    const toggleModal = useCallback((isOpen?: boolean) => {
        dispatch(
            toggleModalState({
                isOpen: !!isOpen,
                name: "fileUpload",
            })
        );
    }, [dispatch]);

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setIsDragging(false)

        const dropItems = e.dataTransfer.items;
        if (!dropItems?.length) return;

        const items = Array.from(dropItems)

        for (const it of items) {
            const item = it.webkitGetAsEntry()
            if (item?.isFile) {
                const file = it.getAsFile();
                handleFiles(file)
            }
            else {
                console.log('Its not a directory')
            }
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const changedFiles = event.target.files

        if (!changedFiles?.length) return;

        const files = Array.from(changedFiles)
        files.forEach(file => handleFiles(file))
    }

    const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
        const dropItems = e.dataTransfer.items;
        dropItems.clear()
        setIsDragging(false)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    return (
        <ModalComponent
            id={FILE_UPLOAD}
            isOpen={true}
            toggle={toggleModal} size="lg">
            <section className={style.wrapper}>
                <label
                    htmlFor="upload-files"
                    className={`${style.upload} ${isDragging && style.dragging}`}
                    onDrop={handleDrop}
                    onDragOverCapture={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragLeave={handleDragLeave}
                >
                    <input id="upload-files" type="file" multiple hidden onChange={handleChange} />
                    <div>
                        <i className="bi bi-file-earmark-code"></i>
                        <div></div>
                    </div>

                    <p><strong>Click here</strong> to upload your file or drag and drop</p>
                    <span>Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.</span>
                </label>

                <div className={style.list}>
                    {files?.length && files?.map((file) => <FileListItem className="mb-2" key={file.name} file={file} />) || null}
                </div>

                {files?.length && <div className='d-flex justify-content-end align-items-center mt-4 mb-2'>
                    <ButtonGroup handleSubmit={() => toggleModal(false)} submitText="cancel" className={`cancel me-4`} />
                    <ButtonGroup
                        type="submit"
                        // disabled={!name}
                        submitText="OK"
                        className={`${style.submit} submit`}
                        // loading={loading}
                        loader="spin"
                        order={-1}
                    />
                </div> || null}

            </section>
        </ModalComponent>
    )
}

export default FileUploadModal