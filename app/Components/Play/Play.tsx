import React, { useEffect, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterKeyboard from "../LetterKeyboard/LetterKeyboard";

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
    <div className={styles.word}>
      {lettersToDisplay.split(" ").map((el, index) => <div className={styles.wordBlock} key={index}>{el.split("").map((letter, index) => <p key={index}>{letter}</p>)}</div>)}
    </div>
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter, index) => (
            <LetterKeyboard key={letter} letter={letter} tabIndex={index} verifLetter={verifLetter}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Play;
