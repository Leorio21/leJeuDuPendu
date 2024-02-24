"use client";
import React from 'react';
import Selectcategory from '../Components/Selectcategory/Selectcategory';
import UseSecretWord from '../Hooks/UseSecretWord';
import Play from '../Components/Play/Play';

export default function Pages() {

  const { secretWord, selectWord } = UseSecretWord();


  if (secretWord) {
    return (
      <div><Play secretWord={secretWord} /></div>
    )
  }

  return (
    <Selectcategory onClick={selectWord}/>
  )
}
