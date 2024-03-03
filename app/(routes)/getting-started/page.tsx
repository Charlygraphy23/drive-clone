import FooterComponent from './components/footer'
import GettingStartedHeader from './components/header'
import StepForm from './components/stepform'
import style from './style.module.scss'


const GettingStarted = () => {

    return (
        <section className={`${style.gettingStarted} container-fluid`}>
            <div className={style.wrapper}>
                <GettingStartedHeader />
                {/* <HeroSection /> */}
                <StepForm />
                <FooterComponent />
                <a hidden href="https://www.freepik.com/search?format=search&last_filter=query&last_value=storage&query=storage&type=icon">Icon by Freepik</a>
            </div>


        </section>
    )
}

export default GettingStarted