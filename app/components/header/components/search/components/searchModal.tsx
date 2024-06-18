"use client"

import { fetchFileData, fetchFolderData } from '@/app/_actions/resource';
import { ResourceDatasetType } from '@/app/components/body/components/resources/interfaces/index.interface';
import { DATA_TYPE } from '@/app/lib/database/interfaces/files.interfaces';
import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { toggleFilterView } from '../store/actions';
import { SearchContext } from '../store/context';
import style from '../style.module.scss';
import AppliedFilters from './appliedFilters';
import ResultComponent from './resultComponent';
import SearchLoader from './searchLoader';

const data = {
    files: [
        {
            title: "Random file",
            type: "pdf",
            path: "/random"
        },
        {
            title: "Random file 2",
            type: "txt",
            path: "/rando2"
        }
    ],
    folders: [
        {
            title: "Random Folder",
            type: "folder",
            path: "/random"
        }
    ]
}

const api = async (search: string,) => {
    const [folders, files] = await Promise.all([
        fetchFolderData("", "", false, search),
        fetchFileData("", "", false, search)
    ])

    return {
        folders,
        files: files.resources
    }
}


const SearchModal = () => {
    const { state } = useContext(SearchContext);
    const [search, setSearch] = useState("")
    const { isFetched, data = {} as {
        files: ResourceDatasetType["files"],
        folders: ResourceDatasetType["folders"]
    }, isFetching } = useQuery({ queryKey: ["search", search, state.filters], queryFn: () => api(search), retry: false, enabled: !!search || !!state?.filters, staleTime: 3000 })
    const { dispatch } = useContext(SearchContext)

    const hasData = useMemo(() => {
        const { files = {} as ResourceDatasetType["files"], folders = {} as ResourceDatasetType["folders"] } = data
        return !!((files?.length || folders?.length) && isFetched)
    }, [data, isFetched])



    return <div className={style.wrapper}>
        <div className={style.inputGroup}>
            <input type="text" placeholder='Search..' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="button" onClick={() => dispatch(toggleFilterView())}>Filter</button>
        </div>


        <div className={style.results}>
            <AppliedFilters />

            {isFetching && <SearchLoader />}
            {!hasData && !isFetching && <span className="px-1 text-center">No result found!</span>}
            {!!data?.files?.length && !isFetching && <section className={style.listWrapper}>
                <h6>Files</h6>
                <div className={style.lists}>
                    {data?.files?.map((val, index) => <ResultComponent key={index} selected={index === 0} type={DATA_TYPE.FILE} title={val?.name ?? ""} path={`q/${val?._id}`} mimeType={val.mimeType} />)}
                </div>
            </section>}
            {!!data?.folders?.length && !isFetching && <section className={style.listWrapper}>
                <h6>Folders</h6>
                <div className={style.lists}>
                    {data?.folders?.map((val, index) => <ResultComponent key={index} type={DATA_TYPE.FOLDER} title={val?.name ?? ""} path={`q/${val?._id}`} />)}
                </div>
            </section>}
        </div>
    </div>;
};

export default SearchModal;
