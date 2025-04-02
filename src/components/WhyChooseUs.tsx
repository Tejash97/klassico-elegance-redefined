
import React from 'react';
import { Diamond, Award, BadgeCheck } from 'lucide-react';

const features = [
  {
    icon: <Diamond className="w-8 h-8 text-red-600" />,
    title: "Premium Product",
    description: "Experience the epitome of luxury in our premium collection, where uncompromising quality converges with fashion excellence."
  },
  {
    icon: <Award className="w-8 h-8 text-red-600" />,
    title: "Unmatched Quality",
    description: "Each piece is meticulously crafted to exceed expectations, ensuring longevity and satisfaction with every wear."
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-red-600" />,
    title: "Perfect Fit",
    description: "Our precision-tailored garments are designed to complement diverse body types, ensuring comfort and confidence."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-6 inline-block">
              <span className="text-red-600 uppercase text-sm tracking-wider font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Affordable fashion that fits your lifestyle.
            </h2>
            <p className="text-gray-600 mb-6">
              Since 1991, we've been committed to providing high-quality clothing that combines 
              style, comfort, and affordability. Our pieces are designed to seamlessly integrate 
              into your everyday life, enhancing your personal style without compromising on quality.
            </p>
            <p className="text-gray-600">
              We believe that looking good shouldn't cost a fortune, which is why we've dedicated 
              ourselves to creating fashion-forward pieces at prices that make sense for the 
              modern consumer.
            </p>
          </div>
          
          <div className="space-y-10">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
