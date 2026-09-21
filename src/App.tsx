import { Suspense, lazy, useState, useEffect } from 'react';
import { Navbar, Footer } from './components/layout';
import { GridPageTransition } from './components/common/GridPageTransition';
import { HeroSlider } from './components/home/HeroSlider';
import { MarqueeSection } from './components/home/MarqueeSection';
import { WelcomeSection } from './components/home/WelcomeSection';
import { MajorServicesSlider } from './components/home/MajorServicesSlider';
import { EmergencyCtaBanner } from './components/home/EmergencyCtaBanner';
import { PremierHvacSection } from './components/home/PremierHvacSection';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { CoreValuesSection } from './components/home/CoreValuesSection';
import { SectionLoading } from './components/common/SectionLoading';
import { HvacEstimatorProvider } from './context/HvacEstimatorContext';
import { ErrorProvider, useError } from './context/ErrorContext';
import { ErrorNotification } from './components/common/ErrorNotification';
import { useSplitTextLinks } from './utils/useSplitTextLinks';
import { useLenis } from './hooks/useLenis';

// Lazy load below-the-fold components
const GeoMapSection = lazy(() =>
  import('./components/home/GeoMapSection').then((m) => ({ default: m.GeoMapSection }))
);
const BeforeAfterSection = lazy(() =>
  import('./components/home/BeforeAfterSection').then((m) => ({ default: m.BeforeAfterSection }))
);
const TestimonialsSection = lazy(() =>
  import('./components/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const FinancingCalculator = lazy(() =>
  import('./components/home/FinancingCalculator').then((m) => ({ default: m.FinancingCalculator }))
);
const FaqSection = lazy(() =>
  import('./components/home/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const BlogSection = lazy(() =>
  import('./components/home/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const FloatingHvacWidget = lazy(() =>
  import('./components/home/FloatingHvacWidget').then((m) => ({ default: m.FloatingHvacWidget }))
);

function AppContent() {
  useLenis();
  useSplitTextLinks();
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const { showError, error, isVisible, hideError } = useError();

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
      showError('Google Maps Platform quota reached. Some map features may be limited.');
    };
    
    const handleGlobalError = (event: ErrorEvent) => {
      showError(event.message || 'An unexpected application error occurred.');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      showError(event.reason?.message || 'A network or promise rejection occurred.');
    };

    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [showError]);

  return (
    <>
      {/* 12-Grid Fullscreen Page Transition in Color #2934CE */}
      <GridPageTransition />

      {/* Global Sticky Navbar */}
      <Navbar />

      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-[72px] z-50 shadow-sm font-['Delight']">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <div className="w-full min-h-screen flex flex-col bg-[#121417] text-[#FFFFFF] overflow-x-hidden border-0 outline-none">
        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden flex flex-col items-center justify-start p-0 m-0">
          {/* 1. Cinematic Hero with Instant Cost Estimator (Critical LCP - Eager) */}
          <HeroSlider />

          {/* 2. Infinite Scrolling Trust Signals & Credential Marquee (Eager) */}
          <MarqueeSection />

          {/* 3. Cinematic Brand Welcome & Craftsmanship Philosophy (Eager) */}
          <WelcomeSection />

          {/* 4. Major Services Pinned Horizontal Slider with Video BG & Grid Switcher (Eager) */}
          <MajorServicesSlider />

          {/* 5. High-Impact Emergency CTA Banner (Eager) */}
          <EmergencyCtaBanner />

          {/* 6. Premier HVAC Contractor Differentiators & Technical Grid (Eager) */}
          <PremierHvacSection />

          {/* 7. Dynamic Live Google Maps Route Dispatch & Service Area Section */}
          <Suspense fallback={<SectionLoading variant="map" minHeight="min-h-[700px]" label="Loading Live Dispatch & Service Areas..." />}>
            <GeoMapSection />
          </Suspense>

          {/* 8. 4-Step Process: How It Works From Dispatch to Sign-off */}
          <HowItWorksSection />

          {/* 8.5 Our Core Values: Trust & Integrity Foundation */}
          <CoreValuesSection />

          {/* 9. Visual Proof: Interactive Before & After System Replacements */}
          <Suspense fallback={<SectionLoading variant="split" minHeight="min-h-[520px]" label="Loading Before & After Transformations..." />}>
            <BeforeAfterSection />
          </Suspense>

          {/* 10. Social Proof: Customer Testimonials Masonry Grid */}
          <Suspense fallback={<SectionLoading variant="grid" minHeight="min-h-[500px]" label="Loading Verified Reviews..." />}>
            <TestimonialsSection />
          </Suspense>

          {/* 11. Financial Affordability: 0% APR Financing Calculator */}
          <Suspense fallback={<SectionLoading variant="split" minHeight="min-h-[450px]" label="Loading Financing Options..." />}>
            <FinancingCalculator />
          </Suspense>

          {/* 12. Objection Handling: Frequently Asked Questions Accordion */}
          <Suspense fallback={<SectionLoading variant="accordion" minHeight="min-h-[420px]" label="Loading FAQs..." />}>
            <FaqSection />
          </Suspense>

          {/* 13. Authority & Education: HVAC Learning Blog & Article Reader */}
          <Suspense fallback={<SectionLoading variant="grid" minHeight="min-h-[460px]" label="Loading Knowledge Center..." />}>
            <BlogSection />
          </Suspense>

          {/* 14. Site Footer */}
          <Footer />
        </main>

        {/* Floating Scroll-Driven Cost Estimator Widget */}
        <Suspense fallback={null}>
          <FloatingHvacWidget />
        </Suspense>
      </div>

      <ErrorNotification 
        message={error || ''} 
        isVisible={isVisible} 
        onClose={hideError} 
      />
    </>
  );
}

export default function App() {
  return (
    <ErrorProvider>
      <HvacEstimatorProvider>
        <AppContent />
      </HvacEstimatorProvider>
    </ErrorProvider>
  );
}



