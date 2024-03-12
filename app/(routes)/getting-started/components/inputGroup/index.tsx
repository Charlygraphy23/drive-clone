"use client"

import { ChangeEvent, FormEvent, PropsWithChildren, useMemo, useState } from 'react';
import { ValidationError } from 'yup';
import { InputGroupStateSchema, InputGroupStateType, SubmitParameterValueType } from './interfaces/index.interface';
import style from './style.module.scss';

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  submit: (key: string, value: SubmitParameterValueType) => void
  buttonText: string,
  id: string
} & PropsWithChildren


const InputGroupComponent = ({ className, showTerms = false, submit, title, buttonText, id }: Props) => {
  const [state, setState] = useState<InputGroupStateType>({} as InputGroupStateType)
  const [error, setError] = useState<Record<keyof InputGroupStateType, boolean>>({} as Record<keyof InputGroupStateType, boolean>)

  const [value, ID] = useMemo(() => {
    const ID = id as keyof InputGroupStateType
    const value = state?.[ID] as string
    return [value, ID]
  }, [id, state])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {

    const key = event.target.id as string

    setState(prev => ({
      ...prev,
      [key]: event.target.value
    }))
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!showTerms) return;
    setState(prev => ({
      ...prev,
      checked: event.target.checked
    }))
  }

  const validateInput = async () => {
    let hasError = false

    try {
      const isValidSchema = await InputGroupStateSchema.validate(state, { abortEarly: false })
      console.log("Validate ", isValidSchema)
    }
    catch (err: unknown) {
      console.error(err)
      const errors = (err as ValidationError).inner;

      errors.forEach(_err => {
        setError(prev => {
          const key = _err?.path;
          if (!key) return prev;

          return {
            ...prev,
            [key]: _err.message
          }

        })
      })
      hasError = true

    }

    return hasError

  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError({} as Record<keyof InputGroupStateType, boolean>)

    const hasErrors = await validateInput()
    console.log({ hasErrors })

    if (hasErrors) return
    if (showTerms) {
      return submit(id, {
        value: value,
        showTerms: state?.checked ?? false
      })
    }

    submit(id, value)
  }


  return (
    <form action="#" className={`${style.inputGroup} ${error?.[ID] ? style.error : ""} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={value ?? ""} onChange={onChange} />
      <button className="button" type='submit'>{buttonText}</button>

      {showTerms && <p className={`${style.showTerms} ${error?.checked ? style.error : ""}`}>
        <input type="checkbox" checked={state?.checked ?? false} onChange={handleChecked} />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form>
  )
}

export default InputGroupComponent