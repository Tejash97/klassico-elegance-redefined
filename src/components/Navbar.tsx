
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top red bar with "Since 2019" and social icons */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">Since 2019</div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div 
        className={cn(
          "transition-all duration-500 border-b",
          isScrolled ? "py-2 bg-white shadow-sm" : "py-3 bg-white"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 text-2xl font-bold uppercase tracking-wider"
          >
            KLASSICO
          </Link>
          
          {/* Desktop Navigation - Horizontal menu with simple hover effect */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/"
                  className="py-2 text-sm uppercase tracking-wider text-black border-b-2 border-red-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="py-2 text-sm uppercase tracking-wider text-black hover:text-red-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li className="group relative">
                <button className="flex items-center space-x-1 py-2 text-sm uppercase tracking-wider text-black hover:text-red-600 transition-colors">
                  <span>Collection</span>
                  <ChevronDown size={14} />
                </button>
                
                {/* Dropdown */}
                <div className="absolute left-0 top-full bg-white shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48 z-50">
                  <div className="grid grid-cols-1 p-4">
                    {categories[0].submenu.concat(categories[1].submenu).slice(0, 6).map((item) => (
                      <Link 
                        key={item} 
                        to={`/category/${item.toLowerCase()}`}
                        className="py-2 text-sm text-black hover:text-red-600 transition-colors whitespace-nowrap"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="py-2 text-sm uppercase tracking-wider text-black hover:text-red-600 transition-colors"
                >
                  Contact
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
              <Search className="w-5 h-5 text-black" />
            </button>
            
            <NavbarAuth />
            
            <button 
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              <span className="cart-badge">2</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="relative z-10 md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-black" />
              ) : (
                <Menu className="w-5 h-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <div className={cn(
        "absolute top-full left-0 right-0 bg-white shadow-sm transition-all duration-300 overflow-hidden",
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
              <Search className="w-5 h-5 text-black" />
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
              className="w-full border border-gray-200 rounded-none px-4 py-2 text-sm"
            />
          </div>
          
          {categories.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="text-sm font-light uppercase tracking-widest mb-2">{category.name}</h3>
              <ul className="space-y-2 pl-2">
                {category.submenu.map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/category/${item.toLowerCase()}`}
                      className="text-sm text-gray-600 tracking-wider"
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
              className="block text-sm font-light uppercase tracking-widest mb-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="https://wa.me/918910131099"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white text-xs uppercase tracking-widest font-light"
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
