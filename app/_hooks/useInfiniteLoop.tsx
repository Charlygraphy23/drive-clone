"use client"

import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../store';

type Props = {
    api: AsyncThunk<any, any, any>
    limit?: number,
    startPage?: number,
    triggerOnMount?: AsyncThunk<any, any, any>,
    hasNext: boolean,
    isFetching: boolean,
    showDeleted?: boolean
}

const useInfiniteLoop = ({ api, limit = 10, startPage = 1, triggerOnMount, hasNext = false, isFetching = false, showDeleted }: Props) => {
    const dispatch = useAppDispatch()
    const initialMount = useRef<boolean>()

    const params = useParams<{ folderId: string }>()
    const lastItemRef = useRef(null);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(startPage)

    const API = useMemo(() => api({
        limit,
        page: page,
        folderId: params?.folderId ?? "",
        showDeleted
    }), [api, limit, page, params?.folderId, showDeleted])



    const callback = useCallback<IntersectionObserverCallback>(async (itemList, observer) => {
        console.log("Has Next ", hasNext)
        for (const item of itemList) {
            const inserted = item?.isIntersecting
            if (inserted && !isFetching && hasNext) {
                setPage(prev => {
                    prev = prev + 1
                    return prev
                })
                try {
                    await dispatch(API)
                }
                catch (err) {
                    console.log("ERROR", err)
                }
            }

            if (inserted) {
                observer.disconnect()
                observer.unobserve(item?.target)

            }
        }

    }, [hasNext, isFetching, dispatch, API]);

    useEffect(() => {
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
        }
    }, [callback])


    useEffect(() => {
        if (!triggerOnMount) return
        if (initialMount?.current) return;
        dispatch(triggerOnMount({
            limit,
            page: page,
            folderId: params?.folderId ?? "",
            showDeleted
        }))
        initialMount.current = true
    }, [API, api, dispatch, limit, page, params?.folderId, showDeleted, triggerOnMount])


    return { lastItemRef, scrollRef }
}

export default useInfiniteLoop