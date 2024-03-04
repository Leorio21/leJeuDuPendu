"use client";
import React, { useEffect } from 'react';
import Selectcategory from '../Components/Selectcategory/Selectcategory';
import useSecretWord from '../Hooks/useSecretWord';
import Play from '../Components/Play/Play';

export default function Pages() {

  const secretWord = useSecretWord();

  useEffect(() => {
    if (secretWord.dictionary.length > 0) {
      secretWord.pick();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretWord.isCategorieSelected])

  if (secretWord.value === "") {
    return (
        <Selectcategory changeDictionary={secretWord.newDictionary}/>
      )
    }
    
    return (
      <Play secretWord={secretWord} />
  )
}
