"use client";
import React, { useEffect } from 'react';
import Selectcategory from '../Components/Selectcategory/Selectcategory';
import UseSecretWord from '../Hooks/UseSecretWord';
import Play from '../Components/Play/Play';

export default function Pages() {

  const { secretWord, words, selectWord, selectedCategory } = UseSecretWord();

  useEffect(() => {
    selectWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words])

  if (secretWord) {
    return (
      <div><Play secretWord={secretWord} selectWord={selectWord} /></div>
    )
  }

  return (
    <Selectcategory selectedCategory={selectedCategory}/>
  )
}
