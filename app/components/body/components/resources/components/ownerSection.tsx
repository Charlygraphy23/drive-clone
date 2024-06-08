"use client"

import AvatarComponent from "@/app/components/avatar";
import { OwnerAccessObject } from "../interfaces/index.interface";


type Props = {
    data: OwnerAccessObject["userInfo"],
    className: string
}

const OwnerSection = ({ data, className }: Props) => {
    return (
        <div className={className}>
            <AvatarComponent user={data} style={{ fontSize: "0.7rem", marginRight: "10px", color: "black" }} />
            <span>{data?.email}</span>
        </div>
    )
}

export default OwnerSection