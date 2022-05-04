import React from 'react'

export default function RestartModal(props) {
  const { resetCount, newGame, cancelRestart } = props

  const restartButtons = (
    <div className="stats__buttons-div flex-row">
      <div className="btn restart__btn restart__btn-yes" onClick={newGame}>
        <h3 className="btn--text">YAAAAAS</h3>
      </div>
      <span className="btn-divider">|</span>
      <div className="btn restart__btn restart__btn-no" onClick={cancelRestart}>
        <h3 className="btn--text">OH NOOOO</h3>
      </div>
    </div>
  )

  const strikes = resetCount === 0 ? '0' : new Array(resetCount).fill('❌').join(' ')

  return (
    <div className="modal__container restart__container flex-column">
      <h1 className="modal__title restart__title">Are you sure?</h1>
      <p className="modal__text restart__text">
        Starting a new game without finishing your previous game counts as a strike.
      </p>
      <p className="modal__text restart__text">
        Three strikes counts as a loss and your current streak will reset to{' '}
        <strong style={{ textDecoration: 'underline' }}>zero</strong>
      </p>
      <p className="modal__text restart__text">
        <strong>Current:</strong>
      </p>
      <h1 className="modal__title restart__strike">{strikes}</h1>
      {resetCount === 2 && (
        <p className="modal__text restart__text warning__text">
          If you restart now it will count as a loss
        </p>
      )}
      {restartButtons}
    </div>
  )
}
