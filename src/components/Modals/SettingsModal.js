import React from 'react'

export default function SettingsModal(props) {
  const {
    darkMode,
    toggleDarkMode,
    highContrastMode,
    toggleHighContrastMode,
    toggleSettings,
    hardMode,
    toggleHardMode,
    handleNewGameWarning
  } = props

  const settingsTitleDiv = (
    <>
      <h4 className="modal__title settings___title">SETTINGS</h4>
      <h4 className="modal__close" onClick={toggleSettings}>
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
            <p className="setting--info">{info}</p>
            )}
          {name === 'Hard Mode' && (
            <p className="setting--info">Cannot be changed after first guess</p>
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
    hardMode,
    toggleHardMode
  )

  const darkModeSettings = createSetting('Dark Theme', '', darkMode, toggleDarkMode)

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
            href="https://github.com/seantokuzo/bobby-shmurdle/issues"
            className="settings__feedback-link settings__email"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>|</p>
        <p>
          <a
            href="https://twitter.com/seantokuzo"
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
    <div className="btn settings__btn" onClick={handleNewGameWarning}>
      <h3 className="btn--text">NEW GAME</h3>
    </div>
  )

  return (
    <div className="settings__container modal__container">
      <title>Bobby Shmurdle</title>
      {settingsTitleDiv}
      {hardModeSettings}
      {darkModeSettings}
      {highContrastSettings}
      {feedbackSettings}
      {newGameButton}
    </div>
  )
}
