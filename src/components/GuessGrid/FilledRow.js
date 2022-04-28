import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { WIN_ANIME_DELAY, WIN_ANIME_DURATION } from '../../data/gameSettings'

export default function FilledRow(props) {
  const { guess, answer, didWin, row, prevGuesses } = props

  const delay = (ind) => WIN_ANIME_DELAY * ind

  const filledRow = (
    <div className="guess-row">
      {guess.map((letter, i) => (
        <div
          className={
            letter === answer[i] && didWin && row === prevGuesses.length
              ? 'guess-box guess-box-win correct'
              : letter === answer[i]
              ? 'guess-box correct'
              : answer.includes(letter)
              ? 'guess-box wrong-spot'
              : 'guess-box incorrect'
          }
          style={{
            animationDelay: `${delay(i)}ms`,
            animationDuration: `${WIN_ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h1 className="guess-box-text">{letter}</h1>
        </div>
      ))}
    </div>
  )

  return <>{filledRow}</>
}
