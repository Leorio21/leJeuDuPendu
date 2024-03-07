"use client";
import { useEffect, useState } from "react";
import { GameState } from "@/app/enum/enum";

export default function useGame() {
  const MAXTRY = 8;
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [secretWord, setSecretWord] = useState("");
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [remainingTry, setRemainingTry] = useState<number>(MAXTRY);
  const [isCategorieSelected, setIsCategorySelected] = useState(false);
  const [lettersToDisplay, setLettersToDisplay] = useState<string>("");
  const [lettersPlayed, setLettersPlayed] = useState<string>("");
  const [state, setState] = useState<GameState>(GameState.PENDING);
  
  const gameMessage: { [key: number]: string } = {
    [GameState.WON]: "Vous avez gagné",
    [GameState.LOST]: "Vous avez perdu",
    [GameState.PENDING]: "Options"
  }

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const dictionaryRemoveSecretWord = (newSecret: string) => {
    setDictionary((prev) => prev.filter((word) => word !== newSecret))
  }

  const isGameWon = () => {
    if (lettersToDisplay === secretWord && secretWord !== "") {
      setState(GameState.WON);
    }
  }

  const isGameLost = () => {
    if (remainingTry > 0) {
      return;
    }
    setState(GameState.LOST);
  }

  // **********************************************
  //                  Exported Fct
  // **********************************************
  
  const newDictionary = (words: string[]) => {
    setIsCategorySelected(true);
    setDictionary(words);
  }

  const replay = () => {
    secretWordPick();
    setLettersPlayed("");
    setState(GameState.PENDING);
    setRemainingTry(MAXTRY);

  }

  const restartGame = () => {
    setSecretWord("");
    setDictionary([]);
    setIsCategorySelected(false);
    setLettersToDisplay("");
    setLettersPlayed("");
    setState(GameState.PENDING);
    setRemainingTry(MAXTRY);
  }

  const verifLetter = (letter: string) => {
    setLettersPlayed((prev) => {return prev + letter});

    if (secretWord.includes(letter)) {
      setLettersToDisplay((prev) => {
        const newDisplay = prev.split("");
        for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === letter) {
            newDisplay[i] = letter;
          }
        }
        return newDisplay.join("");
      })
    } else {
      setRemainingTry((prev) => prev - 1)
    }
  }

  const secretWordPick = () => {
    if (dictionary === null || dictionary.length <= 0) {
      alert("Catégorie vide ou inconnue");
      return;
    }
    const wordIndex = randomNumber(0, dictionary.length - 1);
    setSecretWord(dictionary[wordIndex]);
    dictionaryRemoveSecretWord(dictionary[wordIndex]);
  }

  useEffect(() => {
    setLettersToDisplay(secretWord.split("").map((letter) => letter.match(/[A-Z]/g) ? "_" : letter).join(""))
  }, [secretWord]);

  useEffect(() => {
    isGameWon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lettersToDisplay]);

  useEffect(() => {
    isGameLost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTry]);

  return {
    LETTERS,
    secretWord,
    remainingTry,
    state,
    lettersToDisplay,
    lettersPlayed,
    dictionary,
    isCategorieSelected,
    gameMessage,
    replay,
    restartGame,
    verifLetter,
    secretWordPick,
    newDictionary
  };


}