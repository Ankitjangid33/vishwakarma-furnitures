/**
 * Website ki saari lines — Hindi aur English dono.
 * Naya text jodna ho to niche dono bhasha me likh dein: key: { en: '...', hi: '...' }
 */

export const LANGS = ['hi', 'en'];
export const DEFAULT_LANG = 'hi';

export const DICT = {
  /* ---------------- Common ---------------- */
  brand: { en: 'Vishwakarma Furniture', hi: 'विश्वकर्मा फर्नीचर' },
  tagline: { en: 'Handmade wooden furniture since years', hi: 'सालों से हाथ से बना लकड़ी का फर्नीचर' },
  loading: { en: 'Loading…', hi: 'लोड हो रहा है…' },
  error: { en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई' },
  retry: { en: 'Try again', hi: 'दोबारा कोशिश करें' },
  save: { en: 'Save', hi: 'सेव करें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  delete: { en: 'Delete', hi: 'हटाएं' },
  edit: { en: 'Edit', hi: 'बदलें' },
  close: { en: 'Close', hi: 'बंद करें' },
  search: { en: 'Search', hi: 'खोजें' },
  all: { en: 'All', hi: 'सभी' },
  from: { en: 'From', hi: 'शुरू' },
  onRequest: { en: 'Price on request', hi: 'दाम पूछें' },
  perPiece: { en: '/ piece', hi: '/ नग' },
  perSet: { en: '/ set', hi: '/ सेट' },
  perSqft: { en: '/ sq.ft', hi: '/ वर्ग फुट' },
  perRunningFt: { en: '/ running ft', hi: '/ रनिंग फुट' },
  days: { en: 'days', hi: 'दिन' },
  viewAll: { en: 'View all', hi: 'सभी देखें' },
  callNow: { en: 'Call Now', hi: 'अभी कॉल करें' },
  whatsapp: { en: 'WhatsApp', hi: 'व्हाट्सऐप' },

  /* ---------------- Navigation ---------------- */
  navHome: { en: 'Home', hi: 'होम' },
  navProducts: { en: 'Products', hi: 'सामान' },
  navGallery: { en: 'Our Work', hi: 'हमारा काम' },
  navAbout: { en: 'About Us', hi: 'हमारे बारे में' },
  navContact: { en: 'Contact', hi: 'संपर्क' },
  navCart: { en: 'Order List', hi: 'ऑर्डर लिस्ट' },
  langLabel: { en: 'भाषा', hi: 'Language' },

  /* ---------------- Home ---------------- */
  heroEyebrow: { en: 'Wood work you can trust', hi: 'भरोसे का लकड़ी का काम' },
  heroTitle: {
    en: 'Furniture made by hand, made for your home',
    hi: 'हाथ से बना फर्नीचर, आपके घर के लिए'
  },
  heroSub: {
    en: 'Beds, wardrobes, sofas, modular kitchens, temples and doors — made to your size, in the wood you choose. Free measurement at your home.',
    hi: 'बेड, कपाट, सोफा, मॉड्यूलर किचन, मंदिर और दरवाजे — आपके नाप के अनुसार, आपकी पसंद की लकड़ी में। घर पर मुफ्त नाप।'
  },
  heroCta1: { en: 'See Our Products', hi: 'हमारा सामान देखें' },
  heroCta2: { en: 'Book an Order', hi: 'ऑर्डर बुक करें' },
  statYears: { en: 'Years of experience', hi: 'साल का अनुभव' },
  statProjects: { en: 'Homes furnished', hi: 'घरों में काम' },
  statWarranty: { en: 'Year warranty', hi: 'साल वारंटी' },

  categoriesTitle: { en: 'Order room by room', hi: 'कमरे के हिसाब से ऑर्डर करें' },
  categoriesSub: {
    en: 'Pick a room and choose exactly what you need — a single piece or the full set.',
    hi: 'कमरा चुनिए और जो चाहिए वही लीजिए — एक अकेली चीज़ या पूरा सेट।'
  },
  featuredTitle: { en: 'Most ordered', hi: 'सबसे ज़्यादा बनने वाला सामान' },
  featuredSub: {
    en: 'Popular pieces our customers order again and again.',
    hi: 'जो सामान हमारे ग्राहक बार-बार बनवाते हैं।'
  },
  workTitle: { en: 'Our recent work', hi: 'हमारा हाल का काम' },
  workSub: {
    en: 'Real photos from real homes we have worked in.',
    hi: 'असली घरों की असली तस्वीरें, जहाँ हमने काम किया है।'
  },
  whyTitle: { en: 'Why choose us', hi: 'हमें क्यों चुनें' },
  why1Title: { en: 'Solid wood, honest work', hi: 'असली लकड़ी, ईमानदार काम' },
  why1Text: {
    en: 'Teak, sheesham or marine ply — we tell you exactly what goes into your furniture.',
    hi: 'सागवान, शीशम या मरीन प्लाई — आपके फर्नीचर में क्या लगा है, हम साफ बताते हैं।'
  },
  why2Title: { en: 'Made to your size', hi: 'आपके नाप का' },
  why2Text: {
    en: 'Free measurement at home. Every piece is built for your room, not a showroom.',
    hi: 'घर पर मुफ्त नाप। हर चीज़ आपके कमरे के लिए बनती है, शोरूम के लिए नहीं।'
  },
  why3Title: { en: 'Delivery on time', hi: 'समय पर डिलीवरी' },
  why3Text: {
    en: 'We give a date and we keep it, with fitting done at your home.',
    hi: 'हम तारीख देते हैं और निभाते हैं, फिटिंग भी घर पर करके देते हैं।'
  },
  why4Title: { en: 'Repair & polish support', hi: 'रिपेयर और पॉलिश सपोर्ट' },
  why4Text: {
    en: 'After delivery too, we handle repair, polish and hardware changes.',
    hi: 'डिलीवरी के बाद भी मरम्मत, पॉलिश और फिटिंग बदलना हम संभालते हैं।'
  },
  testimonialsTitle: { en: 'What customers say', hi: 'ग्राहक क्या कहते हैं' },
  ctaTitle: { en: 'Ready to get your furniture made?', hi: 'अपना फर्नीचर बनवाने के लिए तैयार हैं?' },
  ctaSub: {
    en: 'Tell us what you need. We will visit, measure and give you a clear price.',
    hi: 'हमें बताइए क्या चाहिए। हम आकर नाप लेंगे और साफ-साफ दाम बताएंगे।'
  },

  /* ---------------- Products ---------------- */
  productsTitle: { en: 'Our Products', hi: 'हमारा सामान' },
  productsSub: {
    en: 'Single pieces or full room sets — order whatever you need.',
    hi: 'अकेली चीज़ें या पूरे कमरे का सेट — जो चाहिए वो ऑर्डर करें।'
  },
  filterCategory: { en: 'Room', hi: 'कमरा' },
  filterType: { en: 'Type', hi: 'प्रकार' },
  typeItem: { en: 'Single item', hi: 'अकेली चीज़' },
  typeSet: { en: 'Full set', hi: 'पूरा सेट' },
  searchPlaceholder: { en: 'Search bed, wardrobe, sofa…', hi: 'बेड, कपाट, सोफा… खोजें' },
  noProducts: { en: 'No items found here.', hi: 'यहाँ कोई सामान नहीं मिला।' },
  clearFilters: { en: 'Clear filters', hi: 'फ़िल्टर हटाएं' },
  itemsFound: { en: 'items', hi: 'चीज़ें' },
  material: { en: 'Material', hi: 'लकड़ी / सामग्री' },
  size: { en: 'Size', hi: 'नाप' },
  readyIn: { en: 'Ready in', hi: 'तैयार होने में' },
  includesTitle: { en: 'This set includes', hi: 'इस सेट में शामिल है' },
  addToOrder: { en: 'Add to order', hi: 'ऑर्डर में जोड़ें' },
  added: { en: 'Added ✓', hi: 'जुड़ गया ✓' },
  orderThis: { en: 'Order this', hi: 'यह ऑर्डर करें' },
  askPrice: { en: 'Ask price on WhatsApp', hi: 'व्हाट्सऐप पर दाम पूछें' },
  relatedTitle: { en: 'You may also need', hi: 'यह भी काम आ सकता है' },
  backToProducts: { en: 'Back to products', hi: 'सामान पर वापस' },
  photoComing: { en: 'Photo coming soon', hi: 'फोटो जल्द आएगी' },

  /* ---------------- Gallery ---------------- */
  galleryTitle: { en: 'Work We Have Done', hi: 'हमारा किया हुआ काम' },
  gallerySub: {
    en: 'Every photo here is furniture we built and installed ourselves.',
    hi: 'यहाँ की हर तस्वीर हमारा खुद बनाया और लगाया हुआ फर्नीचर है।'
  },
  noGallery: { en: 'Photos will be added soon.', hi: 'तस्वीरें जल्द जोड़ी जाएंगी।' },

  /* ---------------- About ---------------- */
  aboutTitle: { en: 'About Vishwakarma Furniture', hi: 'विश्वकर्मा फर्नीचर के बारे में' },
  aboutP1: {
    en: 'We are a family carpentry workshop. What started with one saw and one table has grown into a full team that furnishes complete homes — bedrooms, kitchens, living rooms, temples and doors.',
    hi: 'हम एक परिवार की बढ़ईगिरी की वर्कशॉप हैं। जो काम एक आरी और एक टेबल से शुरू हुआ था, आज पूरी टीम बनकर पूरे घर का फर्नीचर बनाती है — बेडरूम, किचन, लिविंग रूम, मंदिर और दरवाजे।'
  },
  aboutP2: {
    en: 'We do not sell ready-made boxes. We come to your home, take the measurement, show you the wood, and build the piece in our own workshop. You see the work at every step.',
    hi: 'हम बना-बनाया डिब्बा नहीं बेचते। हम आपके घर आते हैं, नाप लेते हैं, लकड़ी दिखाते हैं और अपनी वर्कशॉप में बनाते हैं। हर कदम पर आप काम देख सकते हैं।'
  },
  aboutPromiseTitle: { en: 'Our promise', hi: 'हमारा वादा' },
  aboutPromise1: { en: 'The wood we promise is the wood you get.', hi: 'जो लकड़ी बोली, वही लगेगी।' },
  aboutPromise2: { en: 'Price is fixed before work starts — no surprises later.', hi: 'काम शुरू होने से पहले दाम तय — बाद में कोई बढ़ोतरी नहीं।' },
  aboutPromise3: { en: 'Fitting at your home is included.', hi: 'घर पर फिटिंग हमारी तरफ से।' },
  aboutPromise4: { en: 'Any problem after delivery, we come back.', hi: 'डिलीवरी के बाद दिक्कत हुई तो हम दोबारा आते हैं।' },
  processTitle: { en: 'How an order works', hi: 'ऑर्डर कैसे होता है' },
  step1Title: { en: '1. Tell us', hi: '1. हमें बताइए' },
  step1Text: { en: 'Book on the website or WhatsApp us a photo of what you want.', hi: 'वेबसाइट से ऑर्डर करें या व्हाट्सऐप पर फोटो भेजें।' },
  step2Title: { en: '2. Free measurement', hi: '2. मुफ्त नाप' },
  step2Text: { en: 'We visit your home, measure the space and fix the design.', hi: 'हम घर आकर जगह नापते हैं और डिज़ाइन तय करते हैं।' },
  step3Title: { en: '3. Clear price', hi: '3. साफ दाम' },
  step3Text: { en: 'You get a written price and delivery date before we start.', hi: 'काम शुरू करने से पहले लिखित दाम और तारीख मिलती है।' },
  step4Title: { en: '4. Making & fitting', hi: '4. बनाना और फिटिंग' },
  step4Text: { en: 'We build it in our workshop and fit it at your home.', hi: 'हम वर्कशॉप में बनाते हैं और आपके घर लगाकर देते हैं।' },

  /* ---------------- Cart / Order ---------------- */
  cartTitle: { en: 'Your Order List', hi: 'आपकी ऑर्डर लिस्ट' },
  cartEmpty: { en: 'Your order list is empty.', hi: 'आपकी ऑर्डर लिस्ट खाली है।' },
  cartEmptyHint: { en: 'Add furniture you want and book it together.', hi: 'जो फर्नीचर चाहिए उसे जोड़िए और एक साथ बुक कीजिए।' },
  browseProducts: { en: 'Browse products', hi: 'सामान देखें' },
  quantity: { en: 'Quantity', hi: 'संख्या' },
  remove: { en: 'Remove', hi: 'हटाएं' },
  estimate: { en: 'Estimated total', hi: 'अनुमानित कुल' },
  estimateNote: {
    en: 'This is only an estimate. Final price is fixed after measurement.',
    hi: 'यह सिर्फ अनुमान है। असली दाम नाप लेने के बाद तय होगा।'
  },
  quoteItemsNote: {
    en: 'Some items are priced after we see the work.',
    hi: 'कुछ चीज़ों का दाम काम देखने के बाद बताया जाएगा।'
  },
  proceedToBook: { en: 'Book this order', hi: 'यह ऑर्डर बुक करें' },
  bookingTitle: { en: 'Book Your Order', hi: 'अपना ऑर्डर बुक करें' },
  bookingSub: {
    en: 'Fill your details — we will call you within a day to confirm.',
    hi: 'अपनी जानकारी भरें — हम एक दिन के अंदर पक्का करने के लिए कॉल करेंगे।'
  },
  yourName: { en: 'Your name', hi: 'आपका नाम' },
  phoneNumber: { en: 'Mobile number', hi: 'मोबाइल नंबर' },
  emailOptional: { en: 'Email (optional)', hi: 'ईमेल (ज़रूरी नहीं)' },
  address: { en: 'Address', hi: 'पता' },
  city: { en: 'City', hi: 'शहर' },
  pincode: { en: 'Pincode', hi: 'पिन कोड' },
  noteLabel: { en: 'Anything else you want to tell us?', hi: 'कुछ और बताना चाहते हैं?' },
  notePlaceholder: {
    en: 'Colour, wood, design, deadline…',
    hi: 'रंग, लकड़ी, डिज़ाइन, कब तक चाहिए…'
  },
  visitRequest: { en: 'I want a free measurement visit at home', hi: 'मुझे घर पर मुफ्त नाप चाहिए' },
  placeOrder: { en: 'Confirm booking', hi: 'बुकिंग पक्की करें' },
  sending: { en: 'Sending…', hi: 'भेजा जा रहा है…' },
  orderPlaced: { en: 'Your order is booked!', hi: 'आपका ऑर्डर बुक हो गया!' },
  orderPlacedSub: {
    en: 'We have received your request. Our team will call you soon.',
    hi: 'हमें आपकी बात मिल गई है। हमारी टीम जल्द आपको कॉल करेगी।'
  },
  orderNumber: { en: 'Order number', hi: 'ऑर्डर नंबर' },
  sendOnWhatsapp: { en: 'Also send on WhatsApp', hi: 'व्हाट्सऐप पर भी भेजें' },
  backHome: { en: 'Back to home', hi: 'होम पर वापस' },

  /* ---------------- Contact ---------------- */
  contactTitle: { en: 'Contact Us', hi: 'हमसे संपर्क करें' },
  contactSub: {
    en: 'Call, WhatsApp or send a message — we reply the same day.',
    hi: 'कॉल करें, व्हाट्सऐप करें या संदेश भेजें — हम उसी दिन जवाब देते हैं।'
  },
  phoneLabel: { en: 'Phone', hi: 'फोन' },
  emailLabel: { en: 'Email', hi: 'ईमेल' },
  addressLabel: { en: 'Workshop address', hi: 'वर्कशॉप का पता' },
  hoursLabel: { en: 'Open hours', hi: 'खुलने का समय' },
  messageLabel: { en: 'Your message', hi: 'आपका संदेश' },
  subjectLabel: { en: 'Subject', hi: 'विषय' },
  sendMessage: { en: 'Send message', hi: 'संदेश भेजें' },
  messageSent: { en: 'Message sent! We will get back to you soon.', hi: 'संदेश भेज दिया! हम जल्द जवाब देंगे।' },

  /* ---------------- Form errors ---------------- */
  errName: { en: 'Please enter your name', hi: 'कृपया अपना नाम लिखें' },
  errPhone: { en: 'Please enter a valid 10-digit mobile number', hi: 'कृपया सही 10 अंकों का मोबाइल नंबर लिखें' },
  errMessage: { en: 'Please write your message', hi: 'कृपया अपना संदेश लिखें' },
  errEmpty: { en: 'Add at least one item first', hi: 'पहले कम से कम एक चीज़ जोड़ें' },
  required: { en: 'required', hi: 'ज़रूरी' },

  /* ---------------- Footer ---------------- */
  footerAbout: {
    en: 'Custom wooden furniture for bedrooms, kitchens, living rooms, offices and temples. Made in our own workshop.',
    hi: 'बेडरूम, किचन, लिविंग रूम, ऑफिस और मंदिर का फर्नीचर — हमारी अपनी वर्कशॉप में बना।'
  },
  quickLinks: { en: 'Quick links', hi: 'तुरंत पहुँचें' },
  ourWork: { en: 'What we make', hi: 'हम क्या बनाते हैं' },
  reachUs: { en: 'Reach us', hi: 'हम तक पहुँचें' },
  rights: { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' },

  /* ---------------- Admin ---------------- */
  adminLogin: { en: 'Admin Login', hi: 'एडमिन लॉगिन' },
  adminPassword: { en: 'Password', hi: 'पासवर्ड' },
  adminLoginBtn: { en: 'Login', hi: 'लॉगिन' },
  adminWrongPass: { en: 'Wrong password', hi: 'पासवर्ड गलत है' },
  adminDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  adminProducts: { en: 'Products', hi: 'सामान' },
  adminGallery: { en: 'Gallery', hi: 'गैलरी' },
  adminOrders: { en: 'Orders', hi: 'ऑर्डर' },
  adminMessages: { en: 'Messages', hi: 'संदेश' },
  adminLogout: { en: 'Logout', hi: 'लॉगआउट' }
};

/** t('navHome', 'hi') -> 'होम' */
/**
 * key -> us bhasha ki line.
 * `extra` me alag dictionary de sakte hain (jaise admin panel ki) —
 * pehle wahan dekhte hain, na mile to website wali DICT me.
 */
export function t(key, lang = DEFAULT_LANG, extra = null) {
  const entry = extra?.[key] || DICT[key];
  if (!entry) return key;
  return entry[lang] ?? entry[DEFAULT_LANG] ?? key;
}

/** DB ke bilingual field ke liye: pick({en, hi}, lang) */
export function pick(obj, lang = DEFAULT_LANG) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.hi || obj.en || '';
}

/** ₹42,000 */
export function formatPrice(amount, lang = DEFAULT_LANG) {
  const n = Number(amount) || 0;
  return '₹' + n.toLocaleString(lang === 'hi' ? 'en-IN' : 'en-IN');
}

export const UNIT_KEY = {
  piece: 'perPiece',
  set: 'perSet',
  sqft: 'perSqft',
  runningft: 'perRunningFt'
};
