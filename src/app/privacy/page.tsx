export default function PrivacyPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <main className="max-w-2xl mx-auto py-20 px-6 text-white leading-relaxed">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Immersive Ads (“we,” “our,” or “us”) values your privacy. This Privacy Policy explains
            how we collect, use, and protect your information when you use our platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Information you provide (such as name, email, business details).</li>
            <li>Technical information (cookies, device type, analytics data).</li>
          </ul>
        </section>

        <p className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </main>
    </div>
  )
}
