import React from 'react'
import { nanoid } from 'nanoid'
import FilledRow from './FilledRow'
import CurrentRow from './CurrentRow'
import EmptyRow from './EmptyRow'
import { NUMBER_GUESSES } from '../../data/gameSettings'

export default function GuessGrid(props) {
  const { answer, currentGuess, prevGuesses, isRevealing } = props

  const filledRows = prevGuesses.map((guess, i) => (
    <FilledRow
      guess={guess}
      answer={answer}
      key={nanoid()}
      index={i}
      isRevealing={isRevealing}
      prevGuesses={prevGuesses}
    />
  ))

  const howManyEmpty = NUMBER_GUESSES - 1 - prevGuesses.length

  const emptyRows = new Array(howManyEmpty)
    .fill('')
    .map((slot, i) => <EmptyRow key={nanoid()} />)

  const guessGrid = (
    <div className="grid__container">
      {filledRows}
      <CurrentRow currentGuess={currentGuess} />
      {emptyRows}
    </div>
  )

  return <>{guessGrid}</>
}
