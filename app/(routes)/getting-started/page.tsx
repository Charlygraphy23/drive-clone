import GettingStartedHeader from './components/header'
import style from './style.module.scss'


const GettingStarted = () => {
    return (
        <section className={`${style.gettingStarted} container-fluid bg-dark`}>
            <div className={style.wrapper}>
                <GettingStartedHeader />
                {/* Form Section */}
                {/* Footer Section */}
            </div>


        </section>
    )
}

export default GettingStarted