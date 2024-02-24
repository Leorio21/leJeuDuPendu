"use client";
import { useState } from "react";

export default function UseSecretWord() {
  const [secretWord, setSecretWord] = useState<string | null>(null);

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const selectWord = (words: string[]) => {
    const wordIndex = randomNumber(0, words.length - 1);

    setSecretWord(words[wordIndex]);
  }

  return { secretWord, selectWord };


}