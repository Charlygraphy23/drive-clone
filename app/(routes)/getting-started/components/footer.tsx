import Link from 'next/link'
import style from '../style.module.scss'

const FooterComponent = () => {
    return (
        <div className={style.footer}>
            <p>© {new Date().getFullYear()} Copyright</p>

            <p>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
                <Link href="/privacy-policy">Privacy</Link>
                <Link href="/plans">Plans</Link>

            </p>
        </div>
    )
}

export default FooterComponent