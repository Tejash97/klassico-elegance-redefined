
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProductsByCategory, Product } from '@/services/ProductService';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowRight, Star } from 'lucide-react';

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animateItems, setAnimateItems] = useState(false);
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: () => activeCategory 
      ? getProductsByCategory(activeCategory) 
      : Promise.resolve([]),
    enabled: !!activeCategory
  });

  // Set the first category as active by default if none is selected
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].slug);
    }
  }, [categories, activeCategory]);

  // Trigger animation when products change
  useEffect(() => {
    setAnimateItems(false);
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [products]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="collections" className="py-24 bg-klassico-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold uppercase mb-6">Collection</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-16 overflow-x-auto">
          <div className="inline-flex border-b border-gray-200 p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "px-8 py-2 text-sm font-medium uppercase transition-all duration-300 whitespace-nowrap mx-2",
                  activeCategory === category.slug 
                    ? "text-red-600 border-b-2 border-red-600" 
                    : "text-gray-600 hover:text-black"
                )}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-klassico-light animate-pulse">
                <Star className="h-8 w-8 text-klassico-gold/50" />
              </div>
              <p className="mt-4 text-klassico-muted">Loading premium products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-klassico-muted">No products found in this category.</p>
              <Link to="/category" className="mt-4 btn-secondary inline-flex items-center gap-2">
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            products.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card group ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}
                style={{ transitionDelay: `${(index * 100)}ms` }}
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="relative mb-4 overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="product-image w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="product-image w-full aspect-[3/4] bg-muted flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    
                    {/* Quick actions */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <WhatsAppButton 
                        productName={product.name}
                        className="w-full bg-red-600 hover:bg-black shadow-lg hover:shadow-xl transition-shadow"
                      />
                    </div>
                  </div>
                </Link>
                
                <Link to={`/product/${product.slug}`} className="block text-center">
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-red-600 font-medium">{formatPrice(product.price)}</p>
                </Link>
              </div>
            ))
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to={`/category/${activeCategory}`} 
            className="inline-flex items-center text-red-600 hover:text-black"
          >
            <span className="mr-2 uppercase text-sm font-medium">View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
