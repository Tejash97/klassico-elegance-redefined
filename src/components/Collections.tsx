
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getProductsByCategory, Product } from '@/services/ProductService';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import WhatsAppButton from '@/components/WhatsAppButton';

const Collections: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
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
  React.useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].slug);
    }
  }, [categories, activeCategory]);

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
          <span className="tag opacity-0 animate-fade-up">Luxury Collections</span>
          <h2 className="section-title opacity-0 animate-fade-up stagger-1">Timeless Elegance</h2>
          <p className="section-subtitle opacity-0 animate-fade-up stagger-2">
            Handcrafted with premium materials for those who appreciate the finest details
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-16 opacity-0 animate-fade-up stagger-3 overflow-x-auto">
          <div className="inline-flex border border-klassico-charcoal/20 rounded-full p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                  activeCategory === category.slug 
                    ? "bg-klassico-charcoal text-white shadow-sm" 
                    : "hover:bg-klassico-charcoal/5"
                )}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            <div className="col-span-full text-center py-12">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              No products found in this category.
            </div>
          ) : (
            products.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card group opacity-0 animate-fade-up"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="relative mb-5 overflow-hidden rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="product-image w-full aspect-[3/4] object-cover"
                      />
                    ) : (
                      <div className="product-image w-full aspect-[3/4] bg-muted flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    
                    {/* Quick actions */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <WhatsAppButton 
                        productName={product.name}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                        {product.tags.map((tag, i) => (
                          <span key={i} className="py-1 px-3 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
                
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-display text-xl mb-1">{product.name}</h3>
                </Link>
                <p className="text-klassico-gold font-medium">{formatPrice(product.price)}</p>
              </div>
            ))
          )}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16 opacity-0 animate-fade-up stagger-5">
          <Link 
            to={`/category/${activeCategory}`} 
            className="btn-primary"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
