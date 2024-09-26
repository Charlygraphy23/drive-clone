import FooterComponent from './components/footer'
import GettingStartedHeader from './components/header'
import HeroSection from './components/hero'
import GetStartedProvider from './store/provider'
import style from './style.module.scss'


const GettingStarted = () => {

    return (
        <GetStartedProvider>
            <section className={`${style.gettingStarted} container-fluid`}>
                <div className={style.wrapper}>
                    <GettingStartedHeader />
                    <HeroSection />
                    <FooterComponent hidePlans />
                </div>
            </section>
        </GetStartedProvider>
    )
}

export default GettingStarted