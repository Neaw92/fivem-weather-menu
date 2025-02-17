import { useState } from 'react'
import { ArrowLeft, Compass } from 'lucide-react'

interface WindSubmenuProps {
  onBack: () => void
  onWindUpdate: (speed: number, direction: number) => void
  currentSpeed: number
  currentDirection: number
}

export const WindSubmenu = ({ onBack, onWindUpdate, currentSpeed, currentDirection }: WindSubmenuProps) => {
  const [windSpeed, setWindSpeed] = useState(currentSpeed)
  const [windDirection, setWindDirection] = useState(currentDirection)

  const handleWindSpeedChange = (speed: number) => {
    setWindSpeed(speed)
    fetch('https://weather-menu/setWindSpeed', {
      method: 'POST',
      body: JSON.stringify({ speed })
    })
    onWindUpdate(speed, windDirection)
  }

  const handleWindDirectionChange = (direction: number) => {
    setWindDirection(direction)
    fetch('https://weather-menu/setWindDirection', {
      method: 'POST',
      body: JSON.stringify({ direction })
    })
    onWindUpdate(windSpeed, direction)
  }

  const windPresets = [
    { label: 'Calm', speed: 0.1 },
    { label: 'Light Breeze', speed: 2.0 },
    { label: 'Moderate', speed: 4.0 },
    { label: 'Strong', speed: 6.0 },
    { label: 'Storm', speed: 8.0 }
  ]

  const directionPresets = [
    { label: 'North', degrees: 0 },
    { label: 'Northeast', degrees: 45 },
    { label: 'East', degrees: 90 },
    { label: 'Southeast', degrees: 135 },
    { label: 'South', degrees: 180 },
    { label: 'Southwest', degrees: 225 },
    { label: 'West', degrees: 270 },
    { label: 'Northwest', degrees: 315 }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-slate-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold">Wind Controls</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-bold">Wind Speed: {windSpeed.toFixed(1)} m/s</h3>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={windSpeed}
            onChange={(e) => handleWindSpeedChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {windPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleWindSpeedChange(preset.speed)}
                className="rounded-lg bg-slate-800 p-2 text-sm hover:bg-slate-700"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <h3 className="mb-2 font-bold">Wind Direction: {windDirection}°</h3>
          <input
            type="range"
            min="0"
            max="359"
            value={windDirection}
            onChange={(e) => handleWindDirectionChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {directionPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleWindDirectionChange(preset.degrees)}
                className="flex items-center gap-2 rounded-lg bg-slate-800 p-2 text-sm hover:bg-slate-700"
              >
                <Compass className="h-4 w-4" />
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
