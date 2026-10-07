export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'menu' | 'service' | 'hygiene';
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How far in advance should we book JayShree Caters for a wedding or major celebration?',
    answer:
      'For auspicious wedding muhurtham dates and peak marriage seasons (Thai, Chithirai, Aavani, Karthigai), we recommend reserving your date 3 to 6 months in advance to guarantee chef availability and dedicated supervisory crew. For intimate poojas, housewarmings, and birthdays, 2 to 4 weeks advance notice is typically sufficient.',
    category: 'booking',
  },
  {
    id: 'faq-2',
    question: 'Do you cater outside K V Kuppam, and how are logistics managed for outstation venues?',
    answer:
      'Yes, we regularly cater across Tamil Nadu and neighbouring states, including Kanchipuram, Chengalpattu, Coimbatore, Madurai, Tirupati, Pondicherry, and Bengaluru. Our mobile cold-chain logistics, mobile kitchen fleet, and senior master chefs travel directly to the venue to ensure food is prepared fresh on-site without any loss of aroma or temperature.',
    category: 'service',
  },
  {
    id: 'faq-3',
    question: 'Can we schedule a food tasting session before confirming our wedding menu?',
    answer:
      'Absolutely. We host exclusive, private tasting sessions at our Mylapore Culinary Experience Center where families can sample our signature sweets, tiffin items, sambar varieties, rasam, and kalyana payasam. Tasting sessions can be arranged upon preliminary menu consultation.',
    category: 'menu',
  },
  {
    id: 'faq-4',
    question: 'What is the minimum and maximum guest capacity you accommodate?',
    answer:
      'We cater for intimate milestone gatherings starting from 50 guests (Grihapravesham, Seemantham, Upanayanam, Sashtiapthapoorthi) up to grand wedding banquets and corporate conferences exceeding 10,000 guests in a single day, supported by our 350+ master chefs and hospitality staff.',
    category: 'service',
  },
  {
    id: 'faq-5',
    question: 'Do you provide full traditional banana leaf dining with uniformed servers?',
    answer:
      'Yes! We provide complete end-to-end traditional banana leaf service. Our servers are elegantly attired in traditional South Indian dhotis/uniforms and trained in traditional serving protocol — from leaf placement, salt & sweet first, sequential Arusuvai courses, piping-hot ghee pourings, to hygienic post-meal leaf clearance.',
    category: 'service',
  },
  {
    id: 'faq-6',
    question: 'Do you cater both Vegetarian and Non-Vegetarian events with separate preparation kitchens?',
    answer:
      'Yes, absolutely. We specialize in both authentic South Indian Vegetarian feasts and rich Non-Vegetarian celebrations. To respect traditional sanctity and dietary preferences, we maintain strictly separate cooking teams, dedicated cookware, and separate preparation areas for pure vegetarian, Brahmin, and Jain requirements, alongside our master non-vegetarian kitchens renowned for signature biryanis, seafood, and Chettinad gravies.',
    category: 'menu',
  },
  {
    id: 'faq-7',
    question: 'Do you handle the entire wedding series from Marudhani/Mehendi to Maruveedu?',
    answer:
      'Yes, we specialize in complete end-to-end wedding catering orchestration across all ceremonies: Welcome Hi-Tea & Mehendi/Marudhani, Nichayathartham, Janavasam/Sangeet dinner, early morning Muhurtham breakfast, grand Afternoon Banana Leaf Virundhu, evening Reception buffet, and farewell Maruveedu feast.',
    category: 'service',
  },
  {
    id: 'faq-8',
    question: 'What safety, ingredient quality, and hygiene standards do you uphold?',
    answer:
      'All our central kitchens and banquet setups operate under strict 100% FSSAI compliance. We use exclusively certified organic raw spices, farm-fresh local vegetables, double-filtered purified RO water for all cooking, and zero artificial coloring or taste enhancers (MSG). Chefs and servers wear sterile hairnets, gloves, and chef coats at all times.',
    category: 'hygiene',
  },
];
