import { useState, useEffect } from 'react'
import { Clock, ArrowLeft } from 'lucide-react'

interface TimeSubmenuProps {
  onBack: () => void
  freezeTime: boolean
  onTimeUpdate: (hour: number, minute: number) => void
}

const timeOptions = [
  { label: 'Early Morning (06:00)', hour: 6, minute: 0 },
  { label: 'Morning (09:00)', hour: 9, minute: 0 },
  { label: 'Noon (12:00)', hour: 12, minute: 0 },
  { label: 'Afternoon (15:00)', hour: 15, minute: 0 },
  { label: 'Evening (18:00)', hour: 18, minute: 0 },
  { label: 'Night (21:00)', hour: 21, minute: 0 },
  { label: 'Midnight (00:00)', hour: 0, minute: 0 }
]

export const TimeSubmenu = ({ onBack, freezeTime, onTimeUpdate }: TimeSubmenuProps) => {
  const [customHour, setCustomHour] = useState<number>(12)
  const [customMinute, setCustomMinute] = useState<number>(0)

  useEffect(() => {
    const handleStatusUpdate = (event: MessageEvent) => {
      if (event.data.type === 'updateStatus') {
        const [hours, minutes] = event.data.data.currentTime.split(':').map(Number)
        setCustomHour(hours)
        setCustomMinute(minutes)
      }
    }

    window.addEventListener('message', handleStatusUpdate)
    return () => window.removeEventListener('message', handleStatusUpdate)
  }, [])

  const handleTimeSelect = (hour: number, minute: number) => {
    if (freezeTime) {
      fetch(`https://weather-menu/notify`, {
        method: 'POST',
        body: JSON.stringify({ 
          message: 'Time controls are locked. Disable time freeze to adjust time.'
        })
      })
      return
    }

    fetch(`https://weather-menu/setTime`, {
      method: 'POST',
      body: JSON.stringify({ hour, minute })
    })
    onTimeUpdate(hour, minute)
  }

  const handleCustomTime = () => {
    if (freezeTime) {
      fetch(`https://weather-menu/notify`, {
        method: 'POST',
        body: JSON.stringify({ 
          message: 'Time controls are locked. Disable time freeze to adjust time.'
        })
      })
      return
    }

    if (customHour >= 0 && customHour <= 23 && customMinute >= 0 && customMinute <= 59) {
      fetch(`https://weather-menu/setTime`, {
        method: 'POST',
        body: JSON.stringify({ hour: customHour, minute: customMinute })
      })
      onTimeUpdate(customHour, customMinute)
    } else {
      fetch(`https://weather-menu/notify`, {
        method: 'POST',
        body: JSON.stringify({ 
          message: 'Please enter valid hours (0-23) and minutes (0-59).'
        })
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-slate-700">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold">Time Controls</h2>
      </div>

      <div className="space-y-2">
        {timeOptions.map((option) => (
          <button
            key={option.hour}
            onClick={() => handleTimeSelect(option.hour, option.minute)}
            className="flex w-full items-center gap-2 rounded-lg bg-slate-800 p-3 hover:bg-slate-700"
          >
            <Clock className="h-5 w-5" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-700 pt-4">
        <h3 className="font-bold">Custom Time</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            max="23"
            value={customHour}
            onChange={(e) => setCustomHour(Number(e.target.value))}
            className="w-20 rounded bg-slate-700 px-2 py-1 text-center"
            placeholder="Hour"
          />
          <input
            type="number"
            min="0"
            max="59"
            value={customMinute}
            onChange={(e) => setCustomMinute(Number(e.target.value))}
            className="w-20 rounded bg-slate-700 px-2 py-1 text-center"
            placeholder="Minute"
          />
          <button
            onClick={handleCustomTime}
            className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-1 hover:bg-slate-700"
          >
            <Clock className="h-4 w-4" />
            <span>Set Time</span>
          </button>
        </div>
      </div>
    </div>
  )
}
