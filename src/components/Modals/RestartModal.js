import React from 'react'
import { nanoid } from 'nanoid'

export default function RestartModal(props) {
  const { resetCount, newGame, cancelRestart } = props

  const restartButtons = (
    <div className="stats__buttons-div flex-row">
      <div className="btn restart__btn restart__btn-yes" onClick={newGame}>
        <h3 className="btn--text">YEEEE</h3>
      </div>
      <span className="btn-divider">|</span>
      <div className="btn restart__btn restart__btn-no" onClick={cancelRestart}>
        <h3 className="btn--text">NOOOO</h3>
      </div>
    </div>
  )

  const strikes =
    resetCount === 0 ? (
      '0'
    ) : (
      <>
        {new Array(resetCount).fill('').map((slot) => {
          return <i className="fa-solid fa-x restart__x-icon warning__text" key={nanoid()}></i>
        })}
      </>
    )

  return (
    <div className="modal__container restart__container flex-column">
      <h1 className="modal__title restart__title">Are you sure?</h1>
      <p className="modal__subtitle restart__text">
        Starting a new game without finishing your current game counts as a strike.
      </p>
      <p className="modal__subtitle restart__text">
        Three strikes and you lose! Your current win streak will reset to{' '}
        <strong className="warning__text" style={{ textDecoration: 'underline' }}>
          zero
        </strong>
      </p>
      <p className="modal__subtitle restart__text">
        Strikes reset to <span style={{ textDecoration: 'underline' }}>zero</span> when a game is
        finished
      </p>
      <p className="modal__subtitle restart__text">
        <strong>Current strikes:</strong>
      </p>
      <h1 className="modal__title restart__strike">{strikes}</h1>
      {resetCount === 2 && (
        <p
          className="modal__subtitle restart__text warning__text"
          style={{ textDecoration: 'underline' }}
        >
          If you restart now it will count as a loss
        </p>
      )}
      {restartButtons}
    </div>
  )
}
