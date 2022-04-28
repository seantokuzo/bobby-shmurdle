import React from 'react'
import { nanoid } from 'nanoid'
import FilledRow from './FilledRow'
import CurrentRow from './CurrentRow'
import EmptyRow from './EmptyRow'
import { NUMBER_GUESSES } from '../../data/gameSettings'

export default function GuessGrid(props) {
  const { answer, currentGuess, prevGuesses, isRevealing, didWin, invalidGuessWiggle } = props

  const filledRows = prevGuesses.map((guess, i) => (
    <FilledRow
      guess={guess}
      answer={answer}
      didWin={didWin}
      row={i + 1}
      prevGuesses={prevGuesses}
      isRevealing={isRevealing}
      key={nanoid()}
    />
  ))

  const emptyRows =
    prevGuesses.length < NUMBER_GUESSES ? (
      new Array(NUMBER_GUESSES - prevGuesses.length - 1)
        .fill('')
        .map((slot, i) => <EmptyRow key={nanoid()} />)
    ) : (
      <></>
    )

  const guessGrid = (
    <div className="grid__container">
      {filledRows}
      {prevGuesses.length < NUMBER_GUESSES && (
        <CurrentRow
          answer={answer}
          currentGuess={currentGuess}
          isRevealing={isRevealing}
          invalidGuessWiggle={invalidGuessWiggle}
        />
      )}
      {emptyRows}
    </div>
  )

  return <>{guessGrid}</>
}
