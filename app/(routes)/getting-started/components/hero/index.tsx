"use client"

import AptImage from '@app/assets/apt.png'
import DbImage from '@app/assets/db.png'
import FolderImage from '@app/assets/folder.png'
import ServerImage from '@app/assets/server.png'



import Image from 'next/image'
import InputGroupComponent from '../inputGroup'
import { SubmitParameterValueType } from '../inputGroup/interfaces/index.interface'
import PlaceHolderUI from './components/placeHolderUI'
import style from './style.module.scss'


const HeroSection = () => {


    const onSubmit = (key: string, value: SubmitParameterValueType) => {
        console.log(key, value)
    }


    return (
        <div className={style.hero}>
            <div className={style.icons}>
                <Image src={AptImage} alt="icons" width={30} height={30} />
            </div>

            <div className={style.icons}>
                <Image src={DbImage} alt="icons" width={30} height={30} />
            </div>
            <div className={style.icons}>
                <Image src={ServerImage} alt="icons" width={30} height={30} />
            </div>
            <div className={style.icons}>
                <Image src={FolderImage} alt="icons" width={30} height={30} />
            </div>


            <div className={style.placeholderWrapper}>
                <PlaceHolderUI />
            </div>
            <InputGroupComponent
                className={style.form}
                showTerms
                submit={onSubmit}
                buttonText='Getting Started'
                id='email'
                title='Getting started with your email'
            />

        </div>
    )
}

export default HeroSection