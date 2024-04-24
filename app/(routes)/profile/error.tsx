'use client' // Error components must be Client Components

import ErrorComponent from '@/app/error'
export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {


    return (
        <ErrorComponent error={error} />
    )
}