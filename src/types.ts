export interface Activity {
  id: string
  type: 'phonics' | 'story' | 'workbook'
  title: string
  words: string[]
  phoneme: string
  hint: string
}

export interface Level {
  id: string
  name: string
  icon: string
  description: string
  activities: Activity[]
}

export interface Prize {
  id: string
  emoji: string
  name: string
  requirement: number
}

export interface Progress {
  completedActivities: string[]
  stars: number
  prizes: string[]
  totalWordsLearned: number
}

export interface Settings {
  defaultDifficulty: string
  soundEnabled: boolean
  hintEnabled: boolean
  parentPin: string
}
