
import React, { useRef } from 'react';
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
          src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Hero background" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-light opacity-0 animate-fade-up stagger-2">
            KLA<span className="text-red-600">SS</span>ICO
          </h1>
          <p className="text-white text-xl md:text-2xl font-serif opacity-0 animate-fade-up stagger-3">
            Premium quality clothing for the modern individual
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-4">
            <Link 
              to="#collections" 
              className="px-10 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-red-600 transition-colors duration-500"
            >
              Our Collections
            </Link>
            <Link 
              to="/about" 
              className="px-10 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-red-600 transition-colors duration-500"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
