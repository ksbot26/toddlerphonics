import { useState, useEffect } from 'react'
import { ArrowLeft, Volume2, Sparkles } from 'lucide-react'
import type { Activity } from '../types'

interface ActivityScreenProps {
  activity: Activity
  onBack: () => void
  onComplete: (activityId: string, wordsLearned: number) => void
}

export default function ActivityScreen({ activity, onBack, onComplete }: ActivityScreenProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)

  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window)
  }, [])

  const speak = (text: string) => {
    if (speechSupported) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.7
      utterance.pitch = 1.2
      window.speechSynthesis.speak(utterance)
    }
  }

  const currentWord = activity.words[currentWordIndex]
  const isLastWord = currentWordIndex === activity.words.length - 1

  const handleNext = () => {
    if (isLastWord) {
      setIsComplete(true)
      onComplete(activity.id, activity.words.length)
    } else {
      setCurrentWordIndex(prev => prev + 1)
      setShowHint(false)
    }
  }

  const playSound = (correct: boolean) => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = correct ? 800 : 200
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-400 to-teal-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-green-600 mb-2">Amazing!</h2>
          <p className="text-gray-600 mb-4">
            You learned {activity.words.length} words!
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {activity.words.map((_, i) => (
              <span key={i} className="text-2xl">⭐</span>
            ))}
          </div>
          <button
            onClick={onBack}
            className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">{activity.title}</h1>
          <div className="text-white/80 text-sm">
            {currentWordIndex + 1}/{activity.words.length}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {activity.words.map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i < currentWordIndex ? 'bg-white' : 
                i === currentWordIndex ? 'bg-yellow-300 scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center">
          <div className="text-8xl mb-6">{currentWord}</div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => speak(currentWord)}
              className="p-4 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <Volume2 className="w-8 h-8 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Hint */}
        <div className="mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full py-2 text-white/80 hover:text-white transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
          {showHint && (
            <div className="bg-white/20 rounded-xl p-4 text-white text-center">
              {activity.hint}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              playSound(false)
              setCurrentWordIndex(0)
            }}
            className="flex-1 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition"
          >
            Start Over
          </button>
          <button
            onClick={() => {
              playSound(true)
              handleNext()
            }}
            className="flex-1 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition"
          >
            {isLastWord ? 'Finish!' : 'Got It!'}
          </button>
        </div>

        {/* Skip for testing */}
        <button
          onClick={handleNext}
          className="w-full mt-4 text-white/50 text-sm hover:text-white/80 transition"
        >
          Skip (testing)
        </button>
      </div>
    </div>
  )
}
