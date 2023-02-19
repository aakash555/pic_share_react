import React from 'react';
import MuiButton from '@mui/material/Button'
import "./styles/button.css"
import { IButtonProps } from '../interfaces';

export const Button = ({ materialButtonProps, type="primary", children }: IButtonProps) => {
  const className = `button button-${type} ${materialButtonProps.className}`;

  return <MuiButton {...{ ...materialButtonProps, className }}>
    {children}
  </MuiButton>
}