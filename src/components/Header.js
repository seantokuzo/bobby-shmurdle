import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import './header.css'


export default function Header(props) {
  const { darkMode } = useContext(ThemeContext)

  const header = (
    <header
      className="header__div"
      style={{
        color: darkMode ? 'var(--dark-grey)' : 'var(--light-grey)',
        borderBottomColor: darkMode
          ? 'var(--dark-grey)'
          : 'var(--lightest-grey)'
      }}
    >
      <div className="question-non-div">
        <i className="fa-solid fa-bars header__icon header__hamburger"></i>
        <i
          className="far fa-question-circle header__icon header__question"
          onClick={props.toggleHelp}
        ></i>
      </div>
      <h1
        className="header__title"
        style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
      >
        BOBBY SHMURDLE
      </h1>
      <div className="chart-gear-div">
        <i
          className="fas fa-chart-column header__icon header__chart"
          onClick={props.toggleStats}
        ></i>
        <i
          className="fas fa-cog header__icon header__gear"
          onClick={props.toggleSettings}
        ></i>
      </div>
    </header>
  )

  return (
    <>
      {header}
    </>
  )
}
