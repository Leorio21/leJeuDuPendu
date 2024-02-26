import React, { PropsWithChildren } from 'react';
import classNames from "classnames/bind";
import styles from "./Button.module.css"
import Link from 'next/link';

interface ButtonProps extends PropsWithChildren {
  width: number;
  href: string;
  positionAbsolute?: boolean;
};

const cx = classNames.bind(styles);

export default function Button({ width, href, positionAbsolute = false, children }: ButtonProps) {
  return (
    <Link
      href={href}
      style={{height:`${width}px`, width:`${width}px`}}
      className={cx({container: true, positionAbsolute: positionAbsolute})}
      >
        { children }
    </Link>
  )
}
