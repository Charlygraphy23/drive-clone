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
        isTablet: width <= 786,
        isLargeMobile: width <= 425,
        isSmallMobile: width <= 320
    }
}

export default useDeviceWidth