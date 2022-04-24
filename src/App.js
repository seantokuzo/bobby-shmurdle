import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import './app.css'

export default function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [hardMode, setHardMode] = useState(false)

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
        showHelp={showHelp}
        toggleHelp={toggleHelp}
        showStats={showStats}
        toggleStats={toggleStats}
        showSettings={showSettings}
        toggleSettings={toggleSettings}
        hardMode={hardMode}
        toggleHardMode={toggleHardMode}
      />
    </div>
  )
}
