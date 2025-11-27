import { useState } from 'react'

export default function MoodCards() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods = [
    { id: 'great', label: 'Great', emoji: '😊', color: 'from-green-400 to-emerald-400' },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'from-blue-400 to-cyan-400' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'from-yellow-400 to-amber-400' },
    { id: 'struggling', label: 'Struggling', emoji: '😟', color: 'from-orange-400 to-red-400' },
    { id: 'hard', label: 'Very Hard', emoji: '😢', color: 'from-purple-400 to-pink-400' },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">How are you feeling today?</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`p-4 rounded-2xl border-2 transition transform hover:scale-105 ${
              selectedMood === mood.id
                ? 'border-primary bg-blue-50'
                : 'border-border bg-white hover:border-primary/50'
            }`}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <p className="text-sm font-semibold text-foreground">{mood.label}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
