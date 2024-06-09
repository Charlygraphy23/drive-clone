"use client"

import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';

type Props = {
    api: AsyncThunk<any, any, any>
    limit?: number,
    startPage?: number,
    hasNextPage?: boolean
}

const useInfiniteLoop = ({ api, limit = 10, startPage = 1, hasNextPage }: Props) => {
    console.log("hasNextPage", hasNextPage)
    const { loading } = useAppSelector(state => state.files)
    const dispatch = useAppDispatch()

    const params = useParams<{ folderId: string }>()
    const lastItemRef = useRef(null);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(startPage)
    const [isInserted, setIsInserted] = useState(false)
    const [isNext, setIsNext] = useState(hasNextPage)




    const callback = useCallback<IntersectionObserverCallback>(async (itemList, observer) => {
        for (const item of itemList) {
            console.log("item", item)
            const inserted = item?.isIntersecting
            if (inserted && !loading && !isInserted && isNext) {
                setPage(prev => {
                    prev = prev + 1
                    return prev
                })
                try {
                    const res = await dispatch(api({
                        limit,
                        page: page + 1,
                        folderId: params?.folderId
                    }))

                    setIsNext(res.payload?.next)
                    setIsInserted(false)
                }
                catch (err) {
                    console.log("ERROR", err)
                    setIsInserted(false)
                }
            }

            if (inserted) {
                observer.disconnect()
                observer.unobserve(item?.target)

            }
        }
    }, [api, dispatch, isInserted, isNext, limit, loading, page, params?.folderId]);

    useEffect(() => {
        console.log("Iniitate use effect ",)
        const options = {
            root: scrollRef?.current,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(callback, options);
        if (lastItemRef?.current)
            observer.observe(lastItemRef?.current);


        return () => {
            observer.disconnect()
            setIsInserted(false)
        }
    }, [callback])


    return { lastItemRef, scrollRef }
}

export default useInfiniteLoop