
import React from 'react';
import { Link } from 'react-router-dom';

const QualitySection: React.FC = () => {
  return (
    <section className="relative py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop" 
          alt="Quality products" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Quality Products At Affordable Prices
          </h2>
          
          <Link 
            to="/about" 
            className="inline-flex px-10 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-red-600 transition-colors duration-500"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
