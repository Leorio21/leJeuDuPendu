"use cleint";
import React from 'react';
import styles from "./CategoryCard.module.css";
import classNames from "classnames";

interface CategoryCardProps {
  item: string;
  content: string[];
  onClick: (words: string[]) => void;
};

export default function CategoryCard({ item, content, onClick }: CategoryCardProps) {

  return (
    <p className={classNames(styles.card)} onClick={() => onClick(content)}>{item}</p>
  )
}
