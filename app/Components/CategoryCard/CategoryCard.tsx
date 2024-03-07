"use cleint";
import React from "react";
import styles from "./CategoryCard.module.css";
import classNames from "classnames";

interface CategoryCardProps {
  categorie: string;
  content: string[];
  changeDictionary: (categorie:string, words: string[]) => void;
}

export default function CategoryCard({
  categorie,
  content,
  changeDictionary,
}: CategoryCardProps) {

  const onClickHandler = () => {
    changeDictionary(categorie, content);
  }

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
      {categorie}
    </p>
  );
}
