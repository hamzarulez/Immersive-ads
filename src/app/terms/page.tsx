export default function TermsPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <main className="max-w-2xl mx-auto py-20 px-6 text-white leading-relaxed">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing or using Immersive Ads, you agree to comply with these Terms of Service. If
            you do not agree, you may not use the platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Creators must upload only original or licensed content.</li>
            <li>Brands must provide truthful and lawful ad content.</li>
            <li>You must not misuse the platform or harm other users.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Account Suspension</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms or engage
            in unlawful behavior.
          </p>
        </section>

        <p className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </main>
    </div>
  )
}
