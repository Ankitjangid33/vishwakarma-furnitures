/**
 * Business ki jaankari — ek hi jagah.
 * Phone/WhatsApp/email .env.local se aate hain, baaki yahan badal lein.
 */

export const SITE = {
  name: { en: 'Vishwakarma Furniture', hi: 'विश्वकर्मा फर्नीचर' },

  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '919876543210',
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 98765 43210',
  email: process.env.NEXT_PUBLIC_EMAIL || 'vishwakarmafurniture@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  address: {
    en: 'Main Road, Near Bus Stand, Jaipur, Rajasthan 302001',
    hi: 'मेन रोड, बस स्टैंड के पास, जयपुर, राजस्थान 302001'
  },

  hours: {
    en: 'Mon – Sat: 9:00 AM – 8:00 PM | Sunday: 10:00 AM – 2:00 PM',
    hi: 'सोम – शनि: सुबह 9 – रात 8 | रविवार: सुबह 10 – दोपहर 2'
  },

  mapEmbed: 'https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed',

  social: {
    instagram: '',
    facebook: '',
    youtube: ''
  },

  stats: { years: 15, homes: 850, warranty: 2 }
};

/** Phone dialer ke liye: +919876543210 */
export function dialNumber() {
  return '+' + String(SITE.whatsapp).replace(/\D/g, '');
}

/** WhatsApp chat link with pre-filled text */
export function waLink(text = '') {
  const num = String(SITE.whatsapp).replace(/\D/g, '');
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Home page par dikhne wale customer reviews */
export const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    place: { en: 'Jaipur', hi: 'जयपुर' },
    stars: 5,
    text: {
      en: 'Got a full bedroom set made. Finishing and polish quality is excellent, and delivery was on time.',
      hi: 'पूरा बेडरूम सेट बनवाया। फिनिशिंग और पॉलिश बहुत बढ़िया है, और डिलीवरी भी समय पर मिली।'
    }
  },
  {
    name: 'Sunita Verma',
    place: { en: 'Vaishali Nagar', hi: 'वैशाली नगर' },
    stars: 5,
    text: {
      en: 'The modular kitchen came out exactly like the design they showed. Very neat work and honest pricing.',
      hi: 'मॉड्यूलर किचन बिल्कुल वैसा ही बना जैसा डिज़ाइन दिखाया था। सफाई से काम और सही दाम।'
    }
  },
  {
    name: 'Amit Gupta',
    place: { en: 'Mansarovar', hi: 'मानसरोवर' },
    stars: 5,
    text: {
      en: 'Solid teak main door with beautiful carving. The team measured at home and handled everything.',
      hi: 'सागवान का मेन डोर, बहुत सुंदर नक्काशी के साथ। टीम ने घर आकर नाप लिया और पूरा काम संभाला।'
    }
  }
];
