import React, { useEffect, useRef, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import LetterKeyboard from "../LetterKeyboard/LetterKeyboard";
import Button from "../Button/Button";
import { IoMenu } from "react-icons/io5";
import Word from "../Word/Word";
import Title from "../Title/Title";
import { GameState } from "@/app/enum/enum";
import Answer from "../Answer/Answer";
import RemainingTry from "../RemainingTry/RemainingTry";

interface PlayProps {
  secretWord: {
    value: string;
    dictionary: string[] | null;
    reset: () => void;
    pick: () => void;
    newDictionary: (words: string[]) => void;
  }
}

function Play({ secretWord }: PlayProps) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const MAXTRY = 8;
  const endGameMessageRef = useRef<HTMLDialogElement>(null);

  const [lettersToDisplay, setLettersToDisplay] = useState<string>(secretWord.value.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""));
  const [gameState, setGameState] = useState<GameState>(GameState.PENDING);
  const [remainingTry, setRemainingTry] = useState<number>(MAXTRY);
  const endGameMessage: {[key: number]: string} = {
    [GameState.WON]: "Vous avez gagné",
    [GameState.LOST]: "Vous avez perdu",
    [GameState.PENDING]: "Options"
  }

  const openOptionMenu = () => {
    endGameMessageRef.current?.showModal();
  }

  const closeOptionMenu = () => {
    endGameMessageRef.current?.close();
  }

  const isGameLost = () => {
    if (remainingTry <= 0) {
      setGameState(GameState.LOST);
      endGameMessageRef.current?.showModal();
    }
  }

  const isGameWon = () => {
    if (lettersToDisplay.includes("_")) {
      return;
    }
    setGameState(GameState.WON);
    endGameMessageRef.current?.showModal();
  }

  const nextWord = () => {
    secretWord.pick();
    endGameMessageRef.current?.close();
    setGameState(GameState.PENDING);
    setRemainingTry(MAXTRY);
  }

  const verifLetter = (letter: string) => {
    if (secretWord.value.includes(letter)) {

      setLettersToDisplay((prev) => {
        const newDisplay = prev.split("");
        for (let i = 0; i < secretWord.value.length; i++) {
          if (secretWord.value[i] === letter) {
            newDisplay[i] = letter;
          }
        }
        return newDisplay.join("");
      })
    } else {
      setRemainingTry((prev) => prev - 1)
    }
  }

  useEffect(() => {
    setLettersToDisplay(secretWord.value.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, secretWord.value]);

  useEffect(() => {
    isGameWon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersToDisplay]);

  useEffect(() => {
    isGameLost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTry]);

  return (
    <>
      <dialog ref={endGameMessageRef}>
        <div className={classNames(styles.dialogContent)}>
          <Title name={endGameMessage[gameState]} />
          {gameState === GameState.LOST && <Answer secretWord={secretWord.value} />}
          {gameState === GameState.PENDING ?
            <Button width={200} onClick={closeOptionMenu}>Continuer</Button> :
            <Button width={200} onClick={nextWord}>Rejouer</Button>}
          
          <Button width={200} onClick={secretWord.reset} href="/play">Nouvelle catégorie</Button>
          <Button width={200} color="gradient" href="/">Quitter</Button>
        </div>
      </dialog>
      <div className={classNames(styles.wrapper)}>
        <div className={classNames(styles.headContainer)}>
        <Button color={"gradient"} onClick={openOptionMenu}><IoMenu style={{ width: "2rem", height: "2rem" }} /></Button>
        <RemainingTry remainingTry={remainingTry}/>
        </div>
        <div className={styles.word}>
          {lettersToDisplay.split(" ").map((word, index) => <Word key={index} word={word} />)}
        </div>
        <div className={classNames(styles.container)}>
          {LETTERS.split("").map((letter) => (
            <LetterKeyboard key={letter} letter={letter} gameState={gameState} tabIndex={0} verifLetter={verifLetter}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Play;
