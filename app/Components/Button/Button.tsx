import React, { PropsWithChildren } from 'react';
import styles from "./Button.module.css"

interface ButtonProps extends PropsWithChildren {
  width: number;
  classStyle?: string;
};

export default function Button({ width, classStyle = "", children }: ButtonProps) {
  return (
    <div style={{height:`${width}px`, width:`${width}px`}} className={`${styles.container} ${classStyle}`}>{ children }</div>
  )
}
