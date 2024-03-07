import React, { useEffect } from "react";
import styles from "./Heart.module.css";
import classNames from "classnames/bind";
import { IoHeartSharp } from "react-icons/io5";

const cx = classNames.bind(styles);

interface HeartProps {
  lifeNumber: number;
  remainingTry: number;
}

function Heart({lifeNumber, remainingTry}: HeartProps) {

  return <IoHeartSharp
  className={cx({heart: true, empty: lifeNumber > remainingTry})}
  style={{ width: "50", height: "50" }}
/>;
}

export default Heart;
