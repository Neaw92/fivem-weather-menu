import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudRain, CloudSun, Snowflake, Ghost, ArrowLeft, CloudLightning } from 'lucide-react'

interface WeatherSubmenuProps {
  onBack: () => void
  onWeatherUpdate: (weatherName: string) => void
}

const weatherOptions = [
    { weatherId: 'CLEAR', weatherName: 'Clear', icon: Sun },
    { weatherId: 'EXTRASUNNY', weatherName: 'Extra Sunny', icon: Sun },
    { weatherId: 'CLEARING', weatherName: 'Clearing', icon: CloudRain },
    { weatherId: 'CLOUDS', weatherName: 'Cloudy', icon: Cloud },
    { weatherId: 'NEUTRAL', weatherName: 'Neutral', icon: CloudSun },
    { weatherId: 'OVERCAST', weatherName: 'Overcast', icon: Cloud },
    { weatherId: 'RAIN', weatherName: 'Rain', icon: CloudRain },
    { weatherId: 'THUNDER', weatherName: 'Thunder', icon: CloudLightning },
    { weatherId: 'FOGGY', weatherName: 'Foggy', icon: Cloud },
    { weatherId: 'SMOG', weatherName: 'Smog', icon: Cloud },
    { weatherId: 'BLIZZARD', weatherName: 'Blizzard', icon: Snowflake },
    { weatherId: 'SNOW', weatherName: 'Snow', icon: Snowflake },
    { weatherId: 'SNOWLIGHT', weatherName: 'Snow (Light)', icon: Snowflake },
    { weatherId: 'HALLOWEEN', weatherName: 'Halloween', icon: Ghost },
    { weatherId: 'XMAS', weatherName: 'Christmas', icon: Snowflake }
]

export const WeatherSubmenu = ({ onBack, onWeatherUpdate }: WeatherSubmenuProps) => {
  const [currentWeather, setCurrentWeather] = useState('')

  useEffect(() => {
    const handleStatusUpdate = (event: MessageEvent) => {
      if (event.data.type === 'updateStatus') {
        setCurrentWeather(event.data.data.currentWeather)
      }
    }

    window.addEventListener('message', handleStatusUpdate)
    return () => window.removeEventListener('message', handleStatusUpdate)
  }, [])

  const handleWeatherSelect = (weatherId: string, weatherName: string) => {
    fetch(`https://weather-menu/setWeather`, {
      method: 'POST',
      body: JSON.stringify({ weatherId })
    })
    onWeatherUpdate(weatherName)
    setCurrentWeather(weatherName)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-slate-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold">Weather Options</h2>
      </div>
      
      <div className="space-y-2">
        {weatherOptions.map((option) => (
          <button
            key={option.weatherId}
            onClick={() => handleWeatherSelect(option.weatherId, option.weatherName)}
            className={`flex w-full items-center gap-2 rounded-lg ${
              currentWeather === option.weatherName ? 'bg-slate-700' : 'bg-slate-800'
            } p-3 hover:bg-slate-700`}
          >
            <option.icon className="h-5 w-5" />
            <span>{option.weatherName}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
