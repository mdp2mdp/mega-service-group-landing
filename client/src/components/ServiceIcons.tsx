import React from 'react';

export const ExpertiseIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="2" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <path d="M16 16H32M16 22H32M16 28H24" stroke="#0f5a6b" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="28" cy="30" r="3" fill="#0f5a6b"/>
  </svg>
);

export const SupplyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18L24 8L38 18V38H10V18Z" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <path d="M18 38V26H30V38" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <rect x="22" y="28" width="4" height="4" fill="#0f5a6b"/>
  </svg>
);

export const InstallationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 36H36V16H12V36Z" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <path d="M20 12L24 8L28 12" stroke="#0f5a6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="24" y1="8" x2="24" y2="16" stroke="#0f5a6b" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="26" r="2" fill="#0f5a6b"/>
    <circle cx="30" cy="26" r="2" fill="#0f5a6b"/>
  </svg>
);

export const CommissioningIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="14" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <path d="M24 16V24L30 30" stroke="#0f5a6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="3" fill="#0f5a6b"/>
  </svg>
);

export const MaintenanceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 10L28 14H32V32H16V14H20L24 10Z" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="24" r="4" stroke="#0f5a6b" strokeWidth="1.5" fill="none"/>
    <path d="M12 36H36" stroke="#0f5a6b" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface ServiceIconProps {
  type: 'expertise' | 'supply' | 'installation' | 'commissioning' | 'maintenance';
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type }) => {
  switch (type) {
    case 'expertise':
      return <ExpertiseIcon />;
    case 'supply':
      return <SupplyIcon />;
    case 'installation':
      return <InstallationIcon />;
    case 'commissioning':
      return <CommissioningIcon />;
    case 'maintenance':
      return <MaintenanceIcon />;
    default:
      return null;
  }
};
