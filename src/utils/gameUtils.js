import { ANSWERS_LIST } from '../data/words/wordList'

function getNewWord() {
  const randex = Math.floor(Math.random() * ANSWERS_LIST.length)
  const newWord = ANSWERS_LIST[randex].toUpperCase().split('')
  return newWord
}

function getLettersArray(str, answer, prevGuesses) {
  const guessedLettersArray = [
    ...new Set(prevGuesses.reduce((acc, guess) => [...acc, ...guess], []))
  ]

  const correct = guessedLettersArray.filter((letter) => {
    return prevGuesses.some((word) => word[answer.indexOf(letter)] === letter)
  })

  if (str === 'correct') {
    return correct
  }

  const wrongSpot = guessedLettersArray.filter((letter) => {
    return (
      answer.includes(letter) &&
      prevGuesses.some((word) => word.includes(letter)) &&
      !correct.includes(letter)
    )
  })

  if (str === 'wrong spot') {
    return wrongSpot
  }

  const incorrect = guessedLettersArray.filter((letter) => {
    return !correct.includes(letter) && !wrongSpot.includes(letter)
  })

  if (str === 'incorrect') {
    return incorrect
  }
}

export { getNewWord, getLettersArray }
