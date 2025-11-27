export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Seekers",
      description: "Share what's on your mind and connect with compassionate peer helpers"
    },
    {
      number: "2",
      title: "Helpers",
      description: "Experienced peers provide emotional support and guidance through conversation"
    },
    {
      number: "3",
      title: "Growth",
      description: "Together, work toward healing with the option for professional referrals"
    }
  ]

  return (
    <section id="how-it-works" className="w-full py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How FYSE Works</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, supportive process connecting seekers with caring helpers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white border border-border rounded-2xl p-8 text-center h-full shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {idx < 2 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
