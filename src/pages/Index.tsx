
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Craftsmanship from '@/components/Craftsmanship';
import Sustainability from '@/components/Sustainability';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import CategoryBanner from '@/components/CategoryBanner';
import QualitySection from '@/components/QualitySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index: React.FC = () => {
  const { toast } = useToast();
  
  // Scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Display welcome toast
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to KLASSICO",
          description: "Discover our premium collections, handcrafted for the modern connoisseur",
          duration: 5000,
        });
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 2000);
    }
  }, [toast]);

  // Add smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.pathname === window.location.pathname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
          
          // Update URL without page jump
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Category Banners */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryBanner 
              image="https://images.unsplash.com/photo-1578932750294-f5075e85f886?q=80&w=2670&auto=format&fit=crop"
              title="Men's Collection"
              category="men"
              isNew={true}
            />
            <CategoryBanner 
              image="https://images.unsplash.com/photo-1619414206962-e6aa8779abd6?q=80&w=2574&auto=format&fit=crop"
              title="Women's Collection"
              category="women"
              isNew={true}
            />
          </div>
        </div>
      </section>
      
      <Collections />
      <QualitySection />
      <WhyChooseUs />
      <Craftsmanship />
      <Sustainability />
      <Testimonials />
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
