"use client"

import AvatarComponent from "@/app/components/avatar";
import { OwnerAccessObject } from "../interfaces/index.interface";


type Props = {
    data: OwnerAccessObject,
    className: string
}

const OwnerSection = ({ data, className }: Props) => {
    return (
        <div className={className}>
            <AvatarComponent user={data?.userInfo} style={{ fontSize: "0.7rem", marginRight: "10px", color: "black" }} />
            <span>{data?.userInfo?.email}</span>
        </div>
    )
}

export default OwnerSection