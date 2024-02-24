import UseSecretWord from '@/app/Hooks/UseSecretWord'
import React from 'react'

interface PlayProps {
  secretWord: string;
}

function Play({secretWord}: PlayProps) {

  return (
    <div>Play {secretWord}</div>
  )
}

export default Play