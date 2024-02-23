import React from 'react';
import styles from "./Button.module.css"

export default function Button({ width, children }: { width: number, children: React.ReactNode }) {
  return (
    <div style={{height:`${width}px`, width:`${width}px`}} className={styles.container}>{ children }</div>
  )
}
