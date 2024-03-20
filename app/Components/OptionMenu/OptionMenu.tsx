import React from "react";
import classNames from "classnames";
import styles from "./OptionMenu.module.css";
import { useGameStore } from "@/app/Stores/GameStore";
import { GameState } from "@/app/enum/enum";
import Title from "../Title/Title";
import Button from "../Button/Button";
import Answer from "../Answer/Answer";

interface OptionMenuProps {
  gameMessageRef: React.RefObject<HTMLDialogElement>;
  closeOptionMenu: () => void;
  choiceReplay: () => void;
}

function OptionMenu({
  gameMessageRef,
  closeOptionMenu,
  choiceReplay,
}: OptionMenuProps) {
  const gameState = useGameStore((state) => state.gameState);
  const dictionary = useGameStore((state) => state.dictionary);
  const gameReset = useGameStore((state) => state.gameReset);
  const gameMessage: { [key: number]: string } = {
    [GameState.WON]: "Vous avez gagné",
    [GameState.LOST]: "Vous avez perdu",
    [GameState.PENDING]: "Options",
  };

  return (
    <dialog ref={gameMessageRef}>
      <div className={classNames(styles.dialogContent)}>
        <Title name={gameMessage[gameState]} />
        {gameState === GameState.LOST && <Answer />}
        {gameState === GameState.PENDING ? (
          <Button width={200} onClick={closeOptionMenu}>
            Continuer
          </Button>
        ) : (
          <Button
            width={200}
            onClick={choiceReplay}
            disabled={dictionary.length <= 0}
          >
            Rejouer
          </Button>
        )}
        <Button width={200} onClick={gameReset}>
          Nouvelle catégorie
        </Button>
        <Button width={200} color="gradient" href="/">
          Quitter
        </Button>
      </div>
    </dialog>
  );
}

export default OptionMenu;
