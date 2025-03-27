
import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="relative z-10 text-2xl font-display font-semibold tracking-wider text-klassico-charcoal"
          >
            Klassico
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Collections', 'Exclusivity', 'Craftsmanship', 'Sustainability'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="relative menu-link text-sm font-medium tracking-wide text-klassico-charcoal/90 hover:text-klassico-charcoal transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <button 
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-klassico-charcoal" />
            </button>
            
            <button 
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-klassico-charcoal" />
              <span className="cart-badge">2</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="relative z-10 md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-klassico-charcoal" />
              ) : (
                <Menu className="w-5 h-5 text-klassico-charcoal" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center transition-all duration-500 z-[40]",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="w-full">
          <ul className="flex flex-col items-center space-y-8">
            {['Collections', 'Exclusivity', 'Craftsmanship', 'Sustainability'].map((item) => (
              <li key={item} className="w-full text-center">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="block text-xl font-medium tracking-wide text-klassico-charcoal py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
