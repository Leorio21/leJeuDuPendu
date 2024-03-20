import React, { useEffect, useRef } from "react";
import styles from "./Play.module.css";
import classNames from "classnames";
import Button from "../Button/Button";
import { IoMenu } from "react-icons/io5";
import Word from "../Word/Word";
import Title from "../Title/Title";
import { GameState } from "@/app/enum/enum";
import { RemainingTry } from "../RemainingTry/RemainingTry";
import Keyboard from "../Keyboard/Keyboard";
import useWindowSize from "@/app/Hooks/useWindowSize";
import Confetti from "react-confetti";
import { useGameStore, replay } from "@/app/Stores/GameStore";
import OptionMenu from "../OptionMenu/OptionMenu";

function Play() {
  const gameMessageRef = useRef<HTMLDialogElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowSize();

  const gameState = useGameStore((state) => state.gameState);
  const selectedCategory = useGameStore((state) => state.selectedCategory);
  const lettersToDisplay = useGameStore((state) => state.lettersToDisplay);

  const openOptionMenu = () => {
    gameMessageRef.current?.showModal();
  };

  const closeOptionMenu = () => {
    gameMessageRef.current?.close();
  };

  const choiceReplay = () => {
    replay();
    closeOptionMenu();
  };

  useEffect(() => {
    if (gameState === GameState.PENDING) {
      confettiRef.current?.classList.add(styles.hideConfetti);
    }
    if (gameState === GameState.WON) {
      confettiRef.current?.classList.remove(styles.hideConfetti);
      setTimeout(() => {
        openOptionMenu();
      }, 2000);
    }
    if (gameState === GameState.LOST) {
      setTimeout(() => {
        openOptionMenu();
      }, 2000);
    }
  }, [gameState]);

  return (
    <>
      <div className={classNames(styles.confetti)} ref={confettiRef}>
        <Confetti width={width} height={height} />
      </div>
      <OptionMenu
        gameMessageRef={gameMessageRef}
        closeOptionMenu={closeOptionMenu}
        choiceReplay={choiceReplay}
      />
      <div className={classNames(styles.wrapper)}>
        <Title name={selectedCategory.toLowerCase()} />
        <div className={classNames(styles.headContainer)}>
          <Button color={"gradient"} onClick={openOptionMenu}>
            <IoMenu style={{ width: "2rem", height: "2rem" }} />
          </Button>
          <RemainingTry />
        </div>
        <div className={styles.word}>
          {lettersToDisplay.split(" ").map((word, index) => (
            <Word key={index} word={word} />
          ))}
        </div>
        <Keyboard />
      </div>
    </>
  );
}

export default Play;
