import style from '../style.module.scss'

const FooterComponent = () => {
    return (
        <div className={style.footer}>
            <p>© {new Date().getFullYear()} Copyright</p>

            <p>
                <span>Terms & Conditions</span>
                <span>Privacy</span>
            </p>
        </div>
    )
}

export default FooterComponent