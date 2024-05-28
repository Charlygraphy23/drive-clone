import { DEFAULT_IMAGE } from '@/app/_config'
import { User } from 'next-auth'
import Image from 'next/image'
import { useMemo } from 'react'
import { Rings } from 'react-loader-spinner'
import style from "./style.module.scss"

type Props = {
    user?: Pick<User, "_id" | "firstName" | "lastName" | "imageUrl">,
    width?: number
    height?: number
    className?: string
    isLoading?: boolean
    style?: React.CSSProperties
}

const AvatarComponent = ({ user: _user, width, height, className = "", isLoading = false, ...rest }: Props) => {

    const firstWord = useMemo(() => {
        return `${_user?.firstName?.charAt(0)}${_user?.lastName?.charAt(0)}`
    }, [_user])

    return (
        <div className={`${style.avatar} ${className}`} style={rest?.style}>
            <div className={style.wrapper} style={{ width, height }}>
                {
                    !isLoading ? <>
                        {_user?.imageUrl && <Image
                            src={_user?.imageUrl ?? ""}
                            alt='avatar-image'
                            fill
                            quality={75}
                            placeholder='blur'
                            loading='lazy'
                            blurDataURL={DEFAULT_IMAGE}
                        />}

                        <p>{firstWord?.[0] + firstWord[1]}</p></>
                        : <div className="d-flex w-100 justify-content-center align-items-center">
                            <Rings
                                height="30"
                                width="20"
                                color="black"
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default AvatarComponent