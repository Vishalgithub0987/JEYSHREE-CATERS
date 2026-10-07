export interface GoogleReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified: boolean;
  event: string;
}

export const googleReviewsStats = {
  rating: 4.9,
  maxRating: 5.0,
  totalReviews: 2059,
  badgeText: 'Excellent on Google',
};

export const googleReviews: GoogleReview[] = [
  {
    id: 'rev-1',
    name: 'palani raj',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '21 days ago',
    text: 'Very good catering service. Food was top quality, pure vegetarian perfection. On-time delivery and the servers were polite, helpful, and very traditional in their service.',
    verified: true,
    event: 'Family Gathering',
  },
  {
    id: 'rev-2',
    name: 'Yuvaraj C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'Thank you for your support and service. Food was very nice and tasty. All family members were given good feedback on the food we provided. Thanks once again for the entire JayShree team! 🤝🙏',
    verified: true,
    event: 'House Warming Feast',
  },
  {
    id: 'rev-3',
    name: 'Padmanabhan Vs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'The best veg catering service in K V Kuppam! From the welcome filter coffee to the Kalyana Payasam, every single dish had authentic taste. The banana leaf virundhu management for 800+ guests was seamless.',
    verified: true,
    event: 'Daughter Muhurtham & Reception',
  },
  {
    id: 'rev-4',
    name: 'S. Meenakshi Sundaram',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '2 months ago',
    text: 'From Marudhani to Maruveedu, JayShree Caters managed all our 4 meal sessions with unbelievable taste, hot serving, and utmost hygiene. Our guests from Bangalore and Coimbatore were stunned by the feast quality.',
    verified: true,
    event: 'Grand Wedding Virundhu',
  },
  {
    id: 'rev-5',
    name: 'K. Ramachandran',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    timeAgo: '3 months ago',
    text: 'Organized our company annual gala with JayShree. The executive live chaat counter and dinner spread were praised by the entire management. True professional excellence!',
    verified: true,
    event: 'Corporate Annual Summit',
  },
];

export const testimonials = googleReviews;
