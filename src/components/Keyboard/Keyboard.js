import React from 'react'
import { nanoid } from 'nanoid'
// import { WORD_LENGTH, ANIME_DELAY } from '../../data/gameSettings'

export default function Keyboard(props) {
  const { answer, prevGuesses, handleKeyClick, handleBackspace, handleEnter } = props

  const guessedLettersArray = [
    ...new Set(
      prevGuesses.reduce((acc, guess) => {
        return [...acc, ...guess]
      }, [])
    )
  ]

  const correctLetters = guessedLettersArray.filter((letter) => {
    return prevGuesses.some((word) => word[answer.indexOf(letter)] === letter)
  })

  const wrongSpotLetters = guessedLettersArray.filter((letter) => {
    return (
      answer.includes(letter) &&
      prevGuesses.some((word) => word.includes(letter)) &&
      !correctLetters.includes(letter)
    )
  })

  const incorrectLetters = guessedLettersArray.filter((letter) => {
    return (
      !correctLetters.includes(letter) && !wrongSpotLetters.includes(letter)
    )
  })

  const areYouCorrect = (letter) => correctLetters.includes(letter)
  const areYouWrongSpot = (letter) => wrongSpotLetters.includes(letter)
  const areYouIncorrect = (letter) => incorrectLetters.includes(letter)

  const getKeyClassName = (key) => {
    return areYouCorrect(key)
      ? 'keys__key keys__key-letter correct key--guessed'
      : areYouWrongSpot(key)
      ? 'keys__key keys__key-letter wrong-spot key--guessed'
      : areYouIncorrect(key)
      ? 'keys__key keys__key-letter incorrect key--guessed'
      : 'keys__key keys__key-letter'
  }

  const enterKey = (
    <div
      key="Enter"
      className="keys__key keys__key-btn keys__key-enter"
      onClick={handleEnter}
    >
      <p>ENTER</p>
    </div>
  )

  const backspaceKey = (
    <div
      key="backspace"
      className="keys__key keys__key-btn"
      onClick={handleBackspace}
    >
      <i className="fa-solid fa-delete-left keys__key-backspace"></i>
    </div>
  )

  const topRow = (
    <div className="keys__row-div">
      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleKeyClick(key)}
          key={nanoid()}
        >
          <p className="keys__key-text">{key}</p>
        </div>
      ))}
    </div>
  )

  const middleRow = (
    <div className="keys__row-div">
      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleKeyClick(key)}
          key={nanoid()}
        >
          <p className="keys__key-text">{key}</p>
        </div>
      ))}
    </div>
  )

  const bottomRow = (
    <div className="keys__row-div">
      {enterKey}
      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
        <div
          className={getKeyClassName(key)}
          id={`${key}`}
          onClick={() => handleKeyClick(key)}
          key={nanoid()}
        >
          <p className="keys__key-text">{key}</p>
        </div>
      ))}
      {backspaceKey}
    </div>
  )

  return (
    <div className="keys__container">
      {topRow}
      {middleRow}
      {bottomRow}
    </div>
  )
}
