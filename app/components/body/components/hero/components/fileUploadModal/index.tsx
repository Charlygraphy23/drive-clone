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
import { generateChunk } from "@/app/utils/fileUpload";
import { useParams } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
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

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
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

    const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
        const dropItems = e.dataTransfer.items;
        dropItems.clear()
        setIsDragging(false)
    }

    const handleFiles = (file?: File | null) => {
        if (file)
            setFiles(prev => {
                console.log("Handle Files")
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (uploading) return;

        const changedFiles = event.target.files

        if (!changedFiles?.length) return;

        const files = Array.from(changedFiles)
        files.forEach(file => handleFiles(file))
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const updateFileState = useCallback((updateCallback: (_files: FileUploadType[]) => FileUploadType[]) => {
        console.log("Called updateFileState")
        setFiles(updateCallback);
    }, [])


    const breakIntoChunks = useCallback(async (file: File, fileIndex: number, getProgress: (_progress: number, _fileIndex: number) => void) => {
        console.log("File size = ", file.size)
        const chunks = await generateChunk(file)
        const formData = new FormData();
        formData.append("totalSize", String(file.size))
        formData.append("name", file.name)
        if (folderId) {
            formData.append("folderId", folderId)
        }

        let idx = 0;
        const totalChunks = chunks?.length
        for await (const chunk of chunks) {
            formData.set("file", new Blob([chunk]))
            formData.set("chunkIndex", String(idx))
            formData.set("totalChunks", String(totalChunks))
            await uploadFile({ formData })
            const progress = Math.floor((idx + 1) * 100 / totalChunks)
            getProgress(progress, fileIndex)
            idx++
        }
    }, [folderId])

    const startUploading = useCallback(async () => {

        let index = 0, hasMoreFile = !!files?.length;

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
            try {
                await breakIntoChunks(currantFile?.file, index, (progress: number, fileIndex: number) => {
                    updateFileState((prev: FileUploadType[]) => {

                        return prev.map((media, idx) => {
                            if (idx === fileIndex) {

                                if (progress === 100) {
                                    media.hasFinished = true
                                    media.isUploading = false
                                } else {
                                    media.hasFinished = false
                                    media.isUploading = true
                                }
                                media.isFailed = false
                                media.progress = progress
                            }
                            return media
                        })
                    })

                    console.log("Progress", progress)
                })
            }
            catch (err) {
                console.log("PRREEVV Error ", err, index)
                updateFileState((prev: FileUploadType[]) => {
                    return prev.map((media, idx) => {
                        if (idx === index) {
                            media.isFailed = true
                            media.hasFinished = true
                            media.isUploading = false
                        }
                        return media
                    })
                })
            }
            hasMoreFile = !!files?.[++index]
        }

    }, [breakIntoChunks, files, folderId, updateFileState])

    const handleSubmit = () => {
        if (uploading) return;

        if (!files?.length) return;

        setUploading(true)
        startUploading().finally(() => {
            setUploading(false)
        })
    }

    const handleFileDelete = (index: number) => {
        if (uploading) return;
        setFiles(prev => [...prev.filter((_, idx) => idx !== index)])
    }


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

                {files?.length && <div className={style.list}>
                    {files?.length && files?.map((file, index) => <FileListItem className="mb-2" key={file.file?.name} media={file} index={index} onDelete={handleFileDelete} />) || null}
                </div> || null}

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

export default memo(FileUploadModal)