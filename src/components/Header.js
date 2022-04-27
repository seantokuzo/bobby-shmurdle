import React from 'react'

export default function Header(props) {
  const { toggleHelp, toggleStats, toggleSettings, toggleBobby } =
    props

  const header = (
    <header className="header__container flex-row border-bottom">
      <div className="header__icon-div flex-row">
        <i className="fa-solid fa-bars header__btn" onClick={toggleBobby}></i>
        <i
          className="fa-regular fa-circle-question header__btn"
          onClick={toggleHelp}
        ></i>
      </div>
      <h1 className="header__title">BOBBY SHMURDLE</h1>
      <div className="header__icon-div flex-row">
        <i
          className="fa-solid fa-chart-column header__btn"
          onClick={toggleStats}
        ></i>
        <i
          className="fa-solid fa-gear header__btn"
          onClick={toggleSettings}
        ></i>
      </div>
    </header>
  )

  return <>{header}</>
}
