"use client"

import AptImage from '@app/assets/apt.png'
import DbImage from '@app/assets/db.png'
import FolderImage from '@app/assets/folder.png'
import ServerImage from '@app/assets/server.png'



import Image from 'next/image'
import { useContext } from 'react'
import { GetStartedContext } from '../../store'
import InputGroupComponent from '../inputGroup'
import StepForm from '../stepform'
import PlaceHolderUI from './components/placeHolderUI'
import style from './style.module.scss'


const HeroSection = () => {
    const { state: { activePage }, setPage } = useContext(GetStartedContext)


    const onSubmit = () => {
        setPage(activePage + 1)
    }

    if (activePage !== -1) {
        return <StepForm />
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

            <div className={style.textWrapper}>
                <div className={style.container}>
                    <p>a file storage</p>
                </div>
                <div className={style.container}>
                    <h1>STORAGE . FILES . SHARE</h1>
                </div>
            </div>


            <div className={style.placeholderWrapper}>
                <PlaceHolderUI />
            </div>
            <div className="mb-5" >
                <InputGroupComponent
                    className={style.form}
                    showTerms
                    onSubmit={onSubmit}
                    buttonText='Getting Started'
                    id='email'
                    title='Getting started with your email'
                />
            </div>

        </div>
    )
}

export default HeroSection