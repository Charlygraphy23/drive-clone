"use client"

import { useEffect, useRef, useState } from 'react';

const useDebounceValue = <T,>(value?: T) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>()
    const [debounceValue, setDebounceValue] = useState<T>();


    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDebounceValue(value)
        }, 1000)

        return () => {
            if (timerRef?.current) {
                clearTimeout(timerRef?.current)
                timerRef.current = undefined;
                setDebounceValue("" as T)
            }
        }
    }, [value])

    return debounceValue as T
}

export default useDebounceValue