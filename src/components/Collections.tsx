
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const productCategories = [
  { id: 'jeans', name: 'Jeans' },
  { id: 'blazers', name: 'Blazers' },
  { id: 'kurtis', name: 'Kurtis & Sarees' },
];

const products = [
  {
    id: 1,
    name: 'Milano Slim Fit',
    category: 'jeans',
    price: '$289',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop',
    tags: ['Limited Edition', 'Italian Fabric'],
  },
  {
    id: 2,
    name: 'Tuscany Relaxed',
    category: 'jeans',
    price: '$319',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1935&auto=format&fit=crop',
    tags: ['Sustainable', 'Handcrafted'],
  },
  {
    id: 3,
    name: 'Savile Row Blazer',
    category: 'blazers',
    price: '$849',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1760&auto=format&fit=crop',
    tags: ['Wool-Silk Blend', 'Limited Stock'],
  },
  {
    id: 4,
    name: 'Monaco Evening Blazer',
    category: 'blazers',
    price: '$795',
    image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1936&auto=format&fit=crop',
    tags: ['Bespoke', 'Hand Finished'],
  },
  {
    id: 5,
    name: 'Royal Silk Saree',
    category: 'kurtis',
    price: '$1,295',
    image: 'https://images.unsplash.com/photo-1610030469668-8e4e1be8437c?q=80&w=1964&auto=format&fit=crop',
    tags: ['Artisanal', 'Organic Silk'],
  },
  {
    id: 6,
    name: 'Jaipur Embroidered Kurti',
    category: 'kurtis',
    price: '$429',
    image: 'https://images.unsplash.com/photo-1619411283597-34006398aa94?q=80&w=1964&auto=format&fit=crop',
    tags: ['Limited Edition', 'Handcrafted'],
  },
];

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('jeans');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="collections" className="py-24 bg-klassico-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="tag opacity-0 animate-fade-up">Luxury Collections</span>
          <h2 className="section-title opacity-0 animate-fade-up stagger-1">Timeless Elegance</h2>
          <p className="section-subtitle opacity-0 animate-fade-up stagger-2">
            Handcrafted with premium materials for those who appreciate the finest details
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-16 opacity-0 animate-fade-up stagger-3">
          <div className="inline-flex border border-klassico-charcoal/20 rounded-full p-1">
            {productCategories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  activeCategory === category.id 
                    ? "bg-klassico-charcoal text-white shadow-sm" 
                    : "hover:bg-klassico-charcoal/5"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card group opacity-0 animate-fade-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="relative mb-5 overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image w-full aspect-[3/4] object-cover"
                />
                
                {/* Quick actions */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full btn-primary">
                    Quick View
                  </button>
                </div>
                
                {/* Tags */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="py-1 px-3 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className="font-display text-xl mb-1">{product.name}</h3>
              <p className="text-klassico-gold font-medium">{product.price}</p>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16 opacity-0 animate-fade-up stagger-5">
          <a href="#" className="btn-primary">
            View All Collections
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collections;
