
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type PremiumCategoryBannerProps = {
  title: string;
  description: string;
  image: string;
  slug: string;
  position?: 'left' | 'right';
};

const PremiumCategoryBanner: React.FC<PremiumCategoryBannerProps> = ({
  title,
  description,
  image,
  slug,
  position = 'left'
}) => {
  const isLeft = position === 'left';
  const bannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={bannerRef} className="opacity-0 mb-24">
      <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
        <div className="lg:w-3/5 relative overflow-hidden group h-[500px]">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <Link 
              to={`/category/${slug}`}
              className="bg-white text-klassico-charcoal px-8 py-3 uppercase text-sm font-bold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 hover:bg-klassico-gold hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
        
        <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl uppercase font-bold mb-3 text-klassico-charcoal">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          
          <Link 
            to={`/category/${slug}`}
            className="self-start flex items-center text-sm uppercase font-bold text-klassico-charcoal hover:text-klassico-gold transition-colors"
          >
            <span className="border-b border-current pb-1 mr-2">Discover Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumCategoryBanner;
