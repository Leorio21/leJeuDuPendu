import React, { useEffect, useRef, useState } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import Button from "../Button/Button";
import { IoMenu } from "react-icons/io5";
import Word from "../Word/Word";
import Title from "../Title/Title";
import { GameState } from "@/app/enum/enum";
import Answer from "../Answer/Answer";
import RemainingTry from "../RemainingTry/RemainingTry";
import Keyboard from "../Keyboard/Keyboard";
import useWindowSize from "@/app/Hooks/useWindowSize";
import Confetti from 'react-confetti'

interface PlayProps {
  secretWord: {
    value: string;
    dictionary: string[];
    isCategorieSelected: boolean;
    reset: () => void;
    pick: () => void;
    newDictionary: (words: string[]) => void;
  }
}

function Play({ secretWord }: PlayProps) {
  const MAXTRY = 8;
  const gameMessageRef = useRef<HTMLDialogElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowSize();

  const [lettersToDisplay, setLettersToDisplay] = useState<string>(secretWord.value.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""));
  const [gameState, setGameState] = useState<GameState>(GameState.PENDING);
  const [remainingTry, setRemainingTry] = useState<number>(MAXTRY);
  const gameMessage: {[key: number]: string} = {
    [GameState.WON]: "Vous avez gagné",
    [GameState.LOST]: "Vous avez perdu",
    [GameState.PENDING]: "Options"
  }

  const openOptionMenu = () => {
    gameMessageRef.current?.showModal();
  }

  const closeOptionMenu = () => {
    gameMessageRef.current?.close();
  }

  const isGameLost = () => {
    if (remainingTry <= 0) {
      setGameState(GameState.LOST);
      openOptionMenu();
    }
  }

  const isGameWon = () => {
    if (lettersToDisplay.includes("_")) {
      return;
    }
    confettiRef.current?.classList.remove(styles.confetti)
    setTimeout(() => {
      setGameState(GameState.WON);
      openOptionMenu();
    }, 2000);
  }

  const nextWord = () => {
    secretWord.pick();
    gameMessageRef.current?.close();
    confettiRef.current?.classList.add(styles.confetti)
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
  }, [secretWord.value]);

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
    <div className={classNames(styles.confetti)} ref={confettiRef}>
      <Confetti
        width={width}
        height={height}
      />
    </div>
      <dialog ref={gameMessageRef}>
        <div className={classNames(styles.dialogContent)}>
          <Title name={gameMessage[gameState]} />
          {gameState === GameState.LOST && <Answer secretWord={secretWord.value} />}
          {gameState === GameState.PENDING ?
            <Button width={200} onClick={closeOptionMenu}>Continuer</Button> :
            <Button width={200} onClick={nextWord} disabled={secretWord.dictionary.length <= 0}>Rejouer</Button>}
          
          <Button width={200} onClick={secretWord.reset} >Nouvelle catégorie</Button>
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
        <Keyboard game={{
          state: gameState,
          verifLetter: verifLetter
          }
        } />
      </div>
    </>
  );
}

export default Play;
