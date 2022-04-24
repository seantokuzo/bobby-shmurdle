import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import './header.css'
import HelpModal from './Modals/HelpModal'

export default function Header(props) {
  const { darkMode } = useContext(ThemeContext)

  const header = (
    <header
      className="header--div"
      style={{
        color: darkMode ? 'var(--dark-grey)' : 'var(--light-grey)',
        borderBottomColor: darkMode
          ? 'var(--dark-grey)'
          : 'var(--lightest-grey)'
      }}
    >
      <div className="question-non-div">
        <i
          className="far fa-question-circle header--icon header--question"
          onClick={props.toggleHelp}
        ></i>
        <div className="header--non"></div>
      </div>
      <h1
        className="header--title"
        style={{ color: darkMode ? '#FFFFFF' : '#000000' }}
      >
        BOBBY SHMURDLE
      </h1>
      <div className="chart-gear-div">
        <i
          className="fas fa-chart-bar header--icon header--chart"
          onClick={props.toggleStats}
        ></i>
        <i
          className="fas fa-cog header--icon header--gear"
          onClick={props.toggleSettings}
        ></i>
      </div>
    </header>
  )

  return (
    <>
      {header}
      {props.showHelp && <HelpModal />}
    </>
  )
}
