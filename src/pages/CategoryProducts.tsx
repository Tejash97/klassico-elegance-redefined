
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory, getCategories } from '@/services/ProductService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Filter, Grid, List } from 'lucide-react';

const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const category = categories.find(c => c.slug === slug);
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => getProductsByCategory(slug || ''),
    enabled: !!slug
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Category Banner */}
      <div className="w-full h-[300px] relative mt-16">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
              {category?.name || 'Products'}
            </h1>
            {category?.description && (
              <p className="text-white/80 max-w-2xl mx-auto px-4">
                {category.description}
              </p>
            )}
          </div>
        </div>
        <img 
          src="https://www.pepejeans.com/on/demandware.static/-/Library-Sites-Pepe_Jeans_-_Content_Library/default/dw6cd94cd9/images/Category-Banner/PLP-men-jeans-desktop.jpg" 
          alt={category?.name || 'Category'} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter controls */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            <div className="flex items-center">
              <button className="flex items-center text-sm mr-4">
                <Filter className="w-4 h-4 mr-2" />
                <span>Filter</span>
              </button>
              <span className="text-sm text-gray-500">{products.length} products</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-transparent'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-transparent'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-klassico-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">No products found</h2>
              <p className="mt-2 text-gray-500">
                There are no products available in this category yet.
              </p>
              <Link to="/" className="mt-4 inline-block underline">
                Return to home page
              </Link>
            </div>
          ) : (
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}`}>
              {products.map((product) => (
                <div key={product.id} className={`product-card group transition-all duration-300 ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                  <Link to={`/product/${product.slug}`} className={viewMode === 'list' ? 'w-1/3' : ''}>
                    <div className="relative overflow-hidden mb-4">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="product-image w-full aspect-[3/4] object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                      
                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1">
                          {product.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="py-1 px-2 text-xs font-medium bg-white text-klassico-charcoal">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Featured badge */}
                      {product.featured && (
                        <div className="absolute top-2 right-2 z-20">
                          <Badge variant="destructive">Featured</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className={viewMode === 'list' ? 'w-2/3 flex flex-col' : ''}>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    </Link>
                    {viewMode === 'list' && product.description && (
                      <p className="text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                    )}
                    <p className="text-klassico-gold font-bold mb-3">{formatPrice(product.price)}</p>
                    
                    {viewMode === 'list' && (
                      <div className="mt-auto">
                        <WhatsAppButton 
                          productName={product.name}
                          className="bg-klassico-gold text-white hover:bg-klassico-charcoal"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
