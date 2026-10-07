export type DietaryType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string; // Format: English Name (Tamil Name)
  englishName?: string;
  tamilName?: string;
  category: string;
  subcategory?: string;
  description: string;
  ingredients: string;
  type: DietaryType;
  price?: number;
  image: string;
  popular?: boolean;
  traditionalHighlight?: string;
  spiciness?: 'mild' | 'medium' | 'spicy';
  isCustom?: boolean;
  quantity?: number;
  customNotes?: string;
}

export interface CustomItemInput {
  name: string;
  type: DietaryType;
  quantity: number;
  notes?: string;
}

export interface MasterMenuItem extends MenuItem {
  englishName: string;
  tamilName: string;
  subcategory: string;
}

export interface MasterSubcategory {
  id: string;
  name: string;
  items: MasterMenuItem[];
}

export interface MasterCategory {
  id: string;
  name: string;
  description?: string;
  subcategories: MasterSubcategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface CateringService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  guests: string;
  image: string;
  highlights: string[];
  recommendedOccasions: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Banana Leaf Feast' | 'Live Counters' | 'Sweets & Desserts' | 'Banquets';
  image: string;
  alt: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  event: string;
  guests: string;
  rating: number;
  quote: string;
  avatar?: string;
  location: string;
}

export interface EventOccasion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  suitableFor: string;
  image: string;
  icon: string;
  features: string[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  phone: string;
  phoneDisplay: string;
  phoneSecondary: string;
  phoneSecondaryDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  serviceAreas: string[];
  metrics: {
    eventsCatered: string;
    signatureDishes: string;
    guestsServed: string;
    hygieneRating: string;
    experienceYears?: string;
    masterChefsStaff?: string;
    singleDayCapacity?: string;
  };
  operatingHours: string;
}

export interface CateringEnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  guests: number;
  location: string;
  selectedFoods?: MenuItem[];
  message?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  whatsappLink: string;
  userWhatsappLink?: string;
  details?: {
    requestId: string;
    customerName: string;
    phone: string;
    ownerPhone?: string;
    eventSummary: string;
    itemCount: number;
  };
}
