
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
    <div ref={bannerRef} className="opacity-0 mb-16">
      <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
        <div className="lg:w-3/5 relative overflow-hidden group h-[600px]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <Link 
              to={`/category/${slug}`}
              className="bg-black/80 backdrop-blur-sm text-white px-8 py-3 uppercase tracking-widest text-sm transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 hover:bg-red-600"
            >
              Explore Collection
            </Link>
          </div>
        </div>
        
        <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-light mb-4 text-black relative pb-6">
            {title}
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-red-600"></span>
          </h3>
          
          <p className="text-gray-600 mb-8 font-light">
            {description}
          </p>
          
          <Link 
            to={`/category/${slug}`}
            className="self-start flex items-center text-sm uppercase tracking-widest font-medium text-black hover:text-red-600 transition-colors group"
          >
            <span className="border-b border-current pb-1 mr-3">View Collection</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumCategoryBanner;
