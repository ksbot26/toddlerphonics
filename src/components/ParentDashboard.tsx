import { useState } from 'react'
import { ArrowLeft, Lock, Settings, BarChart3, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import type { Level, Progress } from '../types'
import content from '../data/content.json'

interface ParentDashboardProps {
  progress: Progress
  levels: Level[]
  onBack: () => void
}

export default function ParentDashboard({ progress, levels, onBack }: ParentDashboardProps) {
  const [pin, setPin] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('toddlerphonics-settings')
    return saved ? JSON.parse(saved) : content.settings
  })

  const handlePinSubmit = () => {
    if (pin === settings.parentPin) {
      setIsUnlocked(true)
    } else {
      alert('Incorrect PIN')
      setPin('')
    }
  }

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('toddlerphonics-progress')
      window.location.reload()
    }
  }

  const handleToggleSound = () => {
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled }
    setSettings(newSettings)
    localStorage.setItem('toddlerphonics-settings', JSON.stringify(newSettings))
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-3xl p-8 max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gray-700 rounded-full mb-4">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Parent Access</h2>
            <p className="text-gray-400 text-sm">Enter PIN to continue</p>
          </div>
          
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
            placeholder="Enter PIN"
            className="w-full p-4 bg-gray-700 text-white text-center text-2xl rounded-xl mb-4 focusoutline-none"
            maxLength={4}
            autoFocus
          />
          
          <button
            onClick={handlePinSubmit}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition"
          >
            Unlock
          </button>
          
          <button
            onClick={onBack}
            className="w-full mt-3 py-2 text-gray-400 hover:text-white transition"
          >
            ← Back to Game
          </button>
        </div>
      </div>
    )
  }

  const totalActivities = levels.reduce((sum, l) => sum + l.activities.length, 0)
  const completedPercentage = Math.round((progress.completedActivities.length / totalActivities) * 100)

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5" /> Parent Dashboard
          </h1>
          <div className="w-10" />
        </div>

        {/* Stats */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> Progress Stats
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{progress.stars}</div>
              <div className="text-gray-400 text-sm">Stars Earned</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{progress.totalWordsLearned}</div>
              <div className="text-gray-400 text-sm">Words Learned</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-gray-400 text-sm mb-2">
              <span>Overall Progress</span>
              <span>{completedPercentage}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${completedPercentage}%` }}
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {progress.completedActivities.length} of {totalActivities} activities completed
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
          
          <div className="space-y-3">
            <button
              onClick={handleToggleSound}
              className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
            >
              <span className="text-white flex items-center gap-2">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                Sound Effects
              </span>
              <span className={settings.soundEnabled ? 'text-green-400' : 'text-red-400'}>
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h2>
          
          <button
            onClick={handleResetProgress}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-900/50 text-red-400 rounded-xl hover:bg-red-900 transition"
          >
            <RotateCcw className="w-5 h-5" />
            Reset All Progress
          </button>
        </div>

        {/* PIN Info */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Default PIN: {settings.parentPin}</p>
          <p className="mt-1">Change in src/data/content.json</p>
        </div>
      </div>
    </div>
  )
}
