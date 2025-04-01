
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '@/services/ProductService';
import { Badge } from '@/components/ui/badge';
import { Tag, ChevronLeft, Heart, Share2 } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug || ''),
    enabled: !!slug
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Mock sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Link 
            to={`/category/${product?.categoryName?.toLowerCase()}`} 
            className="inline-flex items-center text-sm mb-6 hover:text-klassico-gold transition-colors text-klassico-charcoal/70 tracking-wider"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to {product?.categoryName || 'Products'}
          </Link>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-klassico-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error || !product ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-light">Product not found</h2>
              <p className="mt-2 text-gray-500">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/" className="mt-4 inline-block underline">
                Return to home page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-auto transition-transform duration-[1.5s] hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col pt-8 md:pt-16">
                <div className="mb-2">
                  <Link 
                    to={`/category/${product.categoryName?.toLowerCase()}`}
                    className="text-sm text-gray-500 hover:text-klassico-gold transition-colors uppercase tracking-widest"
                  >
                    {product.categoryName}
                  </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-light mb-8 relative pepe-border pb-6">{product.name}</h1>
                
                <p className="text-2xl font-light text-klassico-charcoal mb-8">
                  {formatPrice(product.price)}
                </p>
                
                <div className="mb-10">
                  <p className="text-gray-700 font-light leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {product.tags && product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gray-100/80 uppercase text-xs tracking-wider font-light">
                      <Tag size={12} />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Size selection */}
                <div className="mb-12">
                  <p className="font-light mb-4 uppercase tracking-wider text-sm">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className={`w-12 h-12 ${selectedSize === size 
                          ? 'border-klassico-charcoal bg-klassico-charcoal text-white' 
                          : 'border-gray-300 hover:border-gray-500'} flex items-center justify-center font-light border transition-colors duration-300`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <Badge variant={product.in_stock ? "default" : "destructive"} className="text-xs tracking-wider font-light uppercase">
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <span className="text-sm text-gray-500 font-light">SKU: {product.id.slice(0, 8).toUpperCase()}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <WhatsAppButton 
                      productName={product.name}
                      className="bg-klassico-charcoal text-white hover:bg-klassico-gold w-full sm:w-auto tracking-widest text-xs font-light uppercase transition-colors duration-500"
                    />
                    
                    <button className="flex items-center justify-center gap-2 px-6 py-3 border border-klassico-charcoal/20 text-klassico-charcoal font-light uppercase text-xs tracking-widest hover:bg-klassico-charcoal hover:text-white transition-colors duration-500">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
