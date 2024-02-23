import React from 'react';
import styles from "./Title.module.css";

export default function Title({name}:{name: string})  {
  return (
    <h1 className={styles.title}>{name}</h1>
  )
}
