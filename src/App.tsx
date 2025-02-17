import { useState, useEffect } from 'react'
import { WeatherMenu } from './components/WeatherMenu'

interface Config {
  EnableTimeControl: boolean
  EnableTimeFreeze: boolean
  currentFreezeState: boolean
  currentWeather: string
  currentTime: string
  windSpeed: number
  windDirection: number
  blackoutEnabled: boolean
}

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [config, setConfig] = useState<Config>({
    EnableTimeControl: true,
    EnableTimeFreeze: true,
    currentFreezeState: false,
    currentWeather: 'CLEAR',
    currentTime: '12:00',
    windSpeed: 0.1,
    windDirection: 0,
    blackoutEnabled: false
  })

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'openMenu') {
        setIsVisible(true)
        setConfig(event.data.config)
      }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false)
        fetch('https://weather-menu/closeMenu', { method: 'POST' })
      }
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="h-screen w-screen">
      <WeatherMenu onClose={() => setIsVisible(false)} config={config} />
    </div>
  )
}

export default App
