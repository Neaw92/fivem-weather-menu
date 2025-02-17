import { useState, useEffect } from 'react'
import { Sun, Clock, Lock, LockOpen, Wind, Moon } from 'lucide-react'
import { WeatherSubmenu } from './WeatherSubmenu'
import { TimeSubmenu } from './TimeSubmenu'
import { WindSubmenu } from './WindSubmenu'

interface WeatherMenuProps {
  onClose: () => void;
  config: {
    EnableTimeControl: boolean;
    EnableTimeFreeze: boolean;
    currentFreezeState: boolean;
    currentWeather: string;
    currentTime: string;
    windSpeed: number;
    windDirection: number;
    blackoutEnabled: boolean;
  }
}

export const WeatherMenu = ({ onClose, config }: WeatherMenuProps) => {
  const [freezeTime, setFreezeTime] = useState(config.currentFreezeState)
  const [activeMenu, setActiveMenu] = useState('main')
  const [currentWeather, setCurrentWeather] = useState(config.currentWeather)
  const [currentTime, setCurrentTime] = useState(config.currentTime)
  const [windSpeed, setWindSpeed] = useState(config.windSpeed)
  const [windDirection, setWindDirection] = useState(config.windDirection)
  const [blackoutEnabled, setBlackoutEnabled] = useState(config.blackoutEnabled)

  useEffect(() => {
    const handleStatusUpdate = (event: MessageEvent) => {
      if (event.data.type === 'updateStatus') {
        setCurrentTime(event.data.data.currentTime)
        setCurrentWeather(event.data.data.currentWeather)
        setWindSpeed(event.data.data.windSpeed)
        setWindDirection(event.data.data.windDirection)
        setBlackoutEnabled(event.data.data.blackoutEnabled)
      }
    }

    window.addEventListener('message', handleStatusUpdate)
    return () => window.removeEventListener('message', handleStatusUpdate)
  }, [])

  useEffect(() => {
    setFreezeTime(config.currentFreezeState)
    setCurrentWeather(config.currentWeather)
    setCurrentTime(config.currentTime)
    setWindSpeed(config.windSpeed)
    setWindDirection(config.windDirection)
    setBlackoutEnabled(config.blackoutEnabled)
  }, [config])

  const handleClose = () => {
    onClose()
    fetch('https://weather-menu/closeMenu', {
      method: 'POST'
    })
  }

  const handleFreezeTime = (frozen: boolean) => {
    setFreezeTime(frozen)
    fetch('https://weather-menu/freezeTime', {
      method: 'POST',
      body: JSON.stringify({ frozen })
    })
  }

  const handleBlackout = () => {
    const newState = !blackoutEnabled
    setBlackoutEnabled(newState)
    fetch('https://weather-menu/toggleBlackout', {
      method: 'POST',
      body: JSON.stringify({ enabled: newState })
    })
  }

  const updateWeather = (newWeather: string) => {
    setCurrentWeather(newWeather)
  }

  const updateTime = (hour: number, minute: number) => {
    setCurrentTime(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
  }

  const updateWind = (speed: number, direction: number) => {
    setWindSpeed(speed)
    setWindDirection(direction)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-lg bg-slate-900 p-4 text-white shadow-xl">
        {activeMenu === 'main' && (
          <>
            <h2 className="mb-4 text-xl font-bold">🌍 Weather & Time Control</h2>
            
            <div className="mb-6 rounded-lg bg-slate-800 p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-400">Current Weather</h3>
                  <p className="text-lg flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    {currentWeather}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <h3 className="text-sm font-semibold text-slate-400">Current Time</h3>
                  <p className="text-lg flex items-center gap-2 justify-end">
                    <Clock className="h-4 w-4" />
                    {currentTime}
                  </p>
                </div>
              </div>
              <div className="text-center border-t border-slate-700 pt-3">
                <span className="text-sm font-semibold text-slate-400 flex items-center justify-center gap-2">
                  {freezeTime ? <Lock className="h-4 w-4" /> : <LockOpen className="h-4 w-4" />}
                  Time is {freezeTime ? 'Frozen' : 'Running'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setActiveMenu('weather')}
                className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  <span>Weather Options</span>
                </div>
              </button>

              {config.EnableTimeControl && (
                <button 
                  onClick={() => setActiveMenu('time')}
                  className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>Time Controls</span>
                  </div>
                </button>
              )}

              <button 
                onClick={() => setActiveMenu('wind')}
                className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  <span>Wind Controls</span>
                </div>
                <div className="text-sm text-slate-400">
                  {windSpeed.toFixed(1)} m/s
                </div>
              </button>

              <button 
                onClick={handleBlackout}
                className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  <span>{blackoutEnabled ? 'Disable Blackout' : 'Enable Blackout'}</span>
                </div>
              </button>

              {config.EnableTimeFreeze && (
                <button 
                  onClick={() => handleFreezeTime(!freezeTime)}
                  className="flex w-full items-center justify-between rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
                >
                  <div className="flex items-center gap-2">
                    {freezeTime ? <LockOpen className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                    <span>{freezeTime ? 'Unfreeze Time' : 'Freeze Time'}</span>
                  </div>
                </button>
              )}

              <button 
                onClick={handleClose}
                className="mt-4 w-full rounded-lg bg-red-600 p-2 hover:bg-red-700"
              >
                Close Menu
              </button>
            </div>
          </>
        )}

        {activeMenu === 'weather' && <WeatherSubmenu onBack={() => setActiveMenu('main')} onWeatherUpdate={updateWeather} />}
        {activeMenu === 'time' && <TimeSubmenu onBack={() => setActiveMenu('main')} freezeTime={freezeTime} onTimeUpdate={updateTime} />}
        {activeMenu === 'wind' && <WindSubmenu onBack={() => setActiveMenu('main')} onWindUpdate={updateWind} currentSpeed={windSpeed} currentDirection={windDirection} />}
      </div>
    </div>
  )
}
