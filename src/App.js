import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HelpModal from './components/Modals/HelpModal'
import SettingsModal from './components/Modals/SettingsModal'
import StatsModal from './components/Modals/StatsModal'
import BobbyModal from './components/Modals/BobbyModal'
import GuessGrid from './components/GuessGrid/GuessGrid'
import Keyboard from './components/Keyboard/Keyboard'
import './app.css'
import { getNewWord, getLettersArray, shareResults } from './utils/gameUtils'
import {
  ANIME_DELAY,
  NUMBER_GUESSES,
  WIN_ANIME_DELAY,
  WIN_ANIME_DURATION,
  WORD_LENGTH
} from './data/gameSettings'
import { VALID_GUESSES } from './data/words/validGuesses'
import AnswerModal from './components/Modals/AnswerModal'

export default function App() {
  // THEME STATE
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const [darkMode, setDarkMode] = useState(prefersDarkMode)
  const [highContrastMode, setHighContrastMode] = useState(false)

  // MODAL DISPLAY STATE
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBobby, setShowBobby] = useState(false)

  // GAME STATE
  const [answer, setAnswer] = useState(getNewWord())
  const [currentGuess, setCurrentGuess] = useState([])
  const [prevGuesses, setPrevGuesses] = useState([])
  // USER STATS STATE
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
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
  // GAME CONTEXT STATE
  const [hardMode, setHardMode] = useState(false)
  const [invalidGuessWiggle, setInvalidGuessWiggle] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [didWin, setDidWin] = useState(false)
  const [didLose, setDidLose] = useState(false)

  // STATE LOGS
  console.log(answer)
  // console.log(currentGuess)
  // console.log(prevGuesses)

  // localStorage.clear()

  // GET EVERYTHING FROM LOCAL STORAGE ON PAGE LOAD
  useEffect(() => {
    const localStats = JSON.parse(localStorage.getItem('userStats'))
    const gameState = JSON.parse(localStorage.getItem('gameState'))
    const localDarkMode = JSON.parse(localStorage.getItem('localDarkMode'))
    const localHighContrastMode = JSON.parse(
      localStorage.getItem('localHighContrastMode')
    )
    // console.log(localStats)
    if (localStats) {
      setWins(localStats.wins)
      setLosses(localStats.losses)
      setStreak(localStats.streak)
      setMaxStreak(localStats.maxStreak)
      setGuessStats(localStats.guessStats)
    }
    if (gameState) {
      setAnswer(gameState.answer)
      setCurrentGuess(gameState.currentGuess)
      setPrevGuesses(gameState.prevGuesses)
      setDidWin(gameState.didWin)
      setDidLose(gameState.didLose)
      setHardMode(gameState.hardMode)
    }
    if (localDarkMode) setDarkMode(localDarkMode)
    if (localHighContrastMode) setHighContrastMode(localHighContrastMode)
    // if (gameState.didWin || gameState.didLose) setShowBobby(true)
  }, [])

  // SET USER STATS IN LOCAL STORAGE
  useEffect(() => {
    const userStats = {
      wins,
      losses,
      streak,
      maxStreak,
      guessStats
    }
    localStorage.setItem('userStats', JSON.stringify(userStats))
  }, [wins, losses, streak, maxStreak, guessStats])

  // SET GAME STATE IN LOCAL STORAGE
  useEffect(() => {
    const gameState = {
      answer,
      currentGuess,
      prevGuesses,
      didWin,
      didLose,
      hardMode
    }
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }, [answer, currentGuess, prevGuesses, didWin, didLose, hardMode])

  // SET DARK MODE IN LOCAL STORAGE IF USER CHANGES
  useEffect(() => {
    localStorage.setItem('localDarkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // SET HIGH CONTRAST MODE IN LOCAL STORAGE IF CHANGED
  useEffect(() => {
    localStorage.setItem(
      'localHighContrastMode',
      JSON.stringify(highContrastMode)
    )
  }, [highContrastMode])

  // FOCUS THE APP ON PAGE LOAD
  // useEffect(() => {
  //   const app = document.getElementById('app')
  //   setTimeout(() => {
  //     app.focus()
  //   }, 100)
  // }, [])

  // DISABLE HEADER BUTTONS IF MODAL OPEN
  useEffect(() => {
    if (showHelp || showStats || showSettings || showBobby) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [showHelp, showStats, showSettings, showBobby])

  // EVENT LISTENER FOR CHANGES IN BROWSER'S COLOR SCHEME PREFERENCE
  useEffect(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    colorSchemeQuery.addEventListener('change', (event) => {
      event.matches ? setDarkMode(true) : setDarkMode(false)
    })

    return () => {
      colorSchemeQuery.removeEventListener('change', (event) => {
        event.matches ? setDarkMode(true) : setDarkMode(false)
      })
    }
  }, [])

  //DARKMODE SET BACKGROUND COLOR
  useEffect(() => {
    if (darkMode) {
      // console.log("code class added")
      document.body.classList.add('dark-mode')
    } else {
      // console.log("code class removed")
      document.body.classList.remove('dark-mode')
      return
    }
  }, [darkMode])
  //DARKMODE SET BACKGROUND COLOR
  useEffect(() => {
    if (highContrastMode) {
      // console.log("code class added")
      document.body.classList.add('high-contrast')
    } else {
      // console.log("code class removed")
      document.body.classList.remove('high-contrast')
      return
    }
  }, [highContrastMode])

  // COMPUTER KEYBOARD
  const handleComputerKeyboard = (e) => {
    if (isRevealing) return
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
    if (isRevealing || didWin || didLose || invalidGuessWiggle) return
    if (currentGuess.length >= 0 && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prevCurrentGuess) => [...prevCurrentGuess, key])
    }
  }

  //USING APP KEYBOARD - BACKSPACE
  function handleBackspace() {
    if (isRevealing || didWin || didLose || invalidGuessWiggle) return
    if (currentGuess.length > 0) {
      setCurrentGuess((prevCurrentGuess) =>
        prevCurrentGuess.slice(0, prevCurrentGuess.length - 1)
      )
    } else return
  }

  const handleInvalidGuess = (message) => {
    setInvalidGuessWiggle(true)
    setTimeout(() => {
      setInvalidGuessWiggle(false)
      alert(message)
    }, WIN_ANIME_DURATION + 100)
  }

  function updateStats(str) {
    if (str === 'win') {
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
    } else if (str === 'loss') {
      setStreak(0)
      setLosses((prevLosses) => prevLosses + 1)
    }
  }

  function handleReveal(str) {
    setIsRevealing(true)
    setTimeout(() => {
      setPrevGuesses((prevPrevGuesses) => [...prevPrevGuesses, currentGuess])
      setCurrentGuess([])
      setIsRevealing(false)
      if (str === 'loss') {
        setShowBobby(true)
        setDidLose(true)
      }
    }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
    if (str === 'win') {
      setTimeout(() => {
        setShowBobby(true)
      }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY + WIN_ANIME_DELAY * WORD_LENGTH + 2 * WIN_ANIME_DELAY + 200)
    }
  }

  // HANDLE ENTER KEY
  function handleEnter() {
    // DISABLE BUTTON AFTER GAME ENDS OR DURING ANIMATIONS
    if (isRevealing || didWin || didLose || invalidGuessWiggle) return
    // HARD MODE CONDITION CHECKER
    if (hardMode && prevGuesses.length > 0) {
      const mustUseLetters = getLettersArray('must use', answer, prevGuesses)
      if (!mustUseLetters.every((letter) => currentGuess.includes(letter))) {
        handleInvalidGuess(
          'You must use all previously revealed hints in your guesses!'
        )
        return
      }
    }
    //HANDLE WORDS LESS THAN 5 LETTERS
    if (currentGuess.length !== WORD_LENGTH) {
      handleInvalidGuess("That ain't a 5 letter word!")
      return
      // CONDITION TO CHECK IF WORD IS ON WORDS LIST - NEED TO REF DICTIONARY
    } else if (!VALID_GUESSES.includes(currentGuess.join('').toLowerCase())) {
      handleInvalidGuess('Beep Boop - word does not register')
      return
      //HANDLE A WIN
    } else if (answer.every((letter, i) => letter === currentGuess[i])) {
      updateStats('win')
      setDidWin(true)
      handleReveal('win')
      return
      //HANDLE INCORRECT GUESS WITH GUESSES REMAINING
    } else if (
      prevGuesses.length >= 0 &&
      prevGuesses.length < NUMBER_GUESSES - 1
    ) {
      handleReveal('none')
      return
      //HANDLE LOSS
    } else if (
      prevGuesses.length === NUMBER_GUESSES - 1 &&
      currentGuess !== answer
    ) {
      updateStats('loss')
      handleReveal('loss')
    }
  }

  function newGame() {
    // setAnswer(['F', 'A', 'R', 'T', 'S'])
    setAnswer(getNewWord())
    setCurrentGuess([])
    setPrevGuesses([])
    setDidLose(false)
    setDidWin(false)
    setShowStats(false)
    setShowSettings(false)
  }

  // THEME TOGGLERS
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  function toggleHighContrastMode() {
    setHighContrastMode((prevMode) => !prevMode)
  }

  // HEADER MODAL TOGGLES
  function toggleHelp() {
    if (isRevealing || showBobby || showStats || showSettings) return
    setShowHelp((prev) => !prev)
  }

  function toggleStats() {
    if (isRevealing || showBobby || showHelp || showSettings) return
    setShowStats((prev) => !prev)
  }

  function toggleSettings() {
    if (isRevealing || showBobby || showHelp || showStats) return
    setShowSettings((prev) => !prev)
  }

  function toggleBobby() {
    if (isRevealing || showSettings || showHelp || showStats) return
    setShowBobby((prev) => !prev)
  }

  function exitBobby() {
    setShowBobby(false)
    setShowStats(true)
  }

  function toggleHardMode() {
    setHardMode((prev) => !prev)
  }

  function handleShare() {
    if (!didWin && !didLose) {
      alert('Finish your game to share your score!')
      return
    }

    shareResults(answer, prevGuesses, darkMode, highContrastMode, didWin)
  }

  const isModalOpen = showHelp || showStats || showSettings || showBobby

  return (
    <div
      className="app"
      id="app"
      onKeyDown={handleComputerKeyboard}
      tabIndex="0"
      selected
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
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          highContrastMode={highContrastMode}
          toggleHighContrastMode={toggleHighContrastMode}
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
          handleShare={handleShare}
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
        didWin={didWin}
        invalidGuessWiggle={invalidGuessWiggle}
      />
      <Keyboard
        handleKeyClick={handleKeyClick}
        handleBackspace={handleBackspace}
        handleEnter={handleEnter}
        answer={answer}
        prevGuesses={prevGuesses}
        isRevealing={isRevealing}
      />
      {didLose && <AnswerModal answer={answer} />}
    </div>
  )
}
