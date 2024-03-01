import GettingStartedHeader from './components/header'
import PlaceHolderUI from './components/placeHolderUI'
import style from './style.module.scss'


const GettingStarted = () => {
    return (
        <section className={`${style.gettingStarted} container-fluid`}>
            <div className={style.wrapper}>
                <GettingStartedHeader />
                <PlaceHolderUI />
                {/* Form Section */}
                {/* Footer Section */}
            </div>


        </section>
    )
}

export default GettingStarted