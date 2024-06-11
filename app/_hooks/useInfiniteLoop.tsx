"use client"

import { AsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';

type Props = {
    api: AsyncThunk<any, any, any>
    limit?: number,
    startPage?: number,
}

const useInfiniteLoop = ({ api, limit = 10, startPage = 1 }: Props) => {
    const { isFetching, hasNext } = useAppSelector(state => state.files)
    const dispatch = useAppDispatch()

    const params = useParams<{ folderId: string }>()
    const lastItemRef = useRef(null);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(startPage)



    const callback = useCallback<IntersectionObserverCallback>(async (itemList, observer) => {
        for (const item of itemList) {
            const inserted = item?.isIntersecting
            if (inserted && !isFetching && hasNext) {
                console.log("I next ", hasNext, page + 1)
                setPage(prev => {
                    prev = prev + 1
                    return prev
                })
                try {
                    await dispatch(api({
                        limit,
                        page: page + 1,
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
        }
    }, [callback])


    return { lastItemRef, scrollRef }
}

export default useInfiniteLoop