import GettingStartedHeader from './components/header'
import HeroSection from './components/hero'
import style from './style.module.scss'


const GettingStarted = () => {
    return (
        <section className={`${style.gettingStarted} container-fluid`}>
            <div className={style.wrapper}>
                <GettingStartedHeader />
                <HeroSection />
                {/* Form Section */}
                {/* Footer Section */}
            </div>


        </section>
    )
}

export default GettingStarted