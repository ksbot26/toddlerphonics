import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import ActivityScreen from './components/ActivityScreen'
import ParentDashboard from './components/ParentDashboard'
import type { Level, Activity, Progress } from './types'

import content from './data/content.json'

function App() {
  const [view, setView] = useState<'home' | 'activity' | 'parent'>('home')
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('toddlerphonics-progress')
    return saved ? JSON.parse(saved) : {
      completedActivities: [],
      stars: 0,
      prizes: [],
      totalWordsLearned: 0
    }
  })

  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress)
    localStorage.setItem('toddlerphonics-progress', JSON.stringify(newProgress))
  }

  const handleCompleteActivity = (activityId: string, wordsLearned: number) => {
    if (!progress.completedActivities.includes(activityId)) {
      const newProgress = {
        ...progress,
        completedActivities: [...progress.completedActivities, activityId],
        stars: progress.stars + 1,
        totalWordsLearned: progress.totalWordsLearned + wordsLearned
      }
      
      // Check for new prizes
      const newPrizes = content.prizes
        .filter(p => !progress.prizes.includes(p.id) && newProgress.stars >= p.requirement)
        .map(p => p.id)
      
      if (newPrizes.length > 0) {
        newProgress.prizes = [...progress.prizes, ...newPrizes]
        // Could trigger celebration here
      }
      
      saveProgress(newProgress)
    }
  }

  const handleStartActivity = (activity: Activity) => {
    setCurrentActivity(activity)
    setView('activity')
  }

  const handleBack = () => {
    setCurrentActivity(null)
    setView('home')
  }

  const levels: Level[] = content.levels as Level[]

  if (view === 'parent') {
    return (
      <ParentDashboard 
        progress={progress}
        levels={levels}
        onBack={handleBack}
      />
    )
  }

  if (view === 'activity' && currentActivity) {
    return (
      <ActivityScreen 
        activity={currentActivity}
        onBack={handleBack}
        onComplete={handleCompleteActivity}
      />
    )
  }

  return (
    <HomeScreen 
      levels={levels}
      progress={progress}
      onStartActivity={handleStartActivity}
      onParentClick={() => setView('parent')}
    />
  )
}

export default App
