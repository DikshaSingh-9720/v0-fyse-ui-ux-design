import Link from 'next/link'

export default function RecommendedStories() {
  const stories = [
    {
      id: 1,
      title: 'Overcoming Anxiety in the Workplace',
      author: 'Jordan',
      type: 'Video',
      likes: 234,
      saved: false
    },
    {
      id: 2,
      title: 'My Journey with Depression',
      author: 'Sam',
      type: 'Text',
      likes: 456,
      saved: false
    },
    {
      id: 3,
      title: 'Finding Hope After Loss',
      author: 'Casey',
      type: 'Audio',
      likes: 189,
      saved: false
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recommended Stories</h2>
        <Link href="/dashboard/seeker/stories" className="text-primary hover:underline text-sm font-semibold">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-foreground mb-1">{story.title}</h3>
                <p className="text-sm text-muted-foreground">By {story.author}</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                {story.type}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-muted-foreground hover:text-primary transition text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {story.likes}
              </button>
              <button className="text-muted-foreground hover:text-accent transition text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Save
              </button>
              <button className="text-muted-foreground hover:text-red-500 transition text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.82 1.573l-12 8a1 1 0 01-1.74-1.114L5.07 6H6a1 1 0 000-2H3a1 1 0 00-1 1v10a1 1 0 001 1h3a1 1 0 000-2H4V6z" clipRule="evenodd" />
                </svg>
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
