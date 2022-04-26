import React from 'react'
import { nanoid } from 'nanoid'
import { WORD_LENGTH } from '../../data/gameSettings'

export default function CurrentRow(props) {
  const { currentGuess } = props

  const currentRow = (
    <div className="guess-row">
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div className="guess-box" key={nanoid()}>
          <h1 className="guess-box-text">{currentGuess[i]}</h1>
        </div>
      ))}
    </div>
  )

  return <>{currentRow}</>
}
