import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import DashboardShowcase from "../components/landing/DashboardShowcase"; // Replaced ProductGlimpse
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import ContactSection from "../components/landing/ContactSection";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main>
        <Hero />
        {/* The new dynamic dashboard showcase is now here */}
        <DashboardShowcase />
        <HowItWorks />
        <ContactSection />
        {/* You can add more sections like Testimonials or FAQs here */}
      </main>
      <Footer />
    </div>
  );
}