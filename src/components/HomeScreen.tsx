import { Lock, Star, Gift } from 'lucide-react'
import type { Level, Progress } from '../types'
import content from '../data/content.json'

interface HomeScreenProps {
  levels: Level[]
  progress: Progress
  onStartActivity: (activity: any) => void
  onParentClick: () => void
}

export default function HomeScreen({ levels, progress, onStartActivity, onParentClick }: HomeScreenProps) {
  const prizes = content.prizes as any[]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            👶 Toddler Phonics
          </h1>
          <button 
            onClick={onParentClick}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <Lock className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/90 rounded-2xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-800 font-semibold">Your Progress</span>
            <span className="flex items-center gap-1 text-purple-800 font-bold">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              {progress.stars} stars
            </span>
          </div>
          <div className="h-4 bg-purple-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
              style={{ width: `${Math.min((progress.stars / 50) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-purple-600 mt-2">
            {progress.totalWordsLearned} words learned
          </p>
        </div>

        {/* Levels */}
        <div className="space-y-4">
          {levels.map((level) => {
            const completedCount = level.activities.filter(
              a => progress.completedActivities.includes(a.id)
            ).length
            const isUnlocked = level.id === 'easy' || 
              levels[levels.indexOf(level) - 1]?.activities.every(
                a => progress.completedActivities.includes(a.id)
              )

            return (
              <div 
                key={level.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  !isUnlocked ? 'opacity-60' : ''
                }`}
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{level.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-white">{level.name}</h2>
                        <p className="text-white/80 text-sm">{level.description}</p>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <span className="text-white/80 text-sm">
                        {completedCount}/{level.activities.length}
                      </span>
                    ) : (
                      <span className="text-white/60 text-sm">🔒</span>
                    )}
                  </div>
                </div>
                
                {isUnlocked && (
                  <div className="p-3 flex gap-2 overflow-x-auto">
                    {level.activities.map((activity) => {
                      const isDone = progress.completedActivities.includes(activity.id)
                      return (
                        <button
                          key={activity.id}
                          onClick={() => onStartActivity(activity)}
                          className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition transform hover:scale-105 ${
                            isDone
                              ? 'bg-green-100 text-green-700'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                        >
                          {isDone ? '✓ ' : ''}{activity.title}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Prizes Section */}
        {progress.prizes.length > 0 && (
          <div className="mt-6 bg-white/90 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5" /> Your Prizes
            </h3>
            <div className="flex flex-wrap gap-2">
              {progress.prizes.map(prizeId => {
                const prize = prizes.find(p => p.id === prizeId)
                return prize ? (
                  <div 
                    key={prize.id}
                    className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full"
                  >
                    <span>{prize.emoji}</span>
                    <span className="text-sm text-yellow-800">{prize.name}</span>
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
