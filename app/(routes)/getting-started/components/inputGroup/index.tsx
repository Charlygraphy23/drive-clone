"use client"

import { FormEvent, PropsWithChildren } from 'react'
import style from './style.module.scss'

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  value: string,
  submit: () => void
  onChange: () => void,
  buttonText: string
} & PropsWithChildren

const InputGroupComponent = ({ className, showTerms = false, submit, onChange, value, title, buttonText }: Props) => {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit()
  }

  return (
    <form action="#" className={`${style.inputGroup} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input type="text" placeholder='type here' value={value} onChange={onChange} />
      <button className="button" type='submit'>{buttonText}</button>

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