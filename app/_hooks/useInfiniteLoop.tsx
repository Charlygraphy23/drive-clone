"use client"

import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store';

type Props = {
    api: AsyncThunk<any, any, any>
    limit?: number,
    startPage?: number,
    triggerOnMount?: boolean,
    hasNext: boolean,
    isFetching: boolean
}

const useInfiniteLoop = ({ api, limit = 10, startPage = 1, triggerOnMount = false, hasNext = false, isFetching = false }: Props) => {
    const dispatch = useAppDispatch()
    const initialMount = useRef<boolean>()

    const params = useParams<{ folderId: string }>()
    const lastItemRef = useRef(null);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(startPage)



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
                    await dispatch(api({
                        limit,
                        page: page,
                        folderId: params?.folderId
                    }))
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

    }, [isFetching, hasNext, page, dispatch, api, limit, params?.folderId]);

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
        dispatch(api({
            limit,
            page: page,
            folderId: params?.folderId
        }))
        initialMount.current = true
    }, [api, dispatch, limit, page, params?.folderId, triggerOnMount])


    return { lastItemRef, scrollRef }
}

export default useInfiniteLoop