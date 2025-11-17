import React from 'react';

interface MessengerLinkProps {
  href: string;
  icon: 'telegram' | 'whatsapp';
  label: string;
  className?: string;
}

export const MessengerLink: React.FC<MessengerLinkProps> = ({ 
  href, 
  icon, 
  label,
  className = ""
}) => {
  const iconPath = icon === 'telegram' ? '/telegram-icon.png' : '/whatsapp-icon.png';
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center transition-transform duration-300 hover:scale-110 ${className}`}
      title={label}
      aria-label={label}
    >
      <img 
        src={iconPath} 
        alt={label}
        className="w-8 h-8 md:w-6 md:h-6"
      />
    </a>
  );
};

// Export individual icon components for compatibility
export const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img 
    src="/telegram-icon.png" 
    alt="Telegram"
    className={className}
  />
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img 
    src="/whatsapp-icon.png" 
    alt="WhatsApp"
    className={className}
  />
);
