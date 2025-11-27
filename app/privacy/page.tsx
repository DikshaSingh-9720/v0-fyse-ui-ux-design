export default function PrivacyPolicy() {
  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: November 2025</p>

        <div className="prose prose-invert space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              FYSE ("we", "us", "our") operates the FYSE platform. This page informs you of our policies 
              regarding the collection, use, and disclosure of personal data when you use our platform and 
              the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve our service:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Account information (email, password, name)</li>
              <li>Profile data (age, location, interests)</li>
              <li>Chat messages and conversation history</li>
              <li>Mood tracking data</li>
              <li>Technical data (IP address, browser type)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FYSE uses the collected data for various purposes:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor usage and detect technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              The security of your data is important to us but remember that no method of transmission over 
              the Internet is 100% secure. While we strive to use commercially acceptable means to protect 
              your personal data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@fyse.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
