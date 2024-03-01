import { PropsWithChildren } from 'react'
import style from '../style.module.scss'

type Props = {
    className?: string
} & PropsWithChildren

const DoodleUiContainer = ({ className, children }: Props) => {
    return (
        <div className={`${style.doodleContainer} ${className}`}>{children}</div>
    )
}

export default DoodleUiContainer