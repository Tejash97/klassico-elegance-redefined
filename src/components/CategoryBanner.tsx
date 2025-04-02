
import React from 'react';
import { Link } from 'react-router-dom';

type CategoryBannerProps = {
  image: string;
  title: string;
  category: string;
  isNew?: boolean;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ 
  image, 
  title, 
  category,
  isNew = false
}) => {
  return (
    <div className="relative group overflow-hidden">
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
      
      {isNew && (
        <div className="absolute top-6 left-6">
          <div className="px-4 py-1 bg-red-600 text-white text-sm font-light uppercase tracking-wider">
            New Arrival
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <h2 className="text-3xl md:text-4xl font-light mb-6">{title}</h2>
        <Link 
          to={`/category/${category.toLowerCase()}`}
          className="inline-block px-8 py-3 bg-black text-white uppercase tracking-widest text-xs font-light hover:bg-red-600 transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default CategoryBanner;
