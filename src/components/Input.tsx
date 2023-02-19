import React, { useEffect, useState } from 'react'
import MuiInput from '@mui/material/Input';
import { IInputProps } from '../interfaces';
import "./styles/input.css"

const Input = ({value, className, materialInputProps}: IInputProps) => {
  const [valueState, setValueState] = useState(value);
  
  useEffect(() => {
    setValueState(value)
  }, [value])

  return (
    <MuiInput
      {...{...materialInputProps, value:valueState}}
    />
  )
}

export default Input