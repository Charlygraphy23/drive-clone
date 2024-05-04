"use client"

import { ErrorHandler } from '@/app/utils/index.utils';
import { ChangeEvent, FormEvent, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { GetStartedContext } from '../../store';
import { InputGroupStateType, InputStateSchema } from './interfaces/index.interface';
import style from './style.module.scss';

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  onSubmit: () => void
  buttonText: string,
  id: string,
  isLoading?: boolean,
} & PropsWithChildren


const InputGroupComponent = ({ className, showTerms = false, onSubmit, title, buttonText, id, isLoading = false }: Props) => {
  const { state: contextState, onChange } = useContext(GetStartedContext)
  const state = contextState.data
  // const [state, setState] = useState<InputGroupStateType | string>(initialState)
  const [error, setError] = useState<Record<keyof InputGroupStateType, string>>({} as Record<keyof InputGroupStateType, string>)

  const [value, ID] = useMemo(() => {
    const ID = id as keyof InputGroupStateType

    const value = state?.[ID] as string
    return [value, ID]
  }, [id, state])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError({} as Record<keyof InputGroupStateType, string>)
    const key = event.target.id as string
    const value = event.target.value

    onChange(key, value)
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!showTerms) return;

    const value = event.target.checked
    onChange("checked", value)
  }

  const validateInput = async () => {
    let hasError = false

    try {
      if (showTerms) {
        await InputStateSchema
          .validate(state, { abortEarly: false, context: { email: "email" in state, checked: "checked" in state } })
      }
      else {
        await InputStateSchema
          .validate(state, { abortEarly: false, context: { [ID]: `${ID}` in state } })
      }
    }
    catch (err: unknown) {
      hasError = true
      const errors = ErrorHandler(err) as Record<string, string>

      if (errors?._validationError) {
        setError(errors)
      }
      console.error(errors)
    }

    return hasError

  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError({} as Record<keyof InputGroupStateType, string>)

    const hasErrors = await validateInput()
    if (hasErrors) return
    onSubmit()
  }


  return (
    <form action="#" className={`${style.inputGroup} ${error?.[ID] ? style.error : ""} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={value ?? ""} onChange={onChangeHandler} />
      <button className="button" type='submit' disabled={isLoading}>
        {isLoading && <div className="spinner-border text-light" role="status" style={{ width: "15px", height: "15px", marginRight: "10px" }}>
          <span className="visually-hidden">Loading...</span>
        </div>}

        <span>{buttonText}</span>
      </button>

      {showTerms && <p className={`${style.showTerms} ${error?.checked ? style.error : ""}`}>
        <input type="checkbox" checked={state?.checked ?? false} onChange={handleChecked} />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form >
  )
}

export default InputGroupComponent