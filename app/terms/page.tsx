export default function TermsOfUse() {
  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">Last updated: November 2025</p>

        <div className="prose prose-invert space-y-8">
          <section className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-foreground font-semibold mb-3">
              Important Disclaimer: FYSE is not a substitute for professional mental health treatment.
            </p>
            <p className="text-sm text-muted-foreground">
              FYSE provides peer support only. If you are experiencing a mental health crisis, suicidal thoughts, 
              or self-harm urges, please immediately contact emergency services or call 988.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using FYSE, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on 
              FYSE for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
              of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on FYSE</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on FYSE are provided on an 'as is' basis. FYSE makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
              or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall FYSE or its suppliers be liable for any damages (including, without limitation, damages for 
              loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
              on FYSE, even if FYSE or an authorized representative has been notified orally or in writing of the possibility 
              of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials appearing on FYSE could include technical, typographical, or photographic errors. 
              FYSE does not warrant that any of the materials on its Internet web site are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users agree not to post any content that is abusive, threatening, harassing, or promotes harm. 
              FYSE reserves the right to remove content and suspend users who violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Use, please contact us at legal@fyse.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
