import React, { useEffect, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterKeyboard from "../LetterKeyboard/LetterKeyboard";
import Button from "../Button/Button";
import { IoArrowUndoSharp } from "react-icons/io5";
import WordLetter from "../WordLetter/WordLetter";
import Word from "../Word/Word";

interface PlayProps {
  secretWord: string;
}

function Play({ secretWord }: PlayProps) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [lettersToDisplay, setLettersToDisplay] = useState<string>(secretWord.split("").map((letter) => letter.match(/[^A-Z]/g) ? letter : "_").join(""));

  const isWin = () => {
    if (lettersToDisplay.includes("_")) {
      return;
    }
    console.log("You Win");
  }

  const verifLetter = (letter: string) => {
    if (secretWord.includes(letter)) {
      setLettersToDisplay((prev) => {
        const newValue = prev.split("");
        for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === letter) {
            newValue[i] = letter;
          }
        }
        return newValue.join("");
      })
    }
  }

  useEffect(() => {
    isWin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersToDisplay]);

  return (
    <>
      <div className={classNames(styles.wrapper)}>
        <div className={styles.word}>
          {lettersToDisplay.split(" ").map((word, index) => <Word key={index} word={word} />)}
        </div>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter) => (
            <LetterKeyboard key={letter} letter={letter} tabIndex={0} verifLetter={verifLetter}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Play;
