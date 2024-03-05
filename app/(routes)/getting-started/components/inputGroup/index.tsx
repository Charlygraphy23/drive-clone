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
  const [error, setError] = useState({
    showTerms: false
  } as Record<string, any>)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!showTerms) return;
    setChecked(event.target.checked)
  }

  const validateInput = () => {
    let hasError = false
    if (showTerms && !checked) {
      hasError = true
      setError(prev => ({
        ...prev,
        showTerms: true
      }))
    }

    // TODO; yup schema validation
    if (id === "email") {
      hasError = false
      setError(prev => ({
        ...prev,
        [id]: false
      }))

    }

    return hasError
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError({
      showTerms: false
    })

    const hasErrors = validateInput()
    console.log({ hasErrors })

    if (hasErrors) return

    if (showTerms) {
      return submit(id, {
        value: state,
        showTerms: checked
      })
    }

    submit(id, state)
  }
  console.log("Submit", state, checked, error)

  return (
    <form action="#" className={`${style.inputGroup} ${error?.[id] ? style.error : ""} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={state} onChange={onChange} />
      <button className="button" type='submit'>{buttonText}</button>

      {showTerms && <p className={`${style.showTerms} ${error?.showTerms ? style.error : ""}`}>
        <input type="checkbox" checked={checked} onChange={handleChecked} />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form>
  )
}

export default InputGroupComponent