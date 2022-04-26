import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HelpModal from './components/Modals/HelpModal'
import SettingsModal from './components/Modals/SettingsModal'
import StatsModal from './components/Modals/StatsModal'
import BobbyModal from './components/Modals/BobbyModal'
import GuessGrid from './components/GuessGrid/GuessGrid'
import Keyboard from './components/Keyboard/Keyboard'
import './app.css'
// import './components/Modals/stats.css'
// import './components/Modals/settings.css'
// import './components/Modals/bobby.css'
import { getNewWord } from './utils/gameUtils'
import { numberOfGuesses, wordLength } from './data/gameSettings'

export default function App() {
  // MODAL DISPLAY STATE
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBobby, setShowBobby] = useState(false)
  // HARD MODE STATE
  const [hardMode, setHardMode] = useState(false)
  // GAME STATE
  // const [answer, setAnswer] = useState(getNewWord())
  const [answer, setAnswer] = useState(['S', 'Q', 'D', 'E', 'S'])
  console.log(answer)
  const [currentGuess, setCurrentGuess] = useState(['A', 'S', 'S'])
  console.log(currentGuess)
  const [prevGuesses, setPrevGuesses] = useState([
    ['D', 'E', 'R', 'P', 'S'],
    ['B', 'U', 'R', 'P', 'S'],
    ['S', 'Q', 'R', 'P', 'S']
  ])
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
  const [isRevealing, setIsRevealing] = useState(true)

  // DISABLE HEADER BUTTONS IF MODAL OPEN
  useEffect(() => {
    if (showHelp || showStats || showSettings) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [showHelp, showStats, showSettings])

  // COMPUTER KEYBOARD
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return document.addEventListener('keydown', handleKeyDown)
  }, [])

  const handleKeyDown = (e) => {
    const letterRegex = /[a-zA-z]/
    //TOGGLE BOBBY, HELP. STATS AND SETTINGS WITH KEYBOARD ENTER KEY
    if (e.key === 'Enter' && showBobby) {
      exitBobby()
      return
    } else if (e.key === 'Enter' && showSettings) {
      toggleSettings()
      return
    } else if (e.key === 'Enter' && showHelp) {
      toggleHelp()
      return
    } else if (e.key === 'Enter' && (showStats || didWin || didLose)) {
      toggleStats()
      return
      //ADD LETTER TO CURRENT GUESS IF CURRENT GUESS HAS ROOM
    } else if (
      e.key.length === 1 &&
      letterRegex.test(e.key) &&
      currentGuess.length >= 0 &&
      currentGuess.length < wordLength
    ) {
      setCurrentGuess((prevCurrentGuess) => [
        ...prevCurrentGuess,
        e.key.toUpperCase()
      ])
      return
      //HANDLE BACKSPACE
    } else if (
      e.key === 'Backspace' &&
      currentGuess.length > 0 &&
      currentGuess.length <= 5
    ) {
      return setCurrentGuess((prevCurrentGuess) =>
        prevCurrentGuess.slice(0, prevCurrentGuess.length - 1)
      )
      //HANDLE ENTER KEY
    } else if (e.key === 'Enter' && !didWin && !didLose) {
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

  function handleKeyClick(key) {
    console.log(key)
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
      <div className="game__container flex-column">
        <GuessGrid
          answer={answer}
          currentGuess={currentGuess}
          prevGuesses={prevGuesses}
          isRevealing={isRevealing}
        />
        <Keyboard
          handleKeyClick={handleKeyClick}
          answer={answer}
          prevGuesses={prevGuesses}
        />
      </div>
    </div>
  )
}
