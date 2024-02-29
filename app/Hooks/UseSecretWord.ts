"use client";
import { useState } from "react";

export default function UseSecretWord() {
  const [value, setValue] = useState<string>("");
  const [dictionary, setDictionary] = useState<string[] | null>(null);

  const randomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min)) + min;
	};

  const newDictionary = (words: string[]) => {
    setDictionary(words);
  }

  const reset = () => {
    setValue("");
    setDictionary(null);
  }

  const pick = () => {
    if (dictionary === null || dictionary.length <= 0) {
      alert("Catégorie vide ou inconnue");
      return;
    }
    const wordIndex = randomNumber(0, dictionary.length - 1);
    setValue(dictionary[wordIndex]);
  }

  return { value, dictionary, reset, pick, newDictionary };


}