import React from 'react'
import {ILogoProps} from "../interfaces"
import "./styles/logo.css"

const Logo = ({className, onClick}: ILogoProps) => {
  return (
    <div onClick={onClick} className={`site-logo ${className}`}>PicShare</div>
  )
}

export default Logo