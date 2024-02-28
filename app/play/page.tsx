"use client";
import React, { useEffect } from 'react';
import Selectcategory from '../Components/Selectcategory/Selectcategory';
import UseSecretWord from '../Hooks/UseSecretWord';
import Play from '../Components/Play/Play';

export default function Pages() {

  const { secretWord, words, resetSecretWord, selectWord, selectedCategory } = UseSecretWord();

  useEffect(() => {
    if (words) {
      selectWord();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  if (secretWord) {
    return (
      <Play secretWord={secretWord} resetSecretWord={resetSecretWord} selectWord={selectWord} />
    )
  }

  return (
    <Selectcategory selectedCategory={selectedCategory}/>
  )
}
