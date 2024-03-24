import style from "../style.module.scss"


export const getViewSlideClass = (active: number, index: number) => {
    return active === index ? style.active : active > index ? style.left : style.right
}