import { PropsWithChildren } from 'react';
import style from "../style.module.scss";

type Props = {
  label: string;
} & PropsWithChildren

const FilterWrapper = ({ label, children }: Props) => {
  return (
    <div className={style.label}>
      <p>{label}</p>
      <div className={style.labelChildren}>
        {children}
      </div>
    </div>
  )
}

export default FilterWrapper