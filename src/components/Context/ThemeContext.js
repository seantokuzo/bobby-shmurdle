import React, { useState } from 'react'
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
  const [darkMode, setDarkMode] = useState(true)
  const [highContrastMode, setHighContrastMode] = useState(false)

  
}
