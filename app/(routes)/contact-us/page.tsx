import FooterComponent from '../getting-started/components/footer';
import GettingStartedHeader from '../getting-started/components/header';
import style from './style.module.scss';


const ContactUs = () => {
    return (
        <main className={style.contactUs}>
            <section className={style.hero}>
                <GettingStartedHeader className={style.header} hideContactUs />
                <div className={style.text}>
                    <h4>Contact</h4>
                    <p>Let&#39;s start something good together. Get in touch with one of the team today!</p>
                </div>
                <svg id="wave" viewBox="0 0 1440 330" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(255, 255, 255, 1)" offset="0%"></stop><stop stop-color="rgba(255, 255, 255, 1)" offset="100%"></stop></linearGradient></defs><path fill="url(#sw-gradient-0)" d="M0,33L40,71.5C80,110,160,187,240,198C320,209,400,154,480,143C560,132,640,165,720,198C800,231,880,264,960,242C1040,220,1120,143,1200,115.5C1280,88,1360,110,1440,104.5C1520,99,1600,66,1680,71.5C1760,77,1840,121,1920,143C2000,165,2080,165,2160,159.5C2240,154,2320,143,2400,165C2480,187,2560,242,2640,242C2720,242,2800,187,2880,154C2960,121,3040,110,3120,126.5C3200,143,3280,187,3360,198C3440,209,3520,187,3600,159.5C3680,132,3760,99,3840,71.5C3920,44,4000,22,4080,33C4160,44,4240,88,4320,93.5C4400,99,4480,66,4560,71.5C4640,77,4720,121,4800,154C4880,187,4960,209,5040,209C5120,209,5200,187,5280,165C5360,143,5440,121,5520,126.5C5600,132,5680,165,5720,181.5L5760,198L5760,330L5720,330C5680,330,5600,330,5520,330C5440,330,5360,330,5280,330C5200,330,5120,330,5040,330C4960,330,4880,330,4800,330C4720,330,4640,330,4560,330C4480,330,4400,330,4320,330C4240,330,4160,330,4080,330C4000,330,3920,330,3840,330C3760,330,3680,330,3600,330C3520,330,3440,330,3360,330C3280,330,3200,330,3120,330C3040,330,2960,330,2880,330C2800,330,2720,330,2640,330C2560,330,2480,330,2400,330C2320,330,2240,330,2160,330C2080,330,2000,330,1920,330C1840,330,1760,330,1680,330C1600,330,1520,330,1440,330C1360,330,1280,330,1200,330C1120,330,1040,330,960,330C880,330,800,330,720,330C640,330,560,330,480,330C400,330,320,330,240,330C160,330,80,330,40,330L0,330Z"></path>
                </svg>
            </section>

            <section className={style.info}>
                <h1>Get In Touch</h1>

                <div className={style.wrapper}>
                    <div className={style.description}>
                        <p className={style.head}>Phone</p>
                        <span>+91 8918940615</span>
                    </div>

                    <div className={style.description}>
                        <p className={style.head}>Email</p>
                        <span>{process.env.FROM_EMAIL}</span>
                    </div>

                    <div className={style.description}>
                        <p className={style.head}>Location</p>
                        <span>Sector V, Kolkata, 700091</span>
                    </div>
                </div>

                <FooterComponent hidePlans />
            </section>
        </main>
    )
}

export default ContactUs