"use client"

import { PropsWithChildren } from 'react'
import style from './style.module.scss'

type Props = {
  className?: string,
  showTerms?: boolean
} & PropsWithChildren

const InputGroupComponent = ({ className, showTerms = false }: Props) => {
  return (
    <form action="#" className={`${style.inputGroup} ${className}`}>
      <h4>Get started with your email</h4>
      <input type="text" placeholder='type here' />
      <button className="button" type='submit'>Get Started</button>

      {showTerms && <p>
        <input type="checkbox" />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form>
  )
}

export default InputGroupComponent