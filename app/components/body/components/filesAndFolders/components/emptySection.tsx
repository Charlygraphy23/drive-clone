"use client"

import LottiePlayer from "@/app/components/lottiePlayer"
import { useAppSelector } from "@/app/store"
import EmptyAnimation from "@app/assets/empty-lottie.json"

const EmptySection = () => {

    const folders = useAppSelector(state => state.folders)
    const files = useAppSelector(state => state.files)

    const isEmpty = !folders?.data?.length && !files.data?.length

    return (
        <>
            {isEmpty && <div className="w-100 d-flex justify-content-center align-items-center flex-column my-4">
                <LottiePlayer animationData={EmptyAnimation} width={300} height={300} />
                <p>There is no files!</p>
            </div>}
        </>
    )
}

export default EmptySection