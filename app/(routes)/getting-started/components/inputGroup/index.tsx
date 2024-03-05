"use client"

import { ChangeEvent, FormEvent, PropsWithChildren, useState } from 'react'
import { SubmitParameterValueType } from './interfaces/index.interface'
import style from './style.module.scss'

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  submit: (key: string, value: SubmitParameterValueType) => void
  buttonText: string,
  id: string
} & PropsWithChildren

const InputGroupComponent = ({ className, showTerms = false, submit, title, buttonText, id }: Props) => {
  const [state, setState] = useState("")
  const [checked, setChecked] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!showTerms) return;
    setChecked(event.target.checked)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (showTerms) {
      return submit(id, {
        value: state,
        showTerms: checked
      })

    }

    submit(id, state)
  }

  return (
    <form action="#" className={`${style.inputGroup} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={state} onChange={onChange} />
      <button className="button" type='submit'>{buttonText}</button>

      {showTerms && <p>
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form>
  )
}

export default InputGroupComponent