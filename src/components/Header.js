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
          <i className="fa-solid fa-bars header__btn-icon"></i>
        </button>
        <button
          className="header__btn"
          onClick={toggleHelp}
          disabled={isModalOpen}
        >
          <i className="fa-regular fa-circle-question header__btn-icon"></i>
        </button>
      </div>
      <h1 className="header__title">BOBBY SHMURDLE</h1>
      <div className="header__icon-div flex-row">
        <button
          className="header__btn"
          onClick={toggleStats}
          disabled={isModalOpen}
        >
          <i className="fa-solid fa-chart-column header__btn-icon"></i>
        </button>
        <button
          className="header__btn"
          onClick={toggleSettings}
          disabled={isModalOpen}
        >
          <i className="fa-solid fa-gear header__btn-icon"></i>
        </button>
      </div>
    </header>
  )

  return <>{header}</>
}
