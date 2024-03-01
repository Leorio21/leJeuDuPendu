"use client";
import React, { useEffect } from 'react';
import Selectcategory from '../Components/Selectcategory/Selectcategory';
import UseSecretWord from '../Hooks/UseSecretWord';
import Play from '../Components/Play/Play';

export default function Pages() {

  const secretWord = UseSecretWord();

  useEffect(() => {
    if (secretWord.dictionary.length > 0) {
      secretWord.pick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretWord.isCategorieSelected])

  if (secretWord.value !== "") {
    return (
      <Play secretWord={secretWord} />
    )
  }

  return (
    <Selectcategory changeDictionary={secretWord.newDictionary}/>
  )
}
