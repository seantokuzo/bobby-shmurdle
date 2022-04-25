import React, { useState, useEffect, useContext } from 'react'
// import './stats.css'
import { ThemeContext } from '../context/ThemeContext'

export default function StatsModal(props) {
  const { darkMode, highContrastMode } = useContext(ThemeContext)

  // WINDOW WIDTH STATE FOR CHART BAR WIDTH
  const [windowWidth, setWindowWidth] = useState(0)
  // console.log(windowWidth)

  const maxBarWidth =
    windowWidth > 450
      ? 325
      : windowWidth > 425
      ? 300
      : windowWidth > 400
      ? 275
      : windowWidth > 350
      ? 250
      : 200

  // DESTRUCTURE USER STATS FROM PROPS
  const { streak, maxStreak, wins, losses, guessStats } = props.userStats

  const guessStatsValues = Object.values(guessStats)
  const maxGuessStat = Math.max(...guessStatsValues)

  const chartWidthArray = guessStatsValues.map((n) => {
    if (guessStatsValues.every((val) => val <= 13)) {
      return (n + 1) * 20
    } else if (n && wins) {
      return Math.floor((n / maxGuessStat) * maxBarWidth)
    } else return 20
  })

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })

    return window.removeEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
  }, [windowWidth])

  const stats = (
    <div className="stats__stat--nonchart-container flex-row">
      <div className="stat--nonchart-div">
        <h2 className="stat--nonchart-stat">{wins + losses}</h2>
        <p className="stat--nonchart-text">Played</p>
        <br />
      </div>
      <div className="stat--nonchart-div">
        <h2 className="stat--nonchart-stat">
          {wins + losses === 0 ? 0 : Math.floor((wins / (wins + losses)) * 100)}
        </h2>
        <p className="stat--nonchart-text">Win %</p>
        <br />
      </div>
      <div className="stat--nonchart-div">
        <h2 className="stat--nonchart-stat">{streak}</h2>
        <p className="stat--nonchart-text min-content">Current Streak</p>
      </div>
      <div className="stat--nonchart-div">
        <h2 className="stat--nonchart-stat">{maxStreak}</h2>
        <p className="stat--nonchart-text min-content">Max Streak</p>
      </div>
    </div>
  )

  const chart = guessStatsValues.map((n, i) => (
    <div className="stats--chart-div" key={`chart-bar${i}`}>
      <div className="chart-guess-stat-div">
        <div className="chart-label-div">
          <p className="chart-guess-stat-label">{i + 1}</p>
        </div>
        <div
          className={
            props.didWin && props.lastGameGuessCount === i + 1
              ? 'chart-bar-div correct'
              : 'chart-bar-div'
          }
          style={{ width: chartWidthArray[i] + 'px' }}
        >
          <p className="chart-bar-text">{guessStatsValues[i]}</p>
        </div>
      </div>
    </div>
  ))

  const statsButtons = (
    <div className="stats__buttons-div">
      <div className="btn stats__btn" onClick={props.newGame}>
        <h3 className="btn--text">NEW GAME</h3>
      </div>
      <span className="stats__btn-divider">|</span>
      <div
        className="btn stats__btn stats__btn-share"
        onClick={props.shareStats}
      >
        <h3 className="btn--text">SHARE</h3>
        <i className="fas fa-share-alt share-icon"></i>
      </div>
    </div>
  )

  return (
    <div className="modal__container stats__container">
      <title>BOBBY SHMURDLE STATS</title>
      <h4 className="modal__title stats__title">STATISTICS</h4>
      <h4 className="modal__close" onClick={props.toggleStats}>
        X
      </h4>
      {stats}
      <h4 className="modal__title stats__chart-title">GUESS DISTRIBUTION</h4>
      {chart}
      {statsButtons}
    </div>
  )
}
