"use client";

import screen from '@app/styles/screen.module.scss';
import { useLayoutEffect, useState } from 'react';


const useDeviceWidth = () => {
    const [width, setWidth] = useState(0);


    useLayoutEffect(() => {
        setWidth(window?.innerWidth)

        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return {
        width,
        isTablet: width && width <= Number(screen?.tabletStart),
        isLargeMobile: width && width <= Number(screen?.largeMobileStart),
        isSmallMobile: width && width <= Number(screen?.smallMobileStart)
    }
}

export default useDeviceWidth