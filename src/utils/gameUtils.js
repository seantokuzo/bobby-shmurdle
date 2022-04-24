import { WORDS } from '../data/words/wordList'

export function getNewWord() {
  const randex = Math.floor(Math.random() * WORDS.length)
  const newWord = WORDS[randex].toUpperCase().split('')
  return newWord
}
