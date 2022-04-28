import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import {
  WORD_LENGTH,
  ANIME_DELAY,
  ANIME_DURATION,
  WIN_ANIME_DURATION
} from '../../data/gameSettings'

export default function CurrentRow(props) {
  const { currentGuess, answer, isRevealing, invalidGuessWiggle } = props

  useEffect(() => {
    const flippers = document.getElementsByClassName('box-flip')
    if (isRevealing) {
      if (flippers) {
        ;[...flippers].forEach((flipper, index) => {
          setTimeout(() => {
            if (flipper.textContent === answer[index]) {
              flipper.classList.add('correct')
            } else if (answer.includes(flipper.textContent)) {
              flipper.classList.add('wrong-spot')
            } else {
              flipper.classList.add('incorrect')
            }
          }, ANIME_DELAY * index + ANIME_DELAY + ANIME_DELAY / 4)
        })
      }
    }
  }, [isRevealing])

  // useEffect(() => {
  //   const wigglers = document.getElementsByClassName('current-box')
  //   if (wigglers && invalidGuessWiggle) {
  //     ;[...wigglers].forEach((wiggler) => {
  //       setTimeout(() => {
  //         wiggler.classList.add('guess')
  //       }, ANIME_DURATION)
  //     })
  //   }
  // }, [invalidGuessWiggle])

  const currentRow = (
    <div
      className={
        invalidGuessWiggle ? 'guess-row guess-row-wiggle' : 'guess-row'
      }
      style={{
        animationDuration: `${WIN_ANIME_DURATION}ms`
      }}
    >
      {new Array(WORD_LENGTH).fill('').map((x, i) => (
        <div
          className={isRevealing ? 'guess-box box-flip' : 'guess-box'}
          style={{
            animationDelay: `${ANIME_DELAY * (i + 1)}ms`,
            animationDuration: `${ANIME_DURATION}ms`
          }}
          key={nanoid()}
        >
          <h1 className="guess-box-text">{currentGuess[i]}</h1>
        </div>
      ))}
    </div>
  )

  return <>{currentRow}</>
}
