import Link from 'next/link'
import React from 'react'
import { IoArrowUndoSharp } from 'react-icons/io5'
import Button from '../Components/Button/Button'

export default function page() {
  return (
    <div>
      <Button href="/" color="gradient" positionAbsolute={true}>
        <IoArrowUndoSharp style={{ width: "2rem", height: "2rem" }} />
      </Button>
      <h1>How to Play</h1>
    </div>
  )
}
