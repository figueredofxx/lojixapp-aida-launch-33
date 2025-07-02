import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 1. ATENÇÃO - Hero Section */}
      <HeroSection />
      
      {/* 2. INTERESSE - Features/Benefits Section */}
      <FeaturesSection />
      
      {/* 3. DESEJO - Testimonials/Social Proof Section */}
      <TestimonialsSection />
      
      {/* 4. AÇÃO - Pricing Section */}
      <PricingSection />
      
      {/* 5. AÇÃO - Final Contact/CTA Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
