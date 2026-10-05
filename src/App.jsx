import React, { lazy, Suspense } from 'react'
import { AudioProvider } from './context/AudioContext'
import AudioToggle from './components/ui/AudioToggle'
import HomePage from './pages/HomePage'
import WatchesPage from './pages/WatchesPage'
import useRoute from './hooks/useRoute'

// Purely decorative background effect (react-tsparticles) — deferred into its
// own chunk so it doesn't block the initial bundle parse/paint.
const AiBackground = lazy(() => import('./components/layout/AiBackground'))

function App() {
  const { route } = useRoute()

  if (route === 'watches') {
    return <WatchesPage />
  }

  return (
    <AudioProvider>
      <Suspense fallback={null}>
        <AiBackground />
      </Suspense>
      <HomePage />
      <AudioToggle />
    </AudioProvider>
  )
}

export default App

