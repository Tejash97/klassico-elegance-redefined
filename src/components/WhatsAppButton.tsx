
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

type WhatsAppButtonProps = {
  productName?: string;
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
  showIcon?: boolean;
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  phoneNumber = "+918910131099", // WhatsApp number
  message = "I'd like to inquire about",
  className,
  variant = "default",
  children,
  showIcon = true
}) => {
  const handleWhatsAppClick = () => {
    const whatsappMessage = productName 
      ? `${message} ${productName}`
      : message;
    
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button 
      onClick={handleWhatsAppClick}
      className={`uppercase font-serif text-xs ${className}`}
      variant={variant}
    >
      {showIcon && <MessageCircle className="mr-2" />}
      {children || "Order on WhatsApp"}
    </Button>
  );
};

export default WhatsAppButton;
