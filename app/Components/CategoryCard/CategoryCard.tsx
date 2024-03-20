"use client";
import React from "react";
import styles from "./CategoryCard.module.css";
import classNames from "classnames";
import { useGameStore } from "@/app/Stores/GameStore";

interface CategoryCardProps {
  category: string;
  content: string[];
}

export default function CategoryCard({ category, content }: CategoryCardProps) {
  const startGame = useGameStore((state) => state.startGame);

  const onClickHandler = () => {
    startGame(category, content);
  };

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "enter") {
      onClickHandler();
    }
  };

  return (
    <p
      className={classNames(styles.card)}
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      onClick={onClickHandler}
    >
      {category}
    </p>
  );
}
