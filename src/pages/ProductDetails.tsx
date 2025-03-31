
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
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Link 
            to={`/category/${product?.categoryName?.toLowerCase()}`} 
            className="inline-flex items-center text-sm mb-6 hover:underline text-klassico-charcoal/70"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to {product?.categoryName || 'Products'}
          </Link>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-klassico-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error || !product ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">Product not found</h2>
              <p className="mt-2 text-gray-500">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/" className="mt-4 inline-block underline">
                Return to home page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <Link 
                    to={`/category/${product.categoryName?.toLowerCase()}`}
                    className="text-sm text-gray-500 hover:underline uppercase"
                  >
                    {product.categoryName}
                  </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                
                <p className="text-2xl font-bold text-klassico-gold mb-6">
                  {formatPrice(product.price)}
                </p>
                
                <div className="mb-6">
                  <p className="text-gray-700">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags && product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gray-100">
                      <Tag size={12} />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Size selection */}
                <div className="mb-8">
                  <p className="font-medium mb-3">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className={`w-12 h-12 border ${selectedSize === size 
                          ? 'border-klassico-charcoal bg-klassico-charcoal text-white' 
                          : 'border-gray-300 hover:border-gray-500'} flex items-center justify-center font-medium`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <Badge variant={product.in_stock ? "default" : "destructive"} className="text-sm">
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <span className="text-sm text-gray-500">SKU: {product.id.slice(0, 8).toUpperCase()}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <WhatsAppButton 
                      productName={product.name}
                      className="bg-klassico-gold text-white hover:bg-klassico-charcoal w-full sm:w-auto"
                    />
                    
                    <button className="flex items-center justify-center gap-2 px-6 py-3 border border-klassico-charcoal text-klassico-charcoal font-bold uppercase text-xs hover:bg-klassico-charcoal hover:text-white transition-colors">
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
