"use client";
import { useState } from "react";

export default function UseSecretWord() {
  const [value, setValue] = useState("");
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [isCategorieSelected, setIsCategorySelected] = useState(false)

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const newDictionary = (words: string[]) => {
    setIsCategorySelected(true);
    setDictionary(words);
  }

  const dictionaryRemoveSecretWord = (newSecret: string) => {
    setDictionary((prev) => prev.filter((word) => word !== newSecret))
  }

  const reset = () => {
    setValue("");
    setDictionary([]);
    setIsCategorySelected(false);
  }

  const pick = () => {
    if (dictionary === null || dictionary.length <= 0) {
      alert("Catégorie vide ou inconnue");
      return;
    }
    const wordIndex = randomNumber(0, dictionary.length - 1);
    setValue(dictionary[wordIndex]);
    dictionaryRemoveSecretWord(dictionary[wordIndex]);
  }

  return { value, dictionary, isCategorieSelected, reset, pick, newDictionary };


}