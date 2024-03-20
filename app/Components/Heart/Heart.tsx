import React, { useEffect } from "react";
import styles from "./Heart.module.css";
import classNames from "classnames/bind";
import { IoHeartSharp } from "react-icons/io5";
import { useGameStore } from "@/app/Stores/GameStore";

const cx = classNames.bind(styles);

interface HeartProps {
  lifeNumber: number;
}

function HeartComponent({ lifeNumber }: HeartProps) {
  const remainingTry = useGameStore((state) => state.remainingTry);

  return (
    <IoHeartSharp
      className={cx({ heart: true, empty: lifeNumber > remainingTry })}
      style={{ width: "50", height: "50" }}
    />
  );
}

export const Heart = React.memo(HeartComponent);
