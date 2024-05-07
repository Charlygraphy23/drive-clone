import { User } from 'next-auth'
import Image from 'next/image'
import style from "./style.module.scss"

type Props = {
    user?: Pick<User, "_id" | "firstName" | "lastName" | "image">,
    width?: number
    height?: number
}

const AvatarComponent = ({ user: _user, width, height }: Props) => {
    return (
        <div className={style.avatar}>
            <div className={style.wrapper} style={{ width, height }}>
                <Image
                    src='https://images.pexels.com/photos/18489099/pexels-photo-18489099/free-photo-of-man-in-white-shirt-with-book-in-hands.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                    alt='avatar-image'
                    fill={true}
                />
            </div>
        </div>
    )
}

export default AvatarComponent