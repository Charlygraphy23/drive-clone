"use client"

import { ChangeEvent, FormEvent, PropsWithChildren, useState } from 'react'
import style from './style.module.scss'

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  submit: (key: string, value: string) => void
  buttonText: string,
  id: string
} & PropsWithChildren

const InputGroupComponent = ({ className, showTerms = false, submit, title, buttonText, id }: Props) => {
  const [state, setState] = useState("")

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(id, state)
  }

  return (
    <form action="#" className={`${style.inputGroup} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={state} onChange={onChange} />
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