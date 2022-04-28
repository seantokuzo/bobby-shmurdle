import React from 'react'

export default function AnswerModal(props) {
  const { answer } = props
  return (
    <div className="modal__container answer__container flex-row">
      <h4 className="answer__text">
        Answer: <strong>{answer.join('')}</strong>
      </h4>
    </div>
  )
}
