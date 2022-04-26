import { ANSWERS_LIST } from '../data/words/wordList'

export function getNewWord() {
  const randex = Math.floor(Math.random() * ANSWERS_LIST.length)
  const newWord = ANSWERS_LIST[randex].toUpperCase().split('')
  return newWord
}
