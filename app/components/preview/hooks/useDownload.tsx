"use client"

import { useCallback, useState } from 'react';
import { downloadFile, fetchWithProgress } from '../utils/index.utils';

const useDownload = () => {

    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);

    const updateProgress = useCallback((percentage: number, total: number) => {
        const _progress = Math.floor((percentage / total) * 100);
        setProgress(_progress)
    }, [])

    const startDownload = useCallback(async (fileUrl: string, fileName: string) => {
        try {
            setIsDownloading(true)
            const response = await fetchWithProgress(fileUrl, updateProgress);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            await downloadFile({ url, fileName })
            setIsDownloading(false)
        } catch (error) {
            console.error('Download failed', error);
            setIsDownloading(false)
        }
    }, [updateProgress])


    return {
        startDownload,
        progress,
        isDownloading
    }
}

export default useDownload