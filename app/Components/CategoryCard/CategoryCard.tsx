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

  return (
    <p className={classNames(styles.card)} onClick={() => changeDictionary(content)}>{item}</p>
  )
}
