import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'

export default function FilledRow(props) {
  const { guess, answer } = props

  const filledRow = (
    <div className="guess-row">
      {guess.map((letter, i) => (
        <div
          className={
            letter === answer[i]
              ? 'guess-box correct'
              : answer.includes(letter)
              ? 'guess-box wrong-spot'
              : 'guess-box incorrect'
          }
          key={nanoid()}
        >
          <h1 className="guess-box-text">{letter}</h1>
        </div>
      ))}
    </div>
  )

  return <>{filledRow}</>
}
