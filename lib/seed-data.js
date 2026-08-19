/**
 * Shuruaati data — `npm run seed` chalane par ye database me chala jaata hai.
 * Baad me sab kuch /admin panel se add/edit ho sakta hai.
 *
 * images: [] rakha hai — admin panel se apni asli photo upload karein.
 */

export const SEED_PRODUCTS = [
  /* ---------------- BEDROOM / बेडरूम ---------------- */
  {
    slug: 'teak-double-bed',
    category: 'bedroom',
    type: 'item',
    featured: true,
    name: { en: 'Teak Wood Double Bed', hi: 'सागवान डबल बेड' },
    description: {
      en: 'Solid teak king-size bed with storage box and cushioned headboard.',
      hi: 'सॉलिड सागवान किंग साइज़ बेड, स्टोरेज बॉक्स और कुशन हेडबोर्ड के साथ।'
    },
    price: 42000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Teak Wood', hi: 'सागवान लकड़ी' },
    size: '6 x 6.5 ft',
    deliveryDays: 15,
    sortOrder: 1
  },
  {
    slug: 'single-bed-drawer',
    category: 'bedroom',
    type: 'item',
    name: { en: 'Single Bed with Drawer', hi: 'सिंगल बेड (दराज़ के साथ)' },
    description: {
      en: 'Space-saving single bed with two smooth-sliding drawers.',
      hi: 'कम जगह में फिट होने वाला सिंगल बेड, दो आसान स्लाइडिंग दराज़ के साथ।'
    },
    price: 18000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '3 x 6 ft',
    deliveryDays: 10,
    sortOrder: 2
  },
  {
    slug: '3-door-wardrobe',
    category: 'bedroom',
    type: 'item',
    featured: true,
    name: { en: '3-Door Wardrobe (Kapat)', hi: '3 दरवाजे का कपाट / अलमारी' },
    description: {
      en: 'Full-height wardrobe with mirror, locker and hanging space.',
      hi: 'पूरी ऊँचाई का कपाट — शीशा, लॉकर और कपड़े टांगने की जगह के साथ।'
    },
    price: 35000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood + Laminate', hi: 'प्लाईवुड + लेमिनेट' },
    size: '6 x 7 ft',
    deliveryDays: 12,
    sortOrder: 3
  },
  {
    slug: 'dressing-table',
    category: 'bedroom',
    type: 'item',
    name: { en: 'Dressing Table with Mirror', hi: 'ड्रेसिंग टेबल (शीशे के साथ)' },
    description: {
      en: 'Wall-mounted dressing unit with drawers and soft lighting option.',
      hi: 'दीवार पर लगने वाली ड्रेसिंग यूनिट, दराज़ और लाइट के विकल्प के साथ।'
    },
    price: 12500,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood', hi: 'प्लाईवुड' },
    size: '3 x 5 ft',
    deliveryDays: 8,
    sortOrder: 4
  },
  {
    slug: 'bed-side-table',
    category: 'bedroom',
    type: 'item',
    name: { en: 'Bed Side Table', hi: 'साइड टेबल' },
    description: {
      en: 'Compact bedside table with one drawer and an open shelf.',
      hi: 'छोटी साइड टेबल — एक दराज़ और खुली शेल्फ के साथ।'
    },
    price: 3500,
    priceType: 'fixed',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '1.5 x 2 ft',
    deliveryDays: 5,
    sortOrder: 5
  },
  {
    slug: 'complete-bedroom-set',
    category: 'bedroom',
    type: 'set',
    featured: true,
    name: { en: 'Complete Bedroom Set', hi: 'पूरा बेडरूम सेट' },
    description: {
      en: 'Double bed + 3-door wardrobe + dressing table + 2 side tables. One room, one price.',
      hi: 'डबल बेड + 3 दरवाजे का कपाट + ड्रेसिंग टेबल + 2 साइड टेबल। पूरा कमरा, एक दाम।'
    },
    price: 89000,
    priceType: 'from',
    unit: 'set',
    material: { en: 'Teak / Plywood', hi: 'सागवान / प्लाईवुड' },
    size: '',
    deliveryDays: 30,
    includes: [
      { en: 'Double bed with storage', hi: 'स्टोरेज वाला डबल बेड' },
      { en: '3-door wardrobe', hi: '3 दरवाजे का कपाट' },
      { en: 'Dressing table', hi: 'ड्रेसिंग टेबल' },
      { en: '2 side tables', hi: '2 साइड टेबल' }
    ],
    sortOrder: 0
  },

  /* ---------------- LIVING ROOM / लिविंग रूम ---------------- */
  {
    slug: '5-seater-sofa-set',
    category: 'living',
    type: 'item',
    featured: true,
    name: { en: '5-Seater Sofa Set (3+1+1)', hi: '5 सीटर सोफा सेट (3+1+1)' },
    description: {
      en: 'Hardwood frame with high-density foam and fabric of your choice.',
      hi: 'मजबूत लकड़ी का ढांचा, हाई-डेंसिटी फोम और आपकी पसंद का कपड़ा।'
    },
    price: 32000,
    priceType: 'from',
    unit: 'set',
    material: { en: 'Hardwood + Foam', hi: 'हार्डवुड + फोम' },
    size: '3+1+1',
    deliveryDays: 14,
    sortOrder: 1
  },
  {
    slug: 'wall-tv-unit',
    category: 'living',
    type: 'item',
    name: { en: 'Wall TV Unit', hi: 'टीवी यूनिट' },
    description: {
      en: 'Modern TV panel with hidden wire routing and side storage.',
      hi: 'मॉडर्न टीवी पैनल — तार छुपाने की जगह और साइड स्टोरेज के साथ।'
    },
    price: 16000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood + Laminate', hi: 'प्लाईवुड + लेमिनेट' },
    size: '7 x 4 ft',
    deliveryDays: 10,
    sortOrder: 2
  },
  {
    slug: 'center-table',
    category: 'living',
    type: 'item',
    name: { en: 'Center Table', hi: 'सेंटर टेबल' },
    description: {
      en: 'Solid wood center table, glass top optional.',
      hi: 'सॉलिड लकड़ी की सेंटर टेबल, कांच का टॉप वैकल्पिक।'
    },
    price: 7500,
    priceType: 'fixed',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '4 x 2 ft',
    deliveryDays: 7,
    sortOrder: 3
  },
  {
    slug: 'shoe-rack-cabinet',
    category: 'living',
    type: 'item',
    name: { en: 'Shoe Rack Cabinet', hi: 'शू रैक' },
    description: {
      en: 'Closed shoe cabinet with 4 shelves and soft-close doors.',
      hi: 'बंद शू कैबिनेट — 4 शेल्फ और सॉफ्ट-क्लोज़ दरवाजे।'
    },
    price: 8500,
    priceType: 'fixed',
    unit: 'piece',
    material: { en: 'Plywood', hi: 'प्लाईवुड' },
    size: '3 x 3.5 ft',
    deliveryDays: 7,
    sortOrder: 4
  },
  {
    slug: 'living-room-package',
    category: 'living',
    type: 'set',
    name: { en: 'Living Room Package', hi: 'लिविंग रूम पैकेज' },
    description: {
      en: 'Sofa set + TV unit + center table + shoe rack — full drawing room setup.',
      hi: 'सोफा सेट + टीवी यूनिट + सेंटर टेबल + शू रैक — पूरा ड्राइंग रूम तैयार।'
    },
    price: 58000,
    priceType: 'from',
    unit: 'set',
    material: { en: 'Mixed', hi: 'मिक्स' },
    size: '',
    deliveryDays: 25,
    includes: [
      { en: '5-seater sofa set', hi: '5 सीटर सोफा सेट' },
      { en: 'Wall TV unit', hi: 'टीवी यूनिट' },
      { en: 'Center table', hi: 'सेंटर टेबल' },
      { en: 'Shoe rack', hi: 'शू रैक' }
    ],
    sortOrder: 0
  },

  /* ---------------- KITCHEN / किचन ---------------- */
  {
    slug: 'modular-kitchen',
    category: 'kitchen',
    type: 'set',
    featured: true,
    name: { en: 'Modular Kitchen (L-Shape)', hi: 'मॉड्यूलर किचन (L शेप)' },
    description: {
      en: 'Waterproof marine ply base, granite-ready top and soft-close hardware. Price per running foot.',
      hi: 'वाटरप्रूफ मरीन प्लाई बेस, ग्रेनाइट-रेडी टॉप और सॉफ्ट-क्लोज़ फिटिंग। दाम प्रति रनिंग फुट।'
    },
    price: 1800,
    priceType: 'from',
    unit: 'runningft',
    material: { en: 'Marine Plywood', hi: 'मरीन प्लाईवुड' },
    size: '',
    deliveryDays: 20,
    sortOrder: 1
  },
  {
    slug: 'crockery-unit',
    category: 'kitchen',
    type: 'item',
    name: { en: 'Crockery Unit', hi: 'क्रॉकरी यूनिट' },
    description: {
      en: 'Glass-front crockery cabinet with lower storage drawers.',
      hi: 'कांच के दरवाजे वाली क्रॉकरी कैबिनेट, नीचे स्टोरेज दराज़।'
    },
    price: 14000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood + Glass', hi: 'प्लाईवुड + कांच' },
    size: '3 x 6 ft',
    deliveryDays: 10,
    sortOrder: 2
  },
  {
    slug: 'kitchen-trolley-set',
    category: 'kitchen',
    type: 'item',
    name: { en: 'Kitchen Trolley Set', hi: 'किचन ट्रॉली सेट' },
    description: {
      en: 'Stainless steel basket trolleys fitted inside your kitchen base.',
      hi: 'स्टेनलेस स्टील बास्केट ट्रॉली, किचन बेस में फिट करके।'
    },
    price: 9500,
    priceType: 'from',
    unit: 'set',
    material: { en: 'SS 304', hi: 'एसएस 304' },
    size: '',
    deliveryDays: 6,
    sortOrder: 3
  },

  /* ---------------- OFFICE / ऑफिस ---------------- */
  {
    slug: 'office-table',
    category: 'office',
    type: 'item',
    name: { en: 'Office Table', hi: 'ऑफिस टेबल' },
    description: {
      en: 'Executive work table with drawer unit and cable manager.',
      hi: 'एग्जीक्यूटिव वर्क टेबल — दराज़ यूनिट और केबल मैनेजर के साथ।'
    },
    price: 13000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood + Laminate', hi: 'प्लाईवुड + लेमिनेट' },
    size: '4 x 2 ft',
    deliveryDays: 8,
    sortOrder: 1
  },
  {
    slug: 'study-table-shelf',
    category: 'office',
    type: 'item',
    name: { en: 'Study Table with Shelf', hi: 'स्टडी टेबल (शेल्फ के साथ)' },
    description: {
      en: 'Kids study table with book shelf above and drawer below.',
      hi: 'बच्चों की स्टडी टेबल — ऊपर बुक शेल्फ, नीचे दराज़।'
    },
    price: 8500,
    priceType: 'fixed',
    unit: 'piece',
    material: { en: 'Plywood', hi: 'प्लाईवुड' },
    size: '3.5 x 2 ft',
    deliveryDays: 7,
    sortOrder: 2
  },
  {
    slug: 'book-shelf',
    category: 'office',
    type: 'item',
    name: { en: 'Book Shelf', hi: 'बुक शेल्फ' },
    description: {
      en: 'Five-tier open book shelf, wall-fixed for safety.',
      hi: 'पाँच खाने वाली खुली बुक शेल्फ, सुरक्षा के लिए दीवार पर फिक्स।'
    },
    price: 6500,
    priceType: 'fixed',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '3 x 6 ft',
    deliveryDays: 6,
    sortOrder: 3
  },

  /* ---------------- TEMPLE / मंदिर ---------------- */
  {
    slug: 'carved-wooden-mandir',
    category: 'temple',
    type: 'item',
    featured: true,
    name: { en: 'Carved Wooden Mandir', hi: 'नक्काशीदार लकड़ी का मंदिर' },
    description: {
      en: 'Hand-carved temple with dome, doors, drawer and brass finish work.',
      hi: 'हाथ की नक्काशी वाला मंदिर — गुंबद, दरवाजे, दराज़ और पीतल का काम।'
    },
    price: 22000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Teak Wood', hi: 'सागवान लकड़ी' },
    size: '2.5 x 5 ft',
    deliveryDays: 18,
    sortOrder: 1
  },
  {
    slug: 'wall-mandir',
    category: 'temple',
    type: 'item',
    name: { en: 'Wall Mounted Mandir', hi: 'दीवार वाला मंदिर' },
    description: {
      en: 'Compact wall temple for flats and small pooja corners.',
      hi: 'फ्लैट और छोटे पूजा कोने के लिए छोटा दीवार मंदिर।'
    },
    price: 7500,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '2 x 2.5 ft',
    deliveryDays: 8,
    sortOrder: 2
  },

  /* ---------------- DOORS / दरवाजे ---------------- */
  {
    slug: 'carved-main-door',
    category: 'doors',
    type: 'item',
    name: { en: 'Carved Main Door', hi: 'नक्काशीदार मेन डोर' },
    description: {
      en: 'Heavy teak main door with frame, carving and polish included.',
      hi: 'भारी सागवान मेन डोर — चौखट, नक्काशी और पॉलिश सहित।'
    },
    price: 28000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Teak Wood', hi: 'सागवान लकड़ी' },
    size: '3.5 x 7 ft',
    deliveryDays: 14,
    sortOrder: 1
  },
  {
    slug: 'room-door-frame',
    category: 'doors',
    type: 'item',
    name: { en: 'Room Door with Frame', hi: 'रूम डोर (चौखट सहित)' },
    description: {
      en: 'Flush or panel room door with frame, fitting included.',
      hi: 'फ्लश या पैनल रूम डोर, चौखट और फिटिंग सहित।'
    },
    price: 9000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Plywood / Wood', hi: 'प्लाईवुड / लकड़ी' },
    size: '3 x 7 ft',
    deliveryDays: 7,
    sortOrder: 2
  },
  {
    slug: 'wooden-window',
    category: 'doors',
    type: 'item',
    name: { en: 'Wooden Window Panel', hi: 'लकड़ी की खिड़की' },
    description: {
      en: 'Wooden window with glass, mesh and grill options.',
      hi: 'लकड़ी की खिड़की — कांच, जाली और ग्रिल के विकल्प के साथ।'
    },
    price: 11000,
    priceType: 'from',
    unit: 'piece',
    material: { en: 'Sheesham Wood', hi: 'शीशम लकड़ी' },
    size: '4 x 4 ft',
    deliveryDays: 9,
    sortOrder: 3
  },

  /* ---------------- CUSTOM / कस्टम ---------------- */
  {
    slug: 'custom-design',
    category: 'custom',
    type: 'set',
    featured: true,
    name: { en: 'Your Own Design', hi: 'आपका अपना डिज़ाइन' },
    description: {
      en: 'Send us a photo or drawing — we build it in your size, wood and budget. Free measurement at home.',
      hi: 'हमें फोटो या ड्राइंग भेजें — हम आपके साइज़, लकड़ी और बजट में बना देंगे। घर पर मुफ्त नाप।'
    },
    price: 0,
    priceType: 'quote',
    unit: 'piece',
    material: { en: 'As required', hi: 'जैसा चाहिए' },
    size: '',
    deliveryDays: 0,
    sortOrder: 1
  },
  {
    slug: 'repair-polish-service',
    category: 'custom',
    type: 'item',
    name: { en: 'Repair & Polish Service', hi: 'रिपेयर और पॉलिश सर्विस' },
    description: {
      en: 'Old furniture repair, re-polish and hardware replacement at your home.',
      hi: 'पुराने फर्नीचर की मरम्मत, दोबारा पॉलिश और फिटिंग बदलना — आपके घर पर।'
    },
    price: 0,
    priceType: 'quote',
    unit: 'piece',
    material: { en: 'Service', hi: 'सर्विस' },
    size: '',
    deliveryDays: 0,
    sortOrder: 2
  }
];

/**
 * Gallery — aapka kiya hua kaam.
 * image.url khali chhoda hai: website apne aap ek sundar placeholder dikhayegi,
 * aur admin panel se asli photo lagate hi wo dikhne lagegi.
 */
export const SEED_GALLERY = [
  { title: { en: 'Teak Bedroom Set', hi: 'सागवान बेडरूम सेट' }, location: { en: 'Malviya Nagar', hi: 'मालवीय नगर' }, category: 'bedroom', year: 2025, featured: true },
  { title: { en: 'L-Shape Modular Kitchen', hi: 'L शेप मॉड्यूलर किचन' }, location: { en: 'Vaishali Nagar', hi: 'वैशाली नगर' }, category: 'kitchen', year: 2025, featured: true },
  { title: { en: 'Sofa Set & TV Unit', hi: 'सोफा सेट और टीवी यूनिट' }, location: { en: 'Mansarovar', hi: 'मानसरोवर' }, category: 'living', year: 2025, featured: true },
  { title: { en: 'Carved Mandir', hi: 'नक्काशीदार मंदिर' }, location: { en: 'Client Home', hi: 'ग्राहक के घर' }, category: 'temple', year: 2024, featured: true },
  { title: { en: 'Main Door Carving Work', hi: 'मेन डोर नक्काशी का काम' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'doors', year: 2024 },
  { title: { en: 'Sliding Wardrobe', hi: 'स्लाइडिंग कपाट' }, location: { en: '2BHK Flat', hi: '2BHK फ्लैट' }, category: 'bedroom', year: 2024 },
  { title: { en: 'Office Cabin Furniture', hi: 'ऑफिस केबिन फर्नीचर' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'office', year: 2024 },
  { title: { en: 'Crockery Unit with Glass Doors', hi: 'कांच के दरवाजे वाली क्रॉकरी यूनिट' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'kitchen', year: 2023 },
  { title: { en: 'Full Drawing Room Interior', hi: 'पूरा ड्राइंग रूम इंटीरियर' }, location: { en: 'Jagatpura', hi: 'जगतपुरा' }, category: 'living', year: 2023 },
  { title: { en: 'Kids Study Unit', hi: 'बच्चों की स्टडी यूनिट' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'office', year: 2023 },
  { title: { en: 'Dressing Table with Lights', hi: 'लाइट वाली ड्रेसिंग टेबल' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'bedroom', year: 2023 },
  { title: { en: 'Custom Wooden Swing (Jhula)', hi: 'कस्टम लकड़ी का झूला' }, location: { en: 'Jaipur', hi: 'जयपुर' }, category: 'custom', year: 2022 }
];
