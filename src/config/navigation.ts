
export interface NavLink {
  id?: string;
  label: string;
  href: string;
  isBadge?: boolean;
  badgeText?: string;
  action?: string;
}

export const MAIN_SERVICES: NavLink[] = [
  { label: 'Cooling & AC', href: '#major-services-slider-section' },
  { label: 'Heating & Furnace', href: '#major-services-slider-section' },
  { label: 'Indoor Air Quality', href: '#major-services-slider-section' },
  { label: 'Commercial HVAC', href: '#major-services-slider-section' },
  { label: 'Emergency Repair', href: 'tel:+16233353958', isBadge: true, badgeText: '24/7' },
];

export const QUICK_LINKS: NavLink[] = [
  { id: 'nav-home', label: 'Home', href: '#hero-section' },
  { id: 'nav-services', label: 'All Services', href: '#major-services-slider-section' },
  { id: 'nav-areas', label: 'Areas We Serve', href: '#service-area-globe-section' },
  { id: 'nav-promotions', label: 'Promotions', href: '#specials' },
  { id: 'nav-financing', label: 'HVAC Financing', href: '#finance' },
  { id: 'nav-about', label: 'About Us', href: '#about-us' },
  { id: 'nav-contact', label: 'Contact Us', href: '#emergency-cta-banner' },
];

export const CLIENT_RESOURCES: NavLink[] = [
  { label: 'All Services', href: '#major-services-slider-section' },
  { label: 'Instant Cost Estimator', action: 'open-estimator', isBadge: true, badgeText: 'Interactive', href: '#' },
  { label: 'Financing & 0% APR Plans', action: 'scroll-financing', href: '#finance' },
  { label: 'Seasonal Maintenance Guide', action: 'scroll-how-it-works', href: '#major-services-slider-section' },
  { label: 'Emergency Checklist', action: 'scroll-emergency', href: '#major-services-slider-section' },
];
