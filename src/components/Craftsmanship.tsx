
import React, { useRef, useEffect } from 'react';

const craftDetails = [
  {
    number: "01",
    title: "Premium Materials",
    description: "We source the finest Italian fabrics, organic silks, and sustainable materials to ensure exceptional quality and comfort.",
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=1964&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Expert Tailoring",
    description: "Our master craftsmen bring three generations of tailoring expertise to create perfectly fitted garments with meticulous attention to detail.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1964&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Artisanal Finish",
    description: "Each piece is hand-finished with traditional techniques, ensuring a level of quality and refinement that can only come from true artisanship.",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1950&auto=format&fit=crop"
  }
];

const Craftsmanship: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Parallax effect for images
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const scrollPosition = windowHeight - sectionTop;
        const translateY = Math.max(0, scrollPosition * 0.05 * (index + 1));
        
        ref.style.transform = `translateY(${-translateY}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="craftsmanship" 
      ref={sectionRef}
      className="py-24 bg-klassico-light"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <span className="tag opacity-0 animate-fade-up">Our Process</span>
          <h2 className="section-title opacity-0 animate-fade-up stagger-1">Klassico Craftsmanship</h2>
          <p className="section-subtitle opacity-0 animate-fade-up stagger-2">
            Three generations of tailoring excellence, creating garments that stand the test of time
          </p>
        </div>
        
        {/* Craft Steps */}
        <div className="space-y-32">
          {craftDetails.map((detail, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
            >
              {/* Text Content */}
              <div className="w-full lg:w-1/2 opacity-0 animate-fade-up" style={{ animationDelay: `${(index) * 100}ms` }}>
                <div className="max-w-xl mx-auto lg:mx-0">
                  <span className="block text-5xl font-display text-klassico-gold/30 mb-4">{detail.number}</span>
                  <h3 className="text-3xl lg:text-4xl font-display mb-6">{detail.title}</h3>
                  <p className="text-lg text-klassico-muted">{detail.description}</p>
                </div>
              </div>
              
              {/* Image */}
              <div 
                className="w-full lg:w-1/2 opacity-0 animate-fade-up" 
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                ref={el => imageRefs.current[index] = el}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 border border-klassico-gold/30 rounded-sm -z-10"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-klassico-gold/30 rounded-sm -z-10"></div>
                  
                  {/* Main image */}
                  <div className="overflow-hidden rounded-sm">
                    <img 
                      src={detail.image} 
                      alt={detail.title}
                      className="w-full aspect-square md:aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
