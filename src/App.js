import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HelpModal from './components/Modals/HelpModal'
import SettingsModal from './components/Modals/SettingsModal'
import StatsModal from './components/Modals/StatsModal'
import './app.css'
import { getNewWord } from './utils/gameUtils'

export default function App() {
  // MODAL DISPLAY STATE
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showBobby, setShowBobby] = useState(false)
  // HARD MODE STATE
  const [hardMode, setHardMode] = useState(false)
  // GAME STATE
  const [answer, setAnswer] = useState(getNewWord())
  console.log(answer)
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([1, 2, 3])
  const [didWin, setDidWin] = useState(false)
  const [didLose, setDidLose] = useState(false)
  // USER STATS STATE
  const [streak, setStreak] = useState(53)
  const [maxStreak, setMaxStreak] = useState(57)
  const [guessStats, setGuessStats] = useState({
    one: 1,
    two: 8,
    three: 125,
    four: 21,
    five: 23,
    six: 10
  })
  const [wins, setWins] = useState(
    Object.values(guessStats).reduce((a, b) => a + b)
  )
  const [losses, setLosses] = useState(0)

  useEffect(() => {
    if (showHelp || showStats || showSettings) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [showHelp, showStats, showSettings])

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

  return (
    <div className="app">
      <Header
        toggleHelp={toggleHelp}
        toggleStats={toggleStats}
        toggleSettings={toggleSettings}
        toggleHardMode={toggleHardMode}
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
    </div>
  )
}
