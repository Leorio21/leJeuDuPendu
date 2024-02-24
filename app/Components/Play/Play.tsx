import UseSecretWord from '@/app/Hooks/UseSecretWord'
import React from 'react'
import Keyboard from '../Keyboard/Keyboard';

interface PlayProps {
  secretWord: string;
}

function Play({secretWord}: PlayProps) {

  return (
    <>
      <div>Play {secretWord}</div>
      <Keyboard />
    </>
  )
}

export default Play