
import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Menu items with paths
  const menuItems = [
    { name: 'Collections', path: '/#collections' },
    { name: 'Exclusivity', path: '/#exclusivity' },
    { name: 'Craftsmanship', path: '/#craftsmanship' },
    { name: 'Sustainability', path: '/#sustainability' },
    { name: 'About Us', path: '/about' },
  ];

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
          <Link 
            to="/" 
            className="relative z-10 text-2xl font-display font-semibold tracking-wider text-klassico-charcoal"
          >
            Klassico
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="relative menu-link text-sm font-medium tracking-wide text-klassico-charcoal/90 hover:text-klassico-charcoal transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <a 
              href="https://wa.me/919876543210"
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-sm bg-klassico-gold/10 text-klassico-gold hover:bg-klassico-gold/20 transition-colors"
            >
              Order via WhatsApp
            </a>
            
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
            {menuItems.map((item) => (
              <li key={item.name} className="w-full text-center">
                <Link 
                  to={item.path} 
                  className="block text-xl font-medium tracking-wide text-klassico-charcoal py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="w-full text-center pt-6">
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-white bg-klassico-gold rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order via WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
