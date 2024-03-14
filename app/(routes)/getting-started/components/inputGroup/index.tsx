"use client"

import { ChangeEvent, FormEvent, PropsWithChildren, useMemo, useState } from 'react';
import { ValidationError } from 'yup';
import { InputGroupStateType, InputStateSchemaObjectWithCheck, InputStateSchemaWithCheck, SubmitParameterValueType } from './interfaces/index.interface';
import style from './style.module.scss';

type Props = {
  className?: string,
  showTerms?: boolean,
  title: string,
  submit: (key: string, value: SubmitParameterValueType) => void
  buttonText: string,
  id: string
} & PropsWithChildren

const isObjectData = (state: InputGroupStateType | string, showTerms: boolean): state is InputGroupStateType => {
  return !!showTerms && typeof state === "object" && "email" in state
}


const InputGroupComponent = ({ className, showTerms = false, submit, title, buttonText, id }: Props) => {
  const initialState = showTerms ? {
    email: '',
    checked: false
  } as InputGroupStateType : ""
  const [state, setState] = useState<InputGroupStateType | string>(initialState)
  const [error, setError] = useState<Record<keyof InputGroupStateType, boolean>>({} as Record<keyof InputGroupStateType, boolean>)

  const [value, ID] = useMemo(() => {
    const ID = id as keyof InputGroupStateType

    if (isObjectData(state, showTerms)) {
      const value = state?.[ID] as string
      return [value, ID]
    }
    return [state, ID]
  }, [id, showTerms, state])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError({} as Record<keyof InputGroupStateType, boolean>)
    const key = event.target.id as string
    const value = event.target.value

    setState(prev => {
      if (isObjectData(prev, showTerms)) {
        return {
          ...prev,
          [key]: value
        }
      }

      return value
    })
  }

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    if (!showTerms) return;

    setState(prev => {
      if (isObjectData(prev, showTerms)) {
        return {
          ...prev,
          checked: event.target.checked
        }
      }
      return value
    })

  }

  const validateInput = async () => {
    let hasError = false

    try {
      if (isObjectData(state, showTerms)) {
        await InputStateSchemaObjectWithCheck
          .validate(state, { abortEarly: false, context: { email: "email" in state, checked: "checked" in state } })
      }
      else {
        await InputStateSchemaWithCheck
          .validate(state, { abortEarly: false })
      }
    }
    catch (err: unknown) {
      const errors = (err as ValidationError).inner;
      errors.forEach(_err => {
        console.log(JSON.stringify(_err))

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
    if (hasErrors) return
    if (isObjectData(state, showTerms)) {
      return submit(id, {
        value: value,
        showTerms: state?.checked ?? false
      })
    }

    submit(id, value)
  }

  console.log("Submit ", error)


  return (
    <form action="#" className={`${style.inputGroup} ${error?.[ID] ? style.error : ""} ${className}`} onSubmit={handleSubmit}>
      <h4>{title}</h4>
      <input id={id} type="text" placeholder='type here' value={value ?? ""} onChange={onChange} />
      <button className="button" type='submit'>{buttonText}</button>

      {isObjectData(state, showTerms) && <p className={`${style.showTerms} ${error?.checked ? style.error : ""}`}>
        <input type="checkbox" checked={state?.checked ?? false} onChange={handleChecked} />
        <span>
          By checking this box, I acknowledge and agree to the terms and conditions.
        </span>
      </p>}
    </form>
  )
}

export default InputGroupComponent