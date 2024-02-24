"use client"

import { useQuery } from '@tanstack/react-query';
import { useContext, useMemo, useState } from 'react';
import { toggleFilterView } from '../store/actions';
import { SearchContext } from '../store/context';
import style from '../style.module.scss';
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

const api = async (): Promise<any> => {
    return new Promise((resolve) => setTimeout(() => resolve(data), 3000))
}


const SearchModal = () => {
    const [search, setSearch] = useState("")
    const { isFetched, data = {}, isLoading } = useQuery({ queryKey: ["data", search], queryFn: api, retry: false, enabled: !!search, staleTime: 3000 })
    const { dispatch } = useContext(SearchContext)
    const hasData = useMemo(() => {
        const { files = {}, folders = {} } = data
        return !!(files?.length && folders?.length && isFetched)
    }, [data, isFetched])

    return <div className={style.wrapper}>
        <div className={style.inputGroup}>
            <input type="text" placeholder='Search..' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="button" onClick={() => dispatch(toggleFilterView())}>Filter</button>
        </div>


        <div className={style.results}>
            {isLoading && <SearchLoader />}
            {!hasData && !isLoading && <span className="px-1 text-center">No result found!</span>}
            {hasData && <section className={style.listWrapper}>
                <h6>Files</h6>
                <div className={style.lists}>
                    {data?.files?.map((val: any, index: number) => <ResultComponent key={index} selected={index === 0} type={val?.type} title={val?.title} path={val?.path} />)}
                </div>
            </section>}
            {hasData && <section className={style.listWrapper}>
                <h6>Folders</h6>
                <div className={style.lists}>
                    {data?.folders?.map((val: any, index: number) => <ResultComponent key={index} type={"folder"} title={val?.title} path={val?.path} />)}
                </div>
            </section>}
        </div>
    </div>;
};

export default SearchModal;
