import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'

export default function FilledRow(props) {
  const { guess, answer, index, isRevealing, prevGuesses } = props

  const animate = isRevealing && index === prevGuesses.length - 1

  const delay = 500

  useEffect(() => {
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
          }, delay * ind + delay + delay / 4)
        })
      }
    }
  }, [])

  const filledRow = (
    <div className="guess-row">
      {guess.map((letter, i) => (
        <div
          className={animate ? 'guess-box box-flip' : 'guess-box'}
          style={{ animationDelay: `${delay * (i + 1)}ms` }}
          key={nanoid()}
        >
          <h1 className="guess-box-text">{letter}</h1>
        </div>
      ))}
    </div>
  )

  return <>{filledRow}</>
}
