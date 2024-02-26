"use client";
import { useState } from "react";

export default function UseSecretWord() {
  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const selectedCategory = (words: string[]) => {
    setWords(words);
  }

  const selectWord = () => {
    const wordIndex = randomNumber(0, words.length - 1);

    setSecretWord(words[wordIndex]);
  }

  return { secretWord, words, selectWord, selectedCategory };


}