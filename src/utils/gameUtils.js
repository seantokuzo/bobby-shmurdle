import { ANSWERS_LIST } from '../data/words/wordList'
import { NUMBER_GUESSES } from '../data/gameSettings'

// GET A NEW ANSWER
function getNewWord() {
  const randex = Math.floor(Math.random() * ANSWERS_LIST.length)
  const newWord = ANSWERS_LIST[randex].toUpperCase().split('')
  return newWord
}

// GET ARRAYS OF CORRECT / WRONG SPOT / AND INCORRECT GUESSED LETTERS
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

  if (str === 'must use') {
    return [...correct, ...wrongSpot]
  }

  const incorrect = guessedLettersArray.filter((letter) => {
    return !correct.includes(letter) && !wrongSpot.includes(letter)
  })

  if (str === 'incorrect') {
    return incorrect
  }
}

// SHARE BUTTON FUNCTION
function shareResults(answer, prevGuesses, darkMode, highContrastMode, didWin) {
  const getSquare = (str) => {
    return str === 'correct' && highContrastMode
      ? '🟧'
      : str === 'correct'
      ? '🟩'
      : str === 'wrong spot' && highContrastMode
      ? '🟦'
      : str === 'wrong spot'
      ? '🟨'
      : darkMode
      ? '⬛'
      : '⬜'
  }

  let squareGrid = ''

  prevGuesses.map((guess, ind) => {
    guess.map((letter, i) => {
      if (letter === answer[i]) {
        squareGrid = squareGrid + getSquare('correct')
      } else if (answer.includes(letter)) {
        squareGrid = squareGrid + getSquare('wrong spot')
      } else if (!answer.includes(letter)) {
        squareGrid = squareGrid + getSquare('incorrect')
      }
      if (i === guess.length - 1 && ind !== prevGuesses.length - 1)
        squareGrid = squareGrid + '\n'
    })
  })

  const score = didWin
    ? `${prevGuesses.length}/${NUMBER_GUESSES}`
    : `X/${NUMBER_GUESSES}`
  const game = `${score}\nAnswer: '${answer.join('')}'\n\n${squareGrid}`
  const message = didWin
    ? `I beat Bobby Shmurdle!\n${game}`
    : `Shmurdle caught a body\n${game}`
  const shareObj = { text: message }

  let shareSuccess
  try {
    // if (attemptShare(shareObj)) {
    navigator.share(shareObj)
    shareSuccess = true
    // }
  } catch (error) {
    shareSuccess = false
  }
  if (!shareSuccess) {
    navigator.clipboard.writeText(message)
    alert('Score copied to clipboard')
  }
}

export { getNewWord, getLettersArray, shareResults }
