"use client";
import { useState } from "react";

export default function UseSecretWord() {
  const [secretWord, setSecretWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[] | null>(null);

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const selectedCategory = (words: string[]) => {
    setWords(words);
  }

  const resetSecretWord = () => {
    setSecretWord(null);
    setWords([]);
  }

  const selectWord = () => {
    if (words === null || words.length === 0) {
      alert("Catégorie vide ou inconnue")
      return;
    }
      const wordIndex = randomNumber(0, words.length - 1);
      setSecretWord(words[wordIndex]);
  }

  return { secretWord, words, resetSecretWord, selectWord, selectedCategory };


}