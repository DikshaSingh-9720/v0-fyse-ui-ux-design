export default function Safety() {
  const features = [
    {
      title: "Anonymous & Confidential",
      description: "Your privacy is our priority. Chat anonymously with full confidentiality."
    },
    {
      title: "Verified Helpers",
      description: "All helpers are carefully vetted to ensure safe, supportive interactions."
    },
    {
      title: "24/7 Support",
      description: "Access crisis resources and emergency helplines anytime you need help."
    },
    {
      title: "Not a Substitute",
      description: "FYSE complements professional therapy. We connect you with licensed services when needed."
    }
  ]

  return (
    <section id="safety" className="w-full py-20 px-4 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Safety First</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your wellbeing and security are at the core of everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-yellow-50/50 border border-yellow-100 rounded-xl">
          <p className="text-sm text-foreground">
            <strong>Important:</strong> FYSE is not a substitute for professional mental health treatment. If you're in crisis, please contact emergency services or the National Crisis Hotline.
          </p>
        </div>
      </div>
    </section>
  )
}
