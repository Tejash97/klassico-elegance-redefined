
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-klassico-charcoal text-white">
      {/* Newsletter Section */}
      <div className="bg-red-600 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white uppercase mb-2">Subscribe to our newsletter</h3>
              <p className="text-white/80">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 w-full md:w-80 text-klassico-charcoal text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-klassico-charcoal text-white px-6 py-3 text-xs uppercase font-bold hover:bg-black transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <a href="#" className="inline-block text-3xl font-bold uppercase tracking-widest mb-6">
              KLASSICO<span className="text-red-600">.</span>
            </a>
            <p className="text-white/70 mb-6">
              Premium quality clothing for the modern individual. Timeless designs that transcend fashion trends.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Men's Collection</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Women's Collection</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>New Arrivals</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Sale</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Accessories</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold uppercase mb-6">Information</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Terms & Conditions</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Returns & Exchanges</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-600 transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Shipping & Delivery</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  123 Fashion Street, Design District, New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
                <a href="tel:+918910131099" className="text-white/70 hover:text-red-600 transition-colors">
                  +91 8910 131 099
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
                <a href="mailto:info@klassico.com" className="text-white/70 hover:text-red-600 transition-colors">
                  info@klassico.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Klassico. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <img src="https://www.pepejeans.com/on/demandware.static/-/Library-Sites-Pepe_Jeans_-_Content_Library/default/dw92903e7a/images/footer/pj-visa.svg" alt="Visa" className="h-6" />
              <img src="https://www.pepejeans.com/on/demandware.static/-/Library-Sites-Pepe_Jeans_-_Content_Library/default/dw3823deb4/images/footer/pj-mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="https://www.pepejeans.com/on/demandware.static/-/Library-Sites-Pepe_Jeans_-_Content_Library/default/dw95a2e483/images/footer/pj-paypal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
