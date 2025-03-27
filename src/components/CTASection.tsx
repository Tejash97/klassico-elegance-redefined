
import React from 'react';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-klassico-gold/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-klassico-gold/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left column - Virtual Stylist */}
            <div className="opacity-0 animate-fade-up">
              <div className="glass-card bg-white border border-klassico-gold/20 p-8 rounded-lg shadow-golden h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-klassico-gold/10 rounded-full mb-6">
                  <MessageCircle className="w-7 h-7 text-klassico-gold" />
                </div>
                
                <h3 className="text-2xl font-display mb-4">Book a Virtual Stylist</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow">
                  Experience personalized styling from the comfort of your home. Our expert stylists will help you curate the perfect Klassico look for any occasion.
                </p>
                
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Concierge</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Right column - Limited Stock */}
            <div className="opacity-0 animate-fade-up stagger-1">
              <div className="glass-card bg-white border border-klassico-gold/20 p-8 rounded-lg shadow-golden h-full flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-klassico-gold/10 rounded-full mb-6">
                  <ShoppingBag className="w-7 h-7 text-klassico-gold" />
                </div>
                
                <h3 className="text-2xl font-display mb-4">Limited Edition Collection</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow">
                  Our newest premium collection is almost sold out. Only a few pieces remain—secure yours before they're gone forever.
                </p>
                
                <div className="bg-klassico-charcoal text-white p-4 rounded mb-6 flex items-center justify-center">
                  <span className="font-medium">Only 3 Left in This Edition</span>
                </div>
                
                <a href="#" className="btn-primary w-full flex items-center justify-center gap-2">
                  <span>Secure Yours Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* VIP Program */}
          <div className="mt-16 text-center opacity-0 animate-fade-up stagger-2">
            <h3 className="text-2xl font-display mb-4">Join Klassico Inner Circle</h3>
            <p className="text-klassico-muted mb-8 max-w-2xl mx-auto">
              Become part of our exclusive membership for early access to new collections, special events, and members-only discounts.
            </p>
            <a href="#" className="btn-secondary">
              Learn More About VIP Program
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
