"use cleint";
import React from 'react';
import styles from "./CategoryCard.module.css";
import classNames from "classnames";

interface CategoryCardProps {
  item: string;
  content: string[];
  changeDictionary: (words: string[]) => void;
};

export default function CategoryCard({ item, content, changeDictionary }: CategoryCardProps) {

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "enter") {
      changeDictionary(content);
    }
  }

  return (
    <p className={classNames(styles.card)} tabIndex={0} onKeyDown={onKeyDownHandler} onClick={() => changeDictionary(content)}>{item}</p>
  )
}
