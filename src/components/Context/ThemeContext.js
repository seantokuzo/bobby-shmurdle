import React, { useState, useEffect } from 'react'
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [darkMode, setDarkMode] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode)
  }

  function toggleHighContrastMode() {
    setHighContrastMode((prevMode) => !prevMode)
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      const newColorScheme = event.matches ? 'dark' : 'light'
    })

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
  })

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

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        highContrastMode,
        toggleHighContrastMode
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext }
