
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && textRef.current) {
        const scrollY = window.scrollY;
        const opacity = 1 - Math.min(1, scrollY / 700);
        const translateY = scrollY * 0.3;
        
        textRef.current.style.opacity = `${opacity}`;
        textRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover object-center"
        >
          <source 
            src="https://hoffmen.com/cdn/shop/files/hoffmen-suits-collection-2.mp4?v=1708342025" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="font-serif text-white text-lg md:text-xl lg:text-2xl uppercase tracking-[0.3em] opacity-0 animate-fade-up stagger-1">
            Luxury Tailored Perfection
          </h2>
          
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light tracking-tight opacity-0 animate-fade-up stagger-2">
            KLASSICO<span className="text-klassico-gold">.</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto opacity-0 animate-fade-up stagger-3">
            Handcrafted with exquisite detail for the modern gentleman
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-4">
            <a href="#collections" className="px-10 py-3 bg-white/10 border border-white/30 backdrop-blur-sm text-white uppercase tracking-widest text-sm hover:bg-white hover:text-klassico-charcoal transition-colors duration-500">
              Shop Collection
            </a>
            <a href="#premium-collections" className="px-10 py-3 bg-white text-klassico-charcoal uppercase tracking-widest text-sm hover:bg-klassico-gold hover:text-white transition-colors duration-500">
              Premium Pieces
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a 
          href="#collections"
          className="flex flex-col items-center text-white"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Discover</span>
          <ArrowRight className="w-5 h-5 transform rotate-90" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
