import React, { useEffect, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterKeyboard from "../LetterKeyboard/LetterKeyboard";
import Button from "../Button/Button";
import { IoArrowUndoSharp } from "react-icons/io5";
import Word from "../Word/Word";
import Title from "../Title/Title";

interface PlayProps {
  secretWord: string;
  resetSecretWord: () => void;
  selectWord: () => void;
}

function Play({ secretWord, resetSecretWord, selectWord }: PlayProps) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dialog = document.querySelector("dialog");

  const [lettersToDisplay, setLettersToDisplay] = useState<string>(secretWord.split("").map((letter) => letter.match(/[^A-Z]/g) ? letter : "_").join(""));
  const [gameIsWin, setGameIsWin] = useState<boolean>(false);

  const isWin = () => {
    if (lettersToDisplay.includes("_")) {
      return;
    }
    dialog?.showModal();
    setGameIsWin(true);
  }

  const nextWord = () => {
    selectWord();
    dialog?.close();
    setGameIsWin(false);
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
    setLettersToDisplay(secretWord.split("").map((letter) => letter.match(/[^A-Z]/g) ? letter : "_").join(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIsWin, secretWord])

  useEffect(() => {
    isWin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersToDisplay]);

  return (
    <>
    <dialog>
      <div className={classNames(styles.dialogContent)}>
        <Title name="Vous avez gagné" />
        <Button width={200} onClick={nextWord}>Continuer</Button>
        <Button width={200} onClick={resetSecretWord} href="/play">Nouvelle catégorie</Button>
        <Button width={200} color="gradient" href="/">Quitter</Button>
      </div>
    </dialog>
      <div className={classNames(styles.wrapper)}>
        <div className={styles.word}>
          {lettersToDisplay.split(" ").map((word, index) => <Word key={index} word={word} />)}
        </div>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter) => (
            <LetterKeyboard key={letter} letter={letter} gameIsWin={gameIsWin} tabIndex={0} verifLetter={verifLetter}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Play;
