import React from 'react'
import { AudioProvider } from './context/AudioContext'
import AudioToggle from './components/ui/AudioToggle'
import HomePage from './pages/HomePage'
import AiBackground from './components/layout/AiBackground'

function App() {
  return (
    <AudioProvider>
      <AiBackground />
      <HomePage />
      <AudioToggle />
    </AudioProvider>
  )
}

export default App
