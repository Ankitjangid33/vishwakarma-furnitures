/**
 * Room / category list — ye website ke har jagah use hoti hai.
 * Nayi category jodni ho to yahan ek object add kar dein.
 */

export const CATEGORIES = [
  {
    id: 'bedroom',
    icon: 'bed',
    name: { en: 'Bedroom', hi: 'बेडरूम' },
    desc: {
      en: 'Beds, wardrobes, dressing tables & side tables',
      hi: 'बेड, कपाट/अलमारी, ड्रेसिंग टेबल और साइड टेबल'
    }
  },
  {
    id: 'living',
    icon: 'sofa',
    name: { en: 'Living Room', hi: 'लिविंग रूम' },
    desc: {
      en: 'Sofa sets, TV units, center tables & shoe racks',
      hi: 'सोफा सेट, टीवी यूनिट, सेंटर टेबल और शू रैक'
    }
  },
  {
    id: 'kitchen',
    icon: 'kitchen',
    name: { en: 'Kitchen', hi: 'किचन / रसोई' },
    desc: {
      en: 'Modular kitchen, crockery units & trolleys',
      hi: 'मॉड्यूलर किचन, क्रॉकरी यूनिट और ट्रॉली'
    }
  },
  {
    id: 'office',
    icon: 'desk',
    name: { en: 'Office & Study', hi: 'ऑफिस और स्टडी' },
    desc: {
      en: 'Office tables, chairs, book shelves & study units',
      hi: 'ऑफिस टेबल, कुर्सी, बुक शेल्फ और स्टडी यूनिट'
    }
  },
  {
    id: 'temple',
    icon: 'temple',
    name: { en: 'Mandir / Temple', hi: 'मंदिर' },
    desc: {
      en: 'Handcrafted wooden temples for your home',
      hi: 'घर के लिए हाथ से बने लकड़ी के मंदिर'
    }
  },
  {
    id: 'doors',
    icon: 'door',
    name: { en: 'Doors & Windows', hi: 'दरवाजे और खिड़की' },
    desc: {
      en: 'Main doors, room doors, frames & window panels',
      hi: 'मेन डोर, रूम डोर, चौखट और खिड़की पैनल'
    }
  },
  {
    id: 'custom',
    icon: 'tools',
    name: { en: 'Custom Work', hi: 'कस्टम काम' },
    desc: {
      en: 'Any design, any size — made exactly as you want',
      hi: 'कोई भी डिज़ाइन, कोई भी साइज़ — जैसा आप चाहें वैसा'
    }
  }
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || null;
}
