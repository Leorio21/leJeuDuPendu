import React from 'react';
import styles from "./Title.module.css";
import classNames from "classnames";

interface TitleProps {
  name: string;
};

export default function Title({name}: TitleProps)  {
  return (
    <h1 className={classNames(styles.title)}>{name}</h1>
  )
}
