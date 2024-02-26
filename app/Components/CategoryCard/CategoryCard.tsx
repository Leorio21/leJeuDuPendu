"use cleint";
import React from 'react';
import styles from "./CategoryCard.module.css";
import classNames from "classnames";

interface CategoryCardProps {
  item: string;
  content: string[];
  selectedCategory: (words: string[]) => void;
};

export default function CategoryCard({ item, content, selectedCategory }: CategoryCardProps) {

  return (
    <p className={classNames(styles.card)} onClick={() => selectedCategory(content)}>{item}</p>
  )
}
