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
                    <FooterComponent />
                    <a hidden href="https://www.freepik.com/search?format=search&last_filter=query&last_value=storage&query=storage&type=icon">Icon by Freepik</a>
                </div>
            </section>
        </GetStartedProvider>
    )
}

export default GettingStarted