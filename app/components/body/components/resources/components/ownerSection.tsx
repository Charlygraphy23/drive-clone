"use client"

import Image from "next/image";
import { OwnerAccessObject } from "../interfaces/index.interface";


type Props = {
    data: OwnerAccessObject,
    className: string
}

const OwnerSection = ({ data, className }: Props) => {
    return (
        <div className={className}>
            <Image src={data?.profileImage} width={30} height={30} alt="profile image" />
            <span>{data?.email}</span>
        </div>
    )
}

export default OwnerSection