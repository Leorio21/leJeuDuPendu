import { create } from "zustand";
import { GameState } from "../enum/enum";
import { MAXTRY } from "../Constantes/Constantes";

type GameStoreState = {
  dictionary: string[];
  playedLetters: Set<string>;
  selectedCategory: string;
  isCategorySelected: boolean;
  remainingTry: number;
  secretWord: string;
  lettersToDisplay: string;
  gameState: GameState;
  changeDictionary: (newDictionnary: string[]) => void;
  addPlayedLetter: (letter: string) => void;
  startGame: (category: string, newDictionnary: string[]) => void;
  gameReset: () => void;
  replay: () => void;
  playedLettersReset: () => void;
  changeCategory: (newCategory: string) => void;
  categoryIsSelected: (value: boolean) => void;
  resetRemainingTry: () => void;
  decreaseRemainingTry: () => void;
  changeSecretWord: (newWord: string) => void;
  initLettersToDisplay: (word: string) => void;
  changeLettersToDisplay: (newDisplay: string) => void;
  changeGameState: (newState: GameState) => void;
}

export const useGameStore = create<GameStoreState>()((set) => ({
  dictionary: [],
  playedLetters: new Set(),
  selectedCategory: "",
  isCategorySelected: false,
  remainingTry: MAXTRY,
  secretWord: "",
  lettersToDisplay: "",
  gameState: GameState.PENDING,

  changeDictionary: (newDictionnary: string[]) =>
    set(() => ({ dictionary: newDictionnary })),

  addPlayedLetter: (letter: string) =>
    set((current) => ({
      playedLetters: new Set(current.playedLetters).add(letter),
    })),

  startGame: (category: string, newDictionnary: string[]) =>
    set(() => ({
      selectedCategory: category,
      isCategorySelected: true,
      dictionary: newDictionnary,
    })),

  gameReset: () =>
    set(() => ({
      dictionary: [],
      playedLetters: new Set(),
      selectedCategory: "",
      isCategorySelected: false,
      remainingTry: MAXTRY,
      secretWord: "",
      lettersToDisplay: "",
      gameState: GameState.PENDING,
    })),

  replay: () =>
    set(() => ({
      playedLetters: new Set(),
      gameState: GameState.PENDING,
      remainingTry: MAXTRY,
    })),

  playedLettersReset: () => set(() => ({ playedLetters: new Set() })),

  changeCategory: (newCategory: string) =>
    set(() => ({ selectedCategory: newCategory })),

  categoryIsSelected: (value: boolean) =>
    set(() => ({ isCategorySelected: value })),

  resetRemainingTry: () => set(() => ({ remainingTry: MAXTRY })),

  decreaseRemainingTry: () =>
    set((current) => ({ remainingTry: current.remainingTry - 1 })),

  changeSecretWord: (newWord: string) =>
    set((current) => ({
      secretWord: newWord,
      dictionary: current.dictionary.filter((word) => word !== newWord),
    })),

  initLettersToDisplay: (word: string) =>
    set(() => ({
      lettersToDisplay: word
        .split("")
        .map((letter) => (letter.match(/[A-Z]/g) ? "_" : letter))
        .join(""),
    })),

  changeLettersToDisplay: (newDisplay: string) =>
    set(() => ({ lettersToDisplay: newDisplay })),

  changeGameState: (newState: GameState) =>
    set(() => ({ gameState: newState })),
}));

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const secretWordPick = () => {
  const dictionary = useGameStore.getState().dictionary;
  if (dictionary === null || dictionary.length <= 0) {
    alert("Catégorie vide ou inconnue");
    return;
  }
  const wordIndex = randomNumber(0, dictionary.length - 1);
  useGameStore.getState().changeSecretWord(dictionary[wordIndex]);
  useGameStore.getState().initLettersToDisplay(dictionary[wordIndex]);
};

export const replay = () => {
  secretWordPick();
  useGameStore.getState().replay();
};

export const verifLetter = (letter: string) => {
  useGameStore.getState().addPlayedLetter(letter);
  const secretWord = useGameStore.getState().secretWord;

  if (secretWord.includes(letter)) {
    const newDisplay = useGameStore.getState().lettersToDisplay.split("");

    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letter) {
        newDisplay[i] = letter;
      }
    }
    useGameStore.getState().changeLettersToDisplay(newDisplay.join(""));
    isGameWon();
  } else {
    useGameStore.getState().decreaseRemainingTry();
    isGameLost();
  }
};

const isGameWon = () => {
  if (
    useGameStore.getState().lettersToDisplay ===
      useGameStore.getState().secretWord &&
    useGameStore.getState().secretWord !== "" &&
    useGameStore.getState().gameState === GameState.PENDING
  ) {
    useGameStore.getState().changeGameState(GameState.WON);
  }
};

const isGameLost = () => {
  if (useGameStore.getState().remainingTry > 0) {
    return;
  }
  useGameStore
    .getState()
    .changeLettersToDisplay(useGameStore.getState().secretWord);
  useGameStore.getState().changeGameState(GameState.LOST);
};
