"use client";
import React from 'react';
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  item: string;
  content: string[];
};

export default function CategoryCard({ item, content }: CategoryCardProps) {

  const click = () => {
    console.log(content);
    console.log(content.length);
  }

  if (item === "Error") {
    return <p>Une erreur est survenue</p>
  }

  return (
    <p className={`${styles.card} ${styles.category}`} onClick={() => click()}>{item}</p>
  )
}
