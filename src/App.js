import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HelpModal from './components/Modals/HelpModal'
import SettingsModal from './components/Modals/SettingsModal'
import StatsModal from './components/Modals/StatsModal'
import BobbyModal from './components/Modals/BobbyModal'
import './app.css'
import './components/header.css'
import './components/Modals/help.css'
import './components/Modals/stats.css'
import './components/Modals/settings.css'
import './components/Modals/bobby.css'
import { getNewWord } from './utils/gameUtils'

export default function App() {
  // MODAL DISPLAY STATE
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBobby, setShowBobby] = useState(false)
  // HARD MODE STATE
  const [hardMode, setHardMode] = useState(false)
  // GAME STATE
  const [answer, setAnswer] = useState(getNewWord())
  console.log(answer)
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([1, 2, 3])
  const [didWin, setDidWin] = useState(true)
  const [didLose, setDidLose] = useState(false)
  // USER STATS STATE
  const [streak, setStreak] = useState(53)
  const [maxStreak, setMaxStreak] = useState(57)
  const [guessStats, setGuessStats] = useState({
    one: 1,
    two: 7,
    three: 23,
    four: 41,
    five: 34,
    six: 17
  })
  const [wins, setWins] = useState(
    Object.values(guessStats).reduce((a, b) => a + b)
  )
  const [losses, setLosses] = useState(Math.floor(wins * 0.1))

  // DISABLE HEADER BUTTONS IF MODAL OPEN
  useEffect(() => {
    if (showHelp || showStats || showSettings) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [showHelp, showStats, showSettings])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return window.addEventListener('keydown', handleKeyDown)
  })

  //COMPUTER KEYBOARD
  const handleKeyDown = (e) => {
    const letterRegex = /[a-zA-z]/
    //TOGGLE BOBBY, HELP. STATS AND SETTINGS WITH KEYBOARD ENTER KEY
    if (e.key === 'Enter' && bobby) {
      exitBobby()
      return
    } else if (e.key === 'Enter' && viewSettings) {
      toggleSettings()
      return
    } else if (e.key === 'Enter' && needHelp) {
      toggleHelp()
      return
    } else if (
      e.key === 'Enter' &&
      (viewStats || didWin || didLose)
    ) {
      toggleStats()
      return
      //ADD LETTER TO CURRENT GUESS IF CURRENT GUESS HAS ROOM
    } else if (
      e.key.length === 1 &&
      letterRegex.test(e.key) &&
      currentGuess.length >= 0 &&
      currentGuess.length < 5
    ) {
      setWordleState((prevWordleState) => ({
        ...prevWordleState,
        currentGuess: [...prevWordleState.currentGuess, e.key.toUpperCase()]
      }))
      return
      //HANDLE BACKSPACE
    } else if (
      e.key === 'Backspace' &&
      currentGuess.length > 0 &&
      currentGuess.length <= 5
    ) {
      return setWordleState((prevWordleState) => ({
        ...prevWordleState,
        currentGuess: prevWordleState.currentGuess.slice(
          0,
          prevWordleState.currentGuess.length - 1
        )
      }))
      //HANDLE ENTER KEY
    } else if (
      e.key === 'Enter' &&
      !didWin &&
      !didLose
    ) {
      submitGuess()
      return
    } else return
  }

  // HEADER MODAL TOGGLES
  function toggleHelp() {
    setShowHelp((prev) => !prev)
  }

  function toggleStats() {
    setShowStats((prev) => !prev)
  }

  function toggleSettings() {
    setShowSettings((prev) => !prev)
  }

  function toggleHardMode() {
    setHardMode((prev) => !prev)
  }

  function toggleBobby() {
    setShowBobby((prev) => !prev)
  }

  function exitBobby() {
    setShowBobby(false)
  }

  const isModalOpen = showHelp || showStats || showSettings || showBobby

  return (
    <div className="app">
      <Header
        isModalOpen={isModalOpen}
        toggleHelp={toggleHelp}
        toggleStats={toggleStats}
        toggleSettings={toggleSettings}
        toggleHardMode={toggleHardMode}
        toggleBobby={toggleBobby}
      />
      {showHelp && <HelpModal toggleHelp={toggleHelp} />}
      {showSettings && (
        <SettingsModal
          toggleSettings={toggleSettings}
          hardMode={hardMode}
          toggleHardMode={toggleHardMode}
        />
      )}
      {showStats && (
        <StatsModal
          toggleStats={toggleStats}
          userStats={{
            streak,
            maxStreak,
            wins,
            losses,
            guessStats
          }}
          didWin={didWin}
          lastGameGuessCount={prevGuesses.length}
          // newGame={newGame}
          // shareStats={shareStats}
        />
      )}
      {showBobby && (
        <BobbyModal
          exitBobby={exitBobby}
          didWin={didWin}
          didLose={didLose}
          prevGuesses={prevGuesses}
        />
      )}
    </div>
  )
}
