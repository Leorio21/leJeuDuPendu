"use client";
import React from 'react';
import styles from "./CategoryCard.module.css";
import Link from 'next/link';
import classNames from "classnames";

interface CategoryCardProps {
  item: string;
  content: string[];
};

export default function CategoryCard({ item, content }: CategoryCardProps) {

  const randomNumber = ( min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const wordIndex = randomNumber(0, content.length);

  if (item === "Error") {
    return <p>Une erreur est survenue</p>
  }

  return (
    <Link className={classNames(styles.card)} href={{ pathname: '/play', query: { name: 'test' } }}>{item}</Link>
  )
}
