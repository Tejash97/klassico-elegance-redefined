
import React from 'react';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  // Format phone number for WhatsApp link
  const whatsappNumber = "+918910131099"; // Updated WhatsApp number
  const whatsappMessage = encodeURIComponent("Hello! I'd like to place an order for Klassico products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
            {/* Left column - WhatsApp Order */}
            <div className="opacity-0 animate-fade-up transform hover:translate-y-[-5px] transition-transform duration-500">
              <div className="glass-card bg-white border border-klassico-gold/20 p-8 rounded-lg shadow-golden h-full flex flex-col relative overflow-hidden group">
                {/* Premium badge */}
                <div className="absolute -right-12 top-6 bg-klassico-gold text-white px-10 py-1 transform rotate-45 text-xs font-medium tracking-wider">
                  PREMIUM
                </div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-klassico-gold/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7 text-klassico-gold" />
                </div>
                
                <h3 className="text-2xl font-display mb-4">Order via WhatsApp</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow">
                  Simply message us on WhatsApp to place your order. Our concierge will guide you through the selection process and assist with sizing, customization, and delivery options.
                </p>
                
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2 group"
                >
                  <span>WhatsApp Order Concierge</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Right column - Limited Stock */}
            <div className="opacity-0 animate-fade-up stagger-1 transform hover:translate-y-[-5px] transition-transform duration-500">
              <div className="glass-card bg-white border border-klassico-gold/20 p-8 rounded-lg shadow-golden h-full flex flex-col relative overflow-hidden group">
                {/* Hot badge */}
                <div className="absolute -right-12 top-6 bg-red-500 text-white px-10 py-1 transform rotate-45 text-xs font-medium tracking-wider">
                  HOT SALE
                </div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-klassico-gold/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-7 h-7 text-klassico-gold" />
                </div>
                
                <h3 className="text-2xl font-display mb-4">Limited Edition Collection</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow">
                  Our newest premium collection of jeans, blazers, kurtis and sarees is almost sold out. Only a few pieces remain—secure yours before they're gone forever.
                </p>
                
                <div className="bg-klassico-charcoal text-white p-4 rounded mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/20 w-1/3 animate-pulse"></div>
                  <span className="font-medium relative z-10">Only 3 Left in This Edition</span>
                </div>
                
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2 group">
                  <span>Order Now via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
