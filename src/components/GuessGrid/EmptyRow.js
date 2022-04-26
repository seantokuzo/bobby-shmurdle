import React from 'react'
import { nanoid } from 'nanoid'
import { WORD_LENGTH } from '../../data/gameSettings'

export default function EmptyRow() {
  const emptyRow = (
    <div className="guess-row">
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div className="guess-box" key={nanoid()}>
          <h1 className="guess-box-text"></h1>
        </div>
      ))}
    </div>
  )

  return <>{emptyRow}</>
}
