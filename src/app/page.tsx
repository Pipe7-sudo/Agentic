import dynamic from 'next/dynamic';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import HowItWorks from '@/components/landing/HowItWorks';
import AgentsSection from '@/components/landing/AgentsSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';

const ParticleCanvas = dynamic(() => import('@/components/landing/ParticleCanvas'), { ssr: false });

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <AgentsSection />
        <DashboardPreview />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
