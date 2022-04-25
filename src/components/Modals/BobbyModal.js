import React from 'react'
// import './bobby.css'
import {
  bobbyWinGifs,
  bobbyLoseGifs,
  winInOnePhrase,
  winInTwoPhrase,
  winThreeFourPhrase,
  winInFivePhrase,
  winInSixPhrase,
  losePhrase,
  gameNotOverPhrase
} from '../../data/bobbyData.js'

export default function BobbyModal(props) {
  const { didWin, didLose, prevGuesses, exitBobby } = props

  const chooseGif = didWin
    ? bobbyWinGifs[Math.floor(Math.random() * bobbyWinGifs.length)]
    : bobbyLoseGifs[Math.floor(Math.random() * bobbyLoseGifs.length)]

  const choosePhrase = didLose
    ? losePhrase[Math.floor(Math.random() * losePhrase.length)]
    : !didWin
    ? gameNotOverPhrase[Math.floor(Math.random() * gameNotOverPhrase.length)]
    : prevGuesses.length === 1
    ? winInOnePhrase[Math.floor(Math.random() * winInOnePhrase.length)]
    : prevGuesses.length === 2
    ? winInTwoPhrase[Math.floor(Math.random() * winInTwoPhrase.length)]
    : prevGuesses.length === 3 || prevGuesses.length === 4
    ? winThreeFourPhrase[Math.floor(Math.random() * winThreeFourPhrase.length)]
    : prevGuesses.length === 5
    ? winInFivePhrase[Math.floor(Math.random() * winInFivePhrase.length)]
    : winInSixPhrase[Math.floor(Math.random() * winInSixPhrase.length)]

  const MarkUp = (
    <div className="modal__container bobby__container flex-column">
      <p className="modal__close" onClick={exitBobby}>
        X
      </p>
      <h1 className="modal__title bobby__title">{choosePhrase}</h1>
      <img
        src={chooseGif}
        className="winlose--bobby"
        alt="Bobby Shmurda Dancing"
      />
    </div>
  )

  return <div>{MarkUp}</div>
}
