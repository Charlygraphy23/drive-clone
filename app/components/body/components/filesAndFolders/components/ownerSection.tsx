"use client"

import Image from "next/image";


type Props = {
    data: {
        profileImage: string;
        email: string
    }
}

const OwnerSection = ({ data }: Props) => {
    return (
        <div>
            <Image src={data?.profileImage} width={40} height={40} alt="profile image" />
            <span>{data?.email}</span>
        </div>
    )
}

export default OwnerSection