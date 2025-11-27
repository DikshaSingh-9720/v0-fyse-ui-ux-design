export default function AdminStats() {
  const stats = [
    {
      label: 'Total Users',
      value: '3,842',
      change: '+12%',
      icon: 'users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Seekers',
      value: '2,341',
      change: '+8%',
      icon: 'seekers',
      color: 'from-primary to-blue-400'
    },
    {
      label: 'Verified Helpers',
      value: '856',
      change: '+5%',
      icon: 'helpers',
      color: 'from-secondary to-purple-400'
    },
    {
      label: 'Reported Issues',
      value: '23',
      change: '-3%',
      icon: 'alert',
      color: 'from-red-500 to-orange-500'
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm mb-3">{stat.label}</p>
          <h3 className="text-3xl font-bold text-foreground mb-3">{stat.value}</h3>
          <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change} from last month
          </p>
        </div>
      ))}
    </div>
  )
}
