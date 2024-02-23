import React, { PropsWithChildren } from 'react';
import classNames from "classnames/bind";
import styles from "./Button.module.css"

const cx = classNames.bind(styles);
interface ButtonProps extends PropsWithChildren {
  width: number;
  back?: boolean;
};

export default function Button({ width, back = false, children }: ButtonProps) {
  return (
    <div style={{height:`${width}px`, width:`${width}px`}} className={cx({container: true, backButton: back})}>{ children }</div>
  )
}
