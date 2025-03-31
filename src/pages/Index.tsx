
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Craftsmanship from '@/components/Craftsmanship';
import Sustainability from '@/components/Sustainability';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import PremiumBanners from '@/components/PremiumBanners';
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
          title: "Welcome to Klassico",
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
      <div className="pt-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">Featured Collections</h2>
            <div className="w-20 h-1 bg-klassico-gold mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover our premium collections, crafted with meticulous attention to detail for the modern connoisseur
            </p>
          </div>
        </div>
        <PremiumBanners />
      </div>
      <Collections />
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
