"use client";
import React, { PropsWithChildren } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";
import Link from "next/link";
import { Urls } from "@/app/Types/urls";
import { useRouter } from "next/navigation";

type ButtonProps = {
  width?: number;
  height?: number;
  color?: "blue" | "gradient";
  href?: Urls;
  onClick?: (() => void) | undefined;
  disabled?: boolean;
  positionAbsolute?: boolean;
} & PropsWithChildren;

const cx = classNames.bind(styles);

export default function Button({
  width = 50,
  height = 50,
  color = "blue",
  href = "#",
  onClick = undefined,
  disabled = false,
  positionAbsolute = false,
  children,
}: ButtonProps) {
  const router = useRouter();

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "enter") {
      if (event.target.href.includes("#") && onClick) {
        onClick();
      } else {
        router.replace(event.target.href);
      }
    }
  };

  return (
    <Link
      href={href}
      tabIndex={0}
      style={{ height: `${height}px`, width: `${width}px` }}
      className={cx({
        container: true,
        positionAbsolute: positionAbsolute,
        disabled: disabled,
        backgroundGradient: color === "gradient",
        circle: width === height,
      })}
      onClick={onClick}
      onKeyDown={onKeyDownHandler}
    >
      {children}
    </Link>
  );
}
