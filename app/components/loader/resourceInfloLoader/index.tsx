"use client"

import style from "./style.module.scss"

const ResourceInfoLoader = () => {
  return (
    <div className={style.wrapper}>
      {Array(5).fill(0).map((_, i) => <div key={i} style={{ width: i == 0 ? "200px" : "100%" }} className={style.box}></div>)}
    </div>
  )
}

export default ResourceInfoLoader