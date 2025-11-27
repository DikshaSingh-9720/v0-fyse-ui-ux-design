export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex",
      role: "Seeker",
      quote: "Talking to a peer helper gave me the courage to face my anxiety. They truly understood what I was going through.",
      avatar: "A"
    },
    {
      name: "Jordan",
      role: "Helper",
      quote: "Being able to help others in their journey has been incredibly fulfilling. We're stronger together.",
      avatar: "J"
    },
    {
      name: "Sam",
      role: "Seeker",
      quote: "FYSE provided the safe space I needed. I felt heard and supported every step of the way.",
      avatar: "S"
    }
  ]

  return (
    <section id="testimonials" className="w-full py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real Stories</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from people whose lives have been touched by peer support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground italic leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
