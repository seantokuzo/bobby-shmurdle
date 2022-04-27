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
import { ANIME_DELAY, NUMBER_GUESSES, WORD_LENGTH } from './data/gameSettings'
import { VALID_GUESSES } from './data/words/validGuesses'

export default function App() {
  // MODAL DISPLAY STATE
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBobby, setShowBobby] = useState(false)
  // HARD MODE STATE
  const [hardMode, setHardMode] = useState(false)
  // GAME STATE
  const [answer, setAnswer] = useState(['F', 'A', 'R', 'T', 'S'])
  // const [answer, setAnswer] = useState(getNewWord())
  // console.log(answer)
  const [currentGuess, setCurrentGuess] = useState([])
  // console.log(currentGuess)
  const [prevGuesses, setPrevGuesses] = useState([])
  const [didWin, setDidWin] = useState(false)
  const [didLose, setDidLose] = useState(false)
  // USER STATS STATE
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [guessStats, setGuessStats] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0
  })
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)

  // DISABLE HEADER BUTTONS IF MODAL OPEN
  useEffect(() => {
    if (showHelp || showStats || showSettings || showBobby) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [showHelp, showStats, showSettings, showBobby])

  // COMPUTER KEYBOARD
  const handleComputerKeyboard = (e) => {
    const letterRegex = /[a-zA-z]/
    //TOGGLE BOBBY, HELP. STATS AND SETTINGS WITH KEYBOARD ENTER KEY
    if (e.key === 'Enter' && showBobby && (didWin || didLose)) {
      exitBobby()
      return
    } else if (e.key === 'Enter' && showBobby) {
      toggleBobby()
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
      currentGuess.length < WORD_LENGTH
    ) {
      // console.log(currentGuess)
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
      handleEnter()
      return
    } else return
  }

  // HANDLE APP KEYBOARD
  //USING APP KEYBOARD - LETTERS
  function handleKeyClick(key) {
    if (currentGuess.length >= 0 && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prevCurrentGuess) => [...prevCurrentGuess, key])
    }
  }

  //USING APP KEYBOARD - BACKSPACE
  function handleBackspace() {
    if (currentGuess.length > 0) {
      setCurrentGuess((prevCurrentGuess) =>
        prevCurrentGuess.slice(0, prevCurrentGuess.length - 1)
      )
    } else return
  }

  // HANDLE ENTER KEY
  function handleEnter() {
    //HANDLE WORDS LESS THAN 5 LETTERS
    if (currentGuess.length !== WORD_LENGTH) {
      alert("That ain't a 5 letters fool")
      return
      // CONDITION TO CHECK IF WORD IS ON WORDS LIST - NEED TO REF DICTIONARY
    } else if (!VALID_GUESSES.includes(currentGuess.join('').toLowerCase())) {
      alert('Beep boop... cannot find your word on our (tiny) list')
      return
      //HANDLE A WIN
    } else if (answer.every((letter, i) => letter === currentGuess[i])) {
      setDidWin(true)
      setWins((prevWins) => prevWins + 1)
      setStreak((prevStreak) => prevStreak + 1)
      if (streak + 1 > maxStreak) {
        setMaxStreak((prevMaxStreak) => prevMaxStreak + 1)
      }
      setGuessStats((prevGuessStats) => {
        const numberOfGuesses = prevGuesses.length
        const key = Object.keys(guessStats)[numberOfGuesses]
        return {
          ...prevGuessStats,
          [key]: prevGuessStats[key] + 1
        }
      })
      setIsRevealing(true)
      setTimeout(() => {
        setIsRevealing(false)
        setShowBobby(true)
        setPrevGuesses((prevPrevGuesses) => [...prevPrevGuesses, currentGuess])
        setCurrentGuess([])
      }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
      console.log('You win!')
      return
      //HANDLE INCORRECT GUESS WITH GUESSES REMAINING
    } else if (
      prevGuesses.length >= 0 &&
      prevGuesses.length < NUMBER_GUESSES - 1
    ) {
      setIsRevealing(true)
      setTimeout(() => {
        setIsRevealing(false)
        setPrevGuesses((prevPrevGuesses) => [...prevPrevGuesses, currentGuess])
        setCurrentGuess([])
      }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
      return
      //HANDLE LOSS
    } else if (
      prevGuesses.length === NUMBER_GUESSES - 1 &&
      currentGuess !== answer
    ) {
      setIsRevealing(true)
      setDidLose(true)
      setStreak(0)
      setLosses((prevLosses) => prevLosses + 1)
      setTimeout(() => {
        setPrevGuesses((prevPrevGuesses) => [...prevPrevGuesses, currentGuess])
        setCurrentGuess([])
        setIsRevealing(false)
        setShowBobby(true)
      }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
    }
  }

  function newGame() {
    //HANDLE NEW GAME PRESS DURING CURRENT GAME
    setAnswer(['F', 'A', 'R', 'T', 'S'])
    // setAnswer(getNewWord())
    setCurrentGuess([])
    setPrevGuesses([])
    setDidLose(false)
    setDidWin(false)
    setShowStats(false)
    setShowSettings(false)
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
    setShowStats(true)
  }

  const isModalOpen = showHelp || showStats || showSettings || showBobby

  return (
    <div
      className="app"
      onKeyDown={handleComputerKeyboard}
      tabIndex="0"
      selected="selected"
    >
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
          newGame={newGame}
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
          newGame={newGame}
          // shareStats={shareStats}
        />
      )}
      {showBobby && (
        <BobbyModal
          exitBobby={exitBobby}
          toggleBobby={toggleBobby}
          didWin={didWin}
          didLose={didLose}
          prevGuesses={prevGuesses}
        />
      )}
      <GuessGrid
        answer={answer}
        currentGuess={currentGuess}
        prevGuesses={prevGuesses}
        isRevealing={isRevealing}
      />
      <Keyboard
        handleKeyClick={handleKeyClick}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter}
        answer={answer}
        prevGuesses={prevGuesses}
        isRevealing={isRevealing}
      />
    </div>
  )
}
