"use strict";

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
    console.log("width ", width)

    return {
        width,
        isTablet: width && width <= 768,
        isLargeMobile: width && width <= 425,
        isSmallMobile: width && width <= 320
    }
}

export default useDeviceWidth