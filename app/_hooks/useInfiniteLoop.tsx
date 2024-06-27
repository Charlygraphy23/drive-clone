"use client"

import { AsyncThunk } from '@reduxjs/toolkit';
import { Session } from 'next-auth';
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
    user?: Session["user"]
}

const useInfiniteLoop = ({ api, limit = 10, startPage = 1, triggerOnMount, hasNext = false, isFetching = false, showDeleted, user }: Props) => {
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
        showDeleted,
        user
    }), [api, limit, page, params?.folderId, showDeleted, user])



    const callback = useCallback<IntersectionObserverCallback>(async (itemList, _observer) => {
        console.log("Inside Callback ", itemList)
        for (const item of itemList) {
            const inserted = item?.isIntersecting;

            console.log('Is Inserting , ', inserted)
            console.log('hasNext , ', hasNext)
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

            // if (inserted) {
            //     observer.disconnect()
            // }
        }

    }, [hasNext, isFetching, dispatch, API]);

    useEffect(() => {
        const options = {
            root: scrollRef?.current,
            rootMargin: "10px",
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(callback, options);
        console.log("Current Eleemnet ", lastItemRef?.current)
        if (lastItemRef?.current)
            observer.observe(lastItemRef?.current);


        return () => {
            observer.disconnect()
        }
    }, [callback, lastItemRef?.current])


    useEffect(() => {
        if (!triggerOnMount) return
        if (initialMount?.current) return;
        dispatch(triggerOnMount({
            limit,
            page: page,
            folderId: params?.folderId ?? "",
            showDeleted,
            user
        }))
        initialMount.current = true
    }, [API, api, dispatch, limit, page, params?.folderId, showDeleted, triggerOnMount, user])


    return { lastItemRef, scrollRef }
}

export default useInfiniteLoop