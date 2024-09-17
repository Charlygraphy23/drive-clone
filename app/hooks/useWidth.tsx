"use strict";

import { useLayoutEffect, useState } from 'react';


const useDeviceWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);


    useLayoutEffect(() => {
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
        isTablet: width <= 1024,
        isLargeMobile: width <= 430,
        isSmallMobile: width <= 375
    }
}

export default useDeviceWidth