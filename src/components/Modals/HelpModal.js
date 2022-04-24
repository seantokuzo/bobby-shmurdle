import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { nanoid } from 'nanoid'
import './help.css'

export default function HelpPage(props) {
  const { darkMode, highContrastMode } = useContext(ThemeContext)
  const weary = ['A', 'N', 'G', 'R', 'Y']
  const farts = ['M', 'O', 'I', 'S', 'T']
  const moist = ['F', 'A', 'R', 'T', 'S']

  const helpBoxDarkMode = darkMode
    ? 'help__eg-box-dark box empty-box'
    : 'help__eg-box box empty-box'

  const exampleOne = weary.map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div
          className={index === 0 ? 'help__eg-box box correct' : helpBoxDarkMode}
        >
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  const exampleTwo = farts.map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div
          className={
            index === 1 ? 'help__eg-box box wrong-spot' : helpBoxDarkMode
          }
        >
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  const exampleThree = moist.map((item, index) => {
    return (
      <div className="help__eg-div" key={nanoid()}>
        <div
          className={
            index === 0 ? 'help__eg-box box incorrect' : helpBoxDarkMode
          }
        >
          <h2 className="help__eg-text">{item}</h2>
        </div>
      </div>
    )
  })
  return (
    <div
      className="help__container fadein"
      style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
    >
      <div
        className="help__how-to-play"
        style={{
          borderBottomColor: darkMode
            ? 'var(--dark-grey)'
            : 'var(--lightest-grey)'
        }}
      >
        <title>HOW TO PLAY</title>
        <h4 className="popup--title">HOW TO PLAY</h4>
        <h4 className="help__close" onClick={props.toggleHelp}>
          X
        </h4>
        <p className="popup--text">Guess the word in 6 tries.</p>
        <p className="popup--text">
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p className="popup--text">
          After each guess, the color of the tiles will change to show how close
          your guess was to the word
        </p>
      </div>
      <div
        className="help__examples"
        style={{
          borderBottomColor: darkMode
            ? 'var(--dark-grey)'
            : 'var(--lightest-grey)'
        }}
      >
        <h4 className="help__subtitle">Examples</h4>
        {exampleOne}
        <p className="popup--text">
          The letter <strong>A</strong> is in the word and in the corrent spot.
        </p>
        {exampleTwo}
        <p className="popup--text">
          The letter <strong>O</strong> is in the word but in a stinky spot.
        </p>
        {exampleThree}
        <p className="popup--text">
          The letter <strong>T</strong> is not in any spot
        </p>
      </div>
      <div>
        <h4 className="help__subtitle">
          <strong>Don't let Bobby Shmurdle down</strong>
        </h4>
      </div>
    </div>
  )
}
