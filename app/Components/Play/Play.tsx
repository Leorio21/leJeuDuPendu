import React, { useCallback, useEffect, useRef, useState } from "react";
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
import Confetti from "react-confetti";

interface PlayProps {
  game: {
    LETTERS: string;
    secretWord: string;
    remainingTry: number;
    state: GameState;
    lettersToDisplay: string;
    lettersPlayed: string;
    dictionary: string[];
    isCategorieSelected: boolean;
    gameMessage: { [key: number]: string };
    replay: () => void;
    restartGame: () => void;
    verifLetter: (letter: string) => void;
    secretWordPick: () => void;
    newDictionary: (words: string[]) => void;
  };
}

function Play({ game }: PlayProps) {
  const gameMessageRef = useRef<HTMLDialogElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowSize();

  const openOptionMenu = () => {
    gameMessageRef.current?.showModal();
  };

  const closeOptionMenu = () => {
    gameMessageRef.current?.close();
  };

  const replay = () => {
    game.replay();
    closeOptionMenu();
  };

  useEffect(() => {
    if (game.state === GameState.PENDING) {
      confettiRef.current?.classList.add(styles.hideConfetti);
    }
    if (game.state === GameState.WON) {
      confettiRef.current?.classList.remove(styles.hideConfetti);
      setTimeout(() => {
        openOptionMenu();
      }, 2000);
    }
    if (game.state === GameState.LOST) {
      openOptionMenu();
    }
  }, [game.state]);

  return (
    <>
      <div className={classNames(styles.confetti)} ref={confettiRef}>
        <Confetti width={width} height={height} />
      </div>
      <dialog ref={gameMessageRef}>
        <div className={classNames(styles.dialogContent)}>
          <Title name={game.gameMessage[game.state]} />
          {game.state === GameState.LOST && (
            <Answer secretWord={game.secretWord} />
          )}
          {game.state === GameState.PENDING ? (
            <Button width={200} onClick={closeOptionMenu}>
              Continuer
            </Button>
          ) : (
            <Button
              width={200}
              onClick={replay}
              disabled={game.dictionary.length <= 0}
            >
              Rejouer
            </Button>
          )}

          <Button width={200} onClick={game.restartGame}>
            Nouvelle catégorie
          </Button>
          <Button width={200} color="gradient" href="/">
            Quitter
          </Button>
        </div>
      </dialog>
      <div className={classNames(styles.wrapper)} id="test">
        <div className={classNames(styles.headContainer)}>
          <Button color={"gradient"} onClick={openOptionMenu}>
            <IoMenu style={{ width: "2rem", height: "2rem" }} />
          </Button>
          <RemainingTry remainingTry={game.remainingTry} />
        </div>
        <div className={styles.word}>
          {game.lettersToDisplay.split(" ").map((word, index) => (
            <Word key={index} word={word} />
          ))}
        </div>
        <Keyboard
          game={{
            state: game.state,
            letters: game.LETTERS,
            lettersPlayed: game.lettersPlayed,
            verifLetter: game.verifLetter,
          }}
        />
      </div>
    </>
  );
}

export default Play;
