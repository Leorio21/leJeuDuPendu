import React, { PropsWithChildren } from 'react';
import classNames from "classnames/bind";
import styles from "./Button.module.css"
import Link from 'next/link';
import { Urls } from '@/app/type/urls';

interface ButtonProps extends PropsWithChildren {
  width?: number;
  height?: number;
  color?: "blue" | "gradient";
  href?: Urls;
  onClick? : (() => void) | undefined;
  positionAbsolute?: boolean;
};

const cx = classNames.bind(styles);

export default function Button({ width = 30, height = 30, color = "blue", href = "#", onClick = undefined, positionAbsolute = false, children }: ButtonProps) {
  return (
    <Link
      href={href}
      style={{height:`${height}px`, width:`${width}px`}}
      className={cx({container: true, positionAbsolute: positionAbsolute, backgroundGradient: color === "gradient" ,circle: width === height})}
      onClick={onClick}
      >
        { children }
    </Link>
  )
}
