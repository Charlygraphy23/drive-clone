"use client"

import { uploadFile } from "@/app/_apis_routes/resources";
import { FILE_UPLOAD } from "@/app/_config/const";
import ButtonGroup from "@/app/components/buttonGroup";
import FileListItem from "@/app/components/fileListItem";
import ModalComponent from "@/app/components/modal";
import { FileUploadType } from "@/app/interfaces/index.interface";
import { useAppDispatch } from "@/app/store";
import {
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { ModalDataType } from "@/app/store/reducers/modal.reducers";
import { AxiosProgressEvent } from "axios";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import style from "./style.module.scss";

type Props = {
    isOpen: boolean;
    data: ModalDataType;
};



const FileUploadModal = ({ isOpen }: Props) => {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<FileUploadType[]>([])
    const [uploading, setUploading] = useState(false)
    const { folderId } = useParams<{ folderId: string }>()


    const dispatch = useAppDispatch();

    const handleFiles = (file?: File | null) => {
        if (file)
            setFiles(prev => {
                const isSameName = prev?.find(f => f?.file.name === file?.name)
                if (!isSameName) prev.push({
                    file: file,
                    progress: 0,
                    hasFinished: false,
                    isUploading: false,
                    isFailed: false
                })

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

        if (uploading) return;

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
        if (uploading) return;

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

    const handleSubmit = () => {
        if (uploading) return;
        setUploading(true)
        startUploading().finally(() => {
            setUploading(false)
        })

    }

    const updateFileState = useCallback((updateCallback: (_files: FileUploadType[]) => void) => {
        console.log("Called updateFileState")
        setFiles(prev => {
            const newFiles = Array.from(prev);
            updateCallback(newFiles);
            console.log("PREV ", newFiles);
            return newFiles;
        });
    }, [])

    const startUploading = useCallback(async () => {

        let index = 0;
        let hasMoreFile = !!files?.length;

        while (hasMoreFile) {
            const currantFile = files[index];

            console.log("hasMoreFile", hasMoreFile)
            console.log("currantFile", currantFile)
            console.log("folderId", folderId)
            console.log("index", index)




            if (currantFile?.hasFinished || currantFile?.progress) {
                console.log("Already complete!")
                hasMoreFile = !!files?.[++index]
                continue;

            }

            const formData = new FormData();
            if (folderId) {
                formData.append("folderId", folderId)
            }

            try {
                await uploadFile({
                    formData,
                    onUpload: (progressEvent: AxiosProgressEvent) => {
                        const { loaded, total = 0 } = progressEvent;
                        const progress = Math.round((loaded * 100) / total)
                        console.log("progress", {
                            loaded,
                            total,
                            progress
                        })

                        // setFiles(prev => {
                        //     prev[index].progress = progress

                        //     if (progress === 100) {
                        //         prev[index].hasFinished = true
                        //     }

                        //     return Array.from(prev)
                        // })
                    }
                })
            }
            catch (err) {
                console.log("Error ", err)
                updateFileState(prev => {
                    // prev[index].isFailed = true
                    // prev[index].progress = 0
                    // prev[index].hasFinished = true
                    return Array.from(prev)
                })
            }
            hasMoreFile = !!files?.[++index]
        }


    }, [files, folderId, updateFileState])


    return (
        <ModalComponent
            id={FILE_UPLOAD}
            isOpen={true}
            toggle={toggleModal} size="lg">
            <section className={style.wrapper}>
                {!uploading && <label
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
                </label> || null}

                <div className={style.list}>
                    {files?.length && files?.map((file) => <FileListItem className="mb-2" key={file.file?.name} media={file} />) || null}
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
                        handleSubmit={handleSubmit}
                    />
                </div> || null}

            </section>
        </ModalComponent>
    )
}

export default FileUploadModal