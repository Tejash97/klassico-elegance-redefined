
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/ProductService';
import PremiumCategoryBanner from './PremiumCategoryBanner';

// Premium category descriptions
const categoryDetails = {
  blazers: {
    title: "Premium Blazers",
    description: "Elevate your style with our handcrafted blazers. Made from premium materials and tailored to perfection for the modern connoisseur.",
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1932&auto=format&fit=crop"
  },
  jeans: {
    title: "Designer Jeans",
    description: "Experience unparalleled comfort with our premium denim collection. Each pair blends artisanal craftsmanship with contemporary design.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop"
  },
  kurtis: {
    title: "Exclusive Kurtis",
    description: "Our kurtis celebrate traditional craftsmanship with modern sensibilities. Each piece tells a story through intricate detailing and premium fabrics.",
    image: "https://images.unsplash.com/photo-1570382667048-23b581258f6a?q=80&w=1915&auto=format&fit=crop"
  },
  sarees: {
    title: "Luxury Sarees",
    description: "Timeless elegance meets contemporary design. Our sarees are crafted from the finest silks and adorned with meticulous embellishments.",
    image: "https://images.unsplash.com/photo-1610555356070-d0efbf3aec99?q=80&w=1974&auto=format&fit=crop"
  }
};

// Define the priority order in which we want to display categories
const priorityCategories = ['blazers', 'jeans', 'kurtis', 'sarees'];

const PremiumBanners: React.FC = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  if (isLoading || categories.length === 0) {
    return null;
  }

  // Filter categories to only include those in our priority list and that exist in the database
  const displayCategories = priorityCategories
    .map(slug => {
      const category = categories.find(cat => cat.slug === slug);
      if (!category) return null;
      
      return {
        ...category,
        ...categoryDetails[slug as keyof typeof categoryDetails]
      };
    })
    .filter(Boolean);

  return (
    <section id="premium-collections" className="py-24 bg-klassico-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="tag opacity-0 animate-fade-up">Klassico Premium</span>
          <h2 className="section-title opacity-0 animate-fade-up stagger-1">Signature Collections</h2>
          <p className="section-subtitle opacity-0 animate-fade-up stagger-2">
            Discover our exclusive premium collections, crafted with meticulous attention to detail
          </p>
        </div>
        
        <div className="space-y-16">
          {displayCategories.map((category, index) => (
            <PremiumCategoryBanner
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              slug={category.slug}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumBanners;
