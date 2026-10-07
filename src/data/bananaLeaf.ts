export interface LeafItem {
  id: string;
  name: string;
  tamilName: string;
  position: string;
  description: string;
  category: 'condiment' | 'vegetable' | 'crisp' | 'main' | 'sweet';
}

export const bananaLeafItems: LeafItem[] = [
  {
    id: 'bl-1',
    name: 'Kal Uppu (Rock Salt)',
    tamilName: 'கல் உப்பு',
    position: 'Top Left Corner',
    description: 'Placed first as a symbol of purity, hospitality, and life balance.',
    category: 'condiment',
  },
  {
    id: 'bl-2',
    name: 'Maavadu / Cut Mango Oorugai',
    tamilName: 'மாவடு ஊறுகாய்',
    position: 'Next to Salt',
    description: 'Baby whole tender mangoes preserved in roasted mustard brine to awaken the palate.',
    category: 'condiment',
  },
  {
    id: 'bl-3',
    name: 'Pineapple & Ginger Pachadi',
    tamilName: 'அன்னாசி பச்சடி',
    position: 'Top Center Left',
    description: 'Sweet, tangy relish balancing the six tastes (Arusuvai) of a traditional feast.',
    category: 'vegetable',
  },
  {
    id: 'bl-4',
    name: 'Vazhaipoo (Banana Flower) Poriyal',
    tamilName: 'வாழைப்பூ பொரியல்',
    position: 'Top Center',
    description: 'Nutritious banana blossoms tempered with mustard, urad dal, and fresh coconut.',
    category: 'vegetable',
  },
  {
    id: 'bl-5',
    name: 'Chow-Chow & Chana Dal Kootu',
    tamilName: 'சௌ-சௌ கூட்டு',
    position: 'Top Center Right',
    description: 'Mellow squash gently simmered with bengal gram and ground coconut cumin paste.',
    category: 'vegetable',
  },
  {
    id: 'bl-6',
    name: 'Royal Malabar Avial',
    tamilName: 'அவியல்',
    position: 'Top Right Corner',
    description: 'Nine country vegetables steeped in coconut curd and fragrant unheated virgin coconut oil.',
    category: 'vegetable',
  },
  {
    id: 'bl-7',
    name: 'Crispy Medu Vadai & Urad Appalam',
    tamilName: 'மெதுவடை & அப்பளம்',
    position: 'Left Lower Side',
    description: 'Crunchy hot lentil donut and fried urad dal wafer for crisp textural contrast.',
    category: 'crisp',
  },
  {
    id: 'bl-8',
    name: 'Steamed Ponni Rice & Nei Paruppu',
    tamilName: 'நெய் பருப்பு சாதம்',
    position: 'Center Leaf Base',
    description: 'Fluffy steaming rice indented and drizzled with melted desi cow ghee and yellow moong dal.',
    category: 'main',
  },
  {
    id: 'bl-9',
    name: 'Aromatic Drumstick Sambar',
    tamilName: 'முருங்கைக்காய் சாம்பார்',
    position: 'Poured Over Rice',
    description: 'First wet course: Toor dal simmered with fresh drumsticks, shallots, and house-blended spices.',
    category: 'main',
  },
  {
    id: 'bl-10',
    name: 'Mysore Tomato Pepper Rasam',
    tamilName: 'மைசூர் ரசம்',
    position: 'Second Rice Course',
    description: 'Piping hot digestive broth infused with roasted cumin, black pepper, and coriander.',
    category: 'main',
  },
  {
    id: 'bl-11',
    name: 'Silky Curd with Pomegranate',
    tamilName: 'தயிர் சாதம்',
    position: 'Final Cooling Course',
    description: 'Full-cream farmhouse curd rice tempered with mustard and ginger.',
    category: 'main',
  },
  {
    id: 'bl-12',
    name: 'Warm Palada Payasam & Mysore Pak',
    tamilName: 'பாலடை பாயாசம் & மைசூர் பாக்',
    position: 'Bottom Right Leaf',
    description: 'Rich slow-cooked milk pudding and melt-in-mouth ghee Mysore pak to conclude the feast.',
    category: 'sweet',
  },
];
