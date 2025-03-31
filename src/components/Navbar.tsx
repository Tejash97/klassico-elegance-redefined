
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import NavbarAuth from './NavbarAuth';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  // Menu categories
  const categories = [
    { name: 'Men', submenu: ['Blazers', 'Jeans', 'Shirts', 'T-Shirts'] },
    { name: 'Women', submenu: ['Kurtis', 'Sarees', 'Dresses', 'Tops'] },
    { name: 'Exclusives', submenu: ['Limited Edition', 'New Arrivals', 'Bestsellers'] },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 bg-white shadow-md" : "py-3 bg-white"
      )}
    >
      {/* Top announcement bar */}
      <div className="hidden md:block bg-klassico-gold text-white text-center text-xs py-1 px-4">
        Free shipping on all orders over ₹1999 | Use code KLASSICO20 for 20% off your first order
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 text-2xl font-bold uppercase tracking-widest text-klassico-charcoal"
          >
            Klassico
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {categories.map((category) => (
                <li key={category.name} className="group relative">
                  <button className="flex items-center space-x-1 py-4 text-sm uppercase font-medium tracking-wide text-klassico-charcoal group-hover:text-klassico-gold transition-colors">
                    <span>{category.name}</span>
                    <ChevronDown size={14} />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48 z-50">
                    <div className="grid grid-cols-1 p-4">
                      {category.submenu.map((item) => (
                        <Link 
                          key={item} 
                          to={`/category/${item.toLowerCase()}`}
                          className="py-2 text-sm text-klassico-charcoal hover:text-klassico-gold transition-colors whitespace-nowrap"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <Link 
                  to="/about" 
                  className="py-4 text-sm uppercase font-medium tracking-wide text-klassico-charcoal hover:text-klassico-gold transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-klassico-charcoal" />
            </button>
            
            <NavbarAuth />
            
            <button 
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-klassico-charcoal" />
              <span className="cart-badge">2</span>
            </button>
            
            {/* WhatsApp order button */}
            <a 
              href="https://wa.me/918910131099"
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center px-4 py-2 text-xs uppercase font-bold bg-klassico-gold text-white hover:bg-klassico-charcoal transition-colors"
            >
              Order via WhatsApp
            </a>
            
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
      
      {/* Search Overlay */}
      <div className={cn(
        "absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden",
        isSearchOpen ? "h-16" : "h-0"
      )}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full h-full border-none outline-none text-sm"
            />
            <button className="px-4">
              <Search className="w-5 h-5 text-klassico-charcoal" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white flex flex-col transition-all duration-500 z-[40]",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="overflow-y-auto pt-20 pb-6 px-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full border border-gray-200 rounded px-4 py-2 text-sm"
            />
          </div>
          
          {categories.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="text-sm font-bold uppercase mb-2">{category.name}</h3>
              <ul className="space-y-2 pl-2">
                {category.submenu.map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/category/${item.toLowerCase()}`}
                      className="text-sm text-gray-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <Link 
              to="/about" 
              className="block text-sm font-medium mb-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="https://wa.me/918910131099"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-klassico-gold text-white text-sm uppercase font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
