// "use client";
// import { useEffect, useState } from "react";
// import { GameState } from "@/app/enum/enum";
// import { useGameStore } from "../Stores/GameStore";

// export default function useGame() {
//   const gameStore = useGameStore();

//   const randomNumber = (min: number, max: number) => {
//     return Math.floor(Math.random() * (max - min)) + min;
//   };

//   const isGameWon = () => {
//     if (
//       lettersToDisplay === gameStore.secretWord &&
//       gameStore.secretWord !== "" &&
//       gameStore.gameState === GameState.PENDING
//     ) {
//       gameStore.changeGameState(GameState.WON);
//     }
//   };

//   const isGameLost = () => {
//     if (gameStore.remainingTry > 0) {
//       return;
//     }
//     setLettersToDisplay(gameStore.secretWord);
//     gameStore.changeGameState(GameState.LOST);
//   };

//   // **********************************************
//   //                  Exported Fct
//   // **********************************************

//   const replay = () => {
//     secretWordPick();
//     gameStore.playedLettersReset();
//     gameStore.changeGameState(GameState.PENDING);
//     gameStore.resetRemainingTry();
//   };

//   const restartGame = () => {
//     gameStore.changeSecretWord("");
//     gameStore.changeDictionary([]);
//     gameStore.categoryIsSelected(false);
//     setLettersToDisplay("");
//     gameStore.playedLettersReset();
//     gameStore.changeGameState(GameState.PENDING);
//     gameStore.resetRemainingTry();
//   };

//   const verifLetter = (letter: string) => {
//     gameStore.addPlayedLetter(letter);

//     if (gameStore.secretWord.includes(letter)) {
//       setLettersToDisplay((prev) => {
//         const newDisplay = prev.split("");
//         for (let i = 0; i < gameStore.secretWord.length; i++) {
//           if (gameStore.secretWord[i] === letter) {
//             newDisplay[i] = letter;
//           }
//         }
//         return newDisplay.join("");
//       });
//     } else {
//       gameStore.decreaseRemainingTry();
//     }
//   };

//   const secretWordPick = () => {
//     if (gameStore.dictionary === null || gameStore.dictionary.length <= 0) {
//       alert("Catégorie vide ou inconnue");
//       return;
//     }
//     const wordIndex = randomNumber(0, gameStore.dictionary.length - 1);
//     gameStore.changeSecretWord(gameStore.dictionary[wordIndex]);
//   };

//   useEffect(() => {
//     setLettersToDisplay(
//       gameStore.secretWord
//         .split("")
//         .map((letter) => (letter.match(/[A-Z]/g) ? "_" : letter))
//         .join(""),
//     );
//   }, [gameStore.secretWord]);

//   useEffect(() => {
//     isGameWon();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lettersToDisplay]);

//   useEffect(() => {
//     isGameLost();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [gameStore.remainingTry]);

//   return {
//   };
// }
