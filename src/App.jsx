import React from 'react'
import { AudioProvider } from './context/AudioContext'
import AudioToggle from './components/ui/AudioToggle'
import HomePage from './pages/HomePage'

function App() {
  return (
    <AudioProvider>
      <HomePage />
      <AudioToggle />
    </AudioProvider>
  )
}

export default App
