import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

export default function Header(props) {
  const { darkMode } = useContext(ThemeContext)
  const { isModalOpen, toggleHelp, toggleStats, toggleSettings, toggleBobby } =
    props

  const header = (
    <header className="header__container flex-row border-bottom">
      <div className="header__icon-div flex-row">
        <button
          className="header__btn"
          onClick={toggleBobby}
          disabled={isModalOpen}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <button
          className="header__btn"
          onClick={toggleHelp}
          disabled={isModalOpen}
        >
          <i className="far fa-question-circle"></i>
        </button>
      </div>
      <h1
        className="header__title"
        style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
      >
        BOBBY SHMURDLE
      </h1>
      <div className="header__icon-div flex-row">
        <button
          className="header__btn"
          onClick={toggleStats}
          disabled={isModalOpen}
        >
          <i className="fas fa-chart-column"></i>
        </button>
        <button
          className="header__btn"
          onClick={toggleSettings}
          disabled={isModalOpen}
        >
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </header>
  )

  return <>{header}</>
}
