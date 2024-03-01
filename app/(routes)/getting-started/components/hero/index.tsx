"use client"

import PlaceHolderUI from './components/placeHolderUI'
import style from './style.module.scss'

const HeroSection = () => {
    return (
        <div className={style.hero}>
            <div className={style.placeholderWrapper}>
                <PlaceHolderUI />

            </div>
            <div className={style.form}>
                <h4>Get started with your email</h4>
                <input type="text" placeholder='type here' />
                <button className="button">Get Started</button>

                <p>
                    <input type="checkbox" />
                    <span>
                        By checking this box, I acknowledge and agree to the terms and conditions.
                    </span>
                </p>
            </div>
        </div>
    )
}

export default HeroSection