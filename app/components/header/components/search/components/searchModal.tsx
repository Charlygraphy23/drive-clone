"use client"

import { fetchFileData, fetchFolderData } from '@/app/_actions/resource';
import { ResourceDatasetType } from '@/app/components/body/components/resources/interfaces/index.interface';
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useContext, useEffect, useMemo, useState } from 'react';
import { handleSearch, toggleFilterView } from '../store/actions';
import { SearchContext } from '../store/context';
import style from '../style.module.scss';
import AppliedFilters from './appliedFilters';
import ResultComponent from './resultComponent';
import SearchLoader from './searchLoader';

type Props = {
    user?: Session["user"]
}

const api = async (search: string, filters: string, userId: string) => {
    const parsedFilters = filters ? JSON.parse(filters) : ""
    const [folders, files] = await Promise.all([
        fetchFolderData({
            search,
            shared: "show",
            limit: 3,
            filters: parsedFilters,
            userId
        }),
        fetchFileData({
            search,
            shared: "show",
            limit: 3,
            filters: parsedFilters,
            userId
        })
    ])

    return {
        folders,
        files: files.resources
    }
}


const SearchModal = ({ user }: Props) => {
    const { state, dispatch } = useContext(SearchContext);
    const enableSearch = useMemo(() => {
        return !!state?.isOpen && (!!state?.search || !!Object.keys(state?.filters ?? {})?.length)
    }, [state?.isOpen, state?.search, state?.filters])


    const [selectedIdx, setSelectedIndex] = useState(-1)


    const { isFetched, data = {} as {
        files: ResourceDatasetType["files"],
        folders: ResourceDatasetType["folders"]
    }, isFetching } = useQuery({
        queryKey: ["search", state?.search, state.filters], queryFn: () => api(state?.search, JSON.stringify(state?.filters), String(user?._id)), retry: false, enabled: enableSearch, staleTime: 3000
    })

    const totalLengthOfData = (data?.files?.length ?? 0) + (data?.folders?.length ?? 0)

    const hasData = useMemo(() => {
        const { files = {} as ResourceDatasetType["files"], folders = {} as ResourceDatasetType["folders"] } = data
        return !!((files?.length || folders?.length) && isFetched)
    }, [data, isFetched])


    useEffect(() => {
        if (!state?.isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {

            const key = e.key
            const keys = ["ArrowDown", "ArrowUp"]

            if (!keys.includes(key)) {
                return
            }

            if (key === "ArrowDown") {
                setSelectedIndex(prev => {
                    if (prev >= totalLengthOfData - 1) return prev
                    return ++prev
                })
            }

            else if (key === "ArrowUp") {
                setSelectedIndex(prev => {
                    if (prev > 0) return --prev;
                    return prev
                })
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [state?.isOpen, totalLengthOfData])




    return <div className={style.wrapper}>
        <div className={style.inputGroup}>
            <input type="text" placeholder='Search..' value={state?.search ?? ""} onChange={(e) => dispatch(handleSearch(e.target.value))} />
            <button className="button" onClick={() => dispatch(toggleFilterView())}>Filter</button>
        </div>


        <div className={style.results}>
            <AppliedFilters />

            {isFetching && <SearchLoader />}
            {!hasData && !isFetching && state?.search && <span className="px-1 text-center">No result found!</span>}

            {!!data?.folders?.length && !isFetching && state?.search && <section className={style.listWrapper}>
                <h6>Folders</h6>
                <div className={style.lists}>
                    {data?.folders?.map((val, index) => <ResultComponent key={index} selected={index === selectedIdx} type={DATA_TYPE.FOLDER} title={val?.name ?? ""} path={val?._id} />)}
                </div>
            </section>}

            {!!data?.files?.length && !isFetching && state?.search && <section className={style.listWrapper}>
                <h6>Files</h6>
                <div className={style.lists}>
                    {data?.files?.map((val, index) => <ResultComponent key={index} selected={(index + (data?.folders?.length ?? 0)) === selectedIdx} type={DATA_TYPE.FILE} title={val?.name ?? ""} path={String(val?.parentFolderId ?? "")} mimeType={val.mimeType} fileId={val?._id} />)}
                </div>
            </section>}

        </div>
    </div>;
};

export default SearchModal;
