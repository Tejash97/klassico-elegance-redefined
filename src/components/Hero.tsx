
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold opacity-0 animate-fade-up stagger-2">
            Find your fit, find your tribe.
          </h1>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-4">
            <Link 
              to="#collections" 
              className="px-10 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-red-600 transition-colors duration-500"
            >
              Our Collections
            </Link>
            <Link 
              to="/stores" 
              className="px-10 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-red-600 transition-colors duration-500"
            >
              Our Stores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
