import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { ANIME_DELAY } from '../../data/gameSettings'

export default function FilledRow(props) {
  const { guess, answer, index, isRevealing, prevGuesses } = props

  const animate = isRevealing && index === prevGuesses.length - 1

  console.log(isRevealing)

  useEffect(() => {
    console.log(isRevealing)
    if (isRevealing) {
      const flippers = document.getElementsByClassName('box-flip')
      if (flippers) {
        ;[...flippers].forEach((flipper, ind) => {
          setTimeout(() => {
            if (flipper.textContent === answer[ind]) {
              flipper.classList.add('correct')
            } else if (answer.includes(flipper.textContent)) {
              flipper.classList.add('wrong-spot')
            } else {
              flipper.classList.add('incorrect')
            }
          }, ANIME_DELAY * ind + ANIME_DELAY + ANIME_DELAY / 4)
        })
      }
    }
  }, [isRevealing])

  const filledRow = (
    <div className="guess-row">
      {guess.map((letter, i) => (
        <div
          className={animate ? 'guess-box box-flip' : 'guess-box'}
          style={{ animationDelay: `${ANIME_DELAY * (i + 1)}ms` }}
          key={nanoid()}
        >
          <h1 className="guess-box-text">{letter}</h1>
        </div>
      ))}
    </div>
  )

  return <>{filledRow}</>
}
