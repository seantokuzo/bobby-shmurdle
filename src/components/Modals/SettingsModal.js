import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import './settings.css'

export default function SettingsModal(props) {
  const { darkMode, toggleDarkMode, highContrastMode, toggleHighContrastMode } =
    useContext(ThemeContext)

  const settingsTitleDiv = (
    <>
      <h4 className="modal__title settings___title">SETTINGS</h4>
      <h4 className="modal__close" onClick={props.toggleSettings}>
        X
      </h4>
    </>
  )

  const isTogglerOn = (mode) => {
    if (mode) {
      return 'settings__toggler settings__toggler-on'
    } else return 'settings__toggler'
  }

  const createSetting = (name, info, mode, toggler) => {
    return (
      <div
        className={
          info
            ? 'settings__setting-div border-bottom flex-row'
            : 'border-bottom settings_setting-div-dark flex-row'
        }
      >
        <div className="setting--name-div">
          <h5 className="setting--name">{name}</h5>
          {info && (
            <p className="setting--info">
              Any revealed hints must be used in subsequent guesses
            </p>
          )}
        </div>
        <div className="settings__toggler-div">
          <div className={isTogglerOn(mode)} onClick={toggler}>
            <div className="settings__toggler-circle"></div>
          </div>
        </div>
      </div>
    )
  }

  const hardModeSettings = createSetting(
    'Hard Mode',
    'Any revealed hints must be used in subsequent guesses',
    props.hardMode,
    props.toggleHardMode
  )

  const darkModeSettings = createSetting(
    'Dark Theme',
    '',
    darkMode,
    toggleDarkMode
  )

  const highContrastSettings = createSetting(
    'High Contrast Mode',
    'Enhances color accessibility',
    highContrastMode,
    toggleHighContrastMode
  )

  const feedbackSettings = (
    <div className="settings__feedback-div border-bottom flex-row">
      <h5 className="setting--name">Feedback</h5>
      <div className="settings__feedback-links-div">
        <p className="link">
          <a
            href="mailto:idontcarewhatyouthink@justkiddingidocare.com"
            className="settings__feedback-link settings__email"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
        </p>
        <p>|</p>
        <p>
          <a
            href="https://twitter.com/joebiden"
            className="settings__feedback-link settings__twitter"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>
      </div>
    </div>
  )
  const newGameButton = (
    <div className="btn settings__btn" onClick={props.newGame}>
      <h3 className="btn--text">NEW GAME</h3>
    </div>
  )

  return (
    <div className="settings__container modal__container">
      {settingsTitleDiv}
      {hardModeSettings}
      {darkModeSettings}
      {highContrastSettings}
      {feedbackSettings}
      {/* {settingsDarkMode}
      {settingsColorBlindMode}
      {settingsFeedback} */}
      {newGameButton}
    </div>
  )
}
