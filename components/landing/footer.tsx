import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-muted/20 border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-foreground">FYSE</span>
            </div>
            <p className="text-sm text-muted-foreground">You Are Not Alone</p>
          </div>

          <div>
            <h5 className="font-bold text-foreground mb-4 text-sm">Product</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition">For Seekers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition">For Helpers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-foreground mb-4 text-sm">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition">Terms of Use</Link></li>
              <li><Link href="/crisis" className="text-muted-foreground hover:text-primary transition">Crisis Support</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-foreground mb-4 text-sm">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: support@fyse.com</li>
              <li className="text-muted-foreground">Crisis: 988 Hotline</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 FYSE. All rights reserved.</p>
          <p>Made with care for mental health support.</p>
        </div>
      </div>
    </footer>
  )
}
