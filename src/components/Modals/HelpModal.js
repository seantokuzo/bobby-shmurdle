import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { nanoid } from 'nanoid'
// import './help.css'
import {
  helpTitle,
  helpSubtitle,
  helpText,
  exampleIndices,
  exampleWords
} from '../../data/modal-data/helpPageData.js'

// HELP PAGE COMPONENT
export default function HelpPage(props) {
  const { darkMode, highContrastMode } = useContext(ThemeContext)

  const helpBoxClasses = (mapIndex, target, boxStatus) => {
    if (mapIndex === target) {
      return `help__eg-box box box-filled ${boxStatus}`
    } else return 'help__eg-box box empty-box'
  }

  const exampleOne = exampleWords[0].map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div className={helpBoxClasses(index, exampleIndices[0], 'correct')}>
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  const exampleTwo = exampleWords[1].map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div className={helpBoxClasses(index, exampleIndices[1], 'wrong-spot')}>
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  const exampleThree = exampleWords[2].map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div className={helpBoxClasses(index, exampleIndices[2], 'incorrect')}>
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  return (
    <div className="help__container modal__container">
      <div className="help__rules-div border-bottom">
        <title>{helpTitle}</title>
        <h4 className="help__title modal__title">{helpTitle}</h4>
        <h4 className="help__close modal__close" onClick={props.toggleHelp}>
          X
        </h4>
        <p className="modal__text">{helpText[0]}</p>
        <p className="modal__text">{helpText[1]}</p>
        <p className="modal__text">{helpText[2]}</p>
      </div>
      <div className="help__examples border-bottom">
        <h4 className="modal__subtitle">{helpSubtitle}</h4>
        {exampleOne}
        <p className="modal__text">
          {helpText[3]}
          <strong>{exampleWords[0][exampleIndices[0]]}</strong>
          {helpText[4]}
        </p>
        {exampleTwo}
        <p className="modal__text">
          {helpText[3]}
          <strong>{exampleWords[1][exampleIndices[1]]}</strong>
          {helpText[5]}
        </p>
        {exampleThree}
        <p className="modal__text">
          {helpText[3]}
          <strong>{exampleWords[2][exampleIndices[2]]}</strong>
          {helpText[6]}
        </p>
      </div>
      <div>
        <h4 className="help__subtitle">
          <strong>{helpText[7]}</strong>
        </h4>
      </div>
    </div>
  )
}
