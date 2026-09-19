/**
 * Admin panel ki saari lines — English aur Hindi dono.
 *
 * Website wali DICT (lib/i18n.js) se alag rakhi hai kyunki:
 *  - admin ka default English hai, website ka Hindi
 *  - dono ki chuni hui bhasha alag-alag yaad rehti hai
 *
 * Naya text jodna ho to niche dono bhasha me likh dein: key: { en: '...', hi: '...' }
 */

export const ADMIN_DEFAULT_LANG = 'en';
export const ADMIN_LANG_KEY = 'vf_admin_lang';

export const ADMIN_DICT = {
  /* ---------------- Common ---------------- */
  panel: { en: 'Admin Panel', hi: 'एडमिन पैनल' },
  loading: { en: 'Loading…', hi: 'लोड हो रहा है…' },
  saving: { en: 'Saving…', hi: 'सेव हो रहा है…' },
  save: { en: 'Save', hi: 'सेव करें' },
  saveFailed: { en: 'Could not save', hi: 'सेव नहीं हुआ' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  edit: { en: 'Edit', hi: 'बदलें' },
  delete: { en: 'Delete', hi: 'हटाएं' },
  add: { en: 'Add', hi: 'जोड़ें' },
  all: { en: 'All', hi: 'सभी' },
  active: { en: 'On', hi: 'चालू' },
  inactive: { en: 'Off', hi: 'बंद' },
  somethingWrong: { en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई' },
  notDone: { en: "Couldn't do that", hi: 'नहीं हो पाया' },
  viewAll: { en: 'View all', hi: 'सभी देखें' },
  call: { en: 'Call', hi: 'कॉल करें' },
  new: { en: 'New', hi: 'नया' },
  you: { en: 'You', hi: 'आप' },
  language: { en: 'Language', hi: 'भाषा' },

  /* ---------------- Nav / shell ---------------- */
  navDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  navProducts: { en: 'Products', hi: 'सामान' },
  navGallery: { en: 'Gallery', hi: 'गैलरी' },
  navTestimonials: { en: 'Reviews', hi: 'ग्राहकों की राय' },
  navOrders: { en: 'Orders', hi: 'ऑर्डर' },
  navMessages: { en: 'Messages', hi: 'संदेश' },
  navUsers: { en: 'Users', hi: 'यूज़र' },
  viewWebsite: { en: 'View website', hi: 'वेबसाइट देखें' },
  logout: { en: 'Log out', hi: 'लॉगआउट' },
  roleOwner: { en: 'Owner', hi: 'मालिक' },
  roleStaff: { en: 'Staff', hi: 'स्टाफ' },

  /* ---------------- Login / setup ---------------- */
  loginTitle: { en: 'Admin Panel', hi: 'एडमिन पैनल' },
  username: { en: 'Username', hi: 'यूज़रनेम' },
  password: { en: 'Password', hi: 'पासवर्ड' },
  login: { en: 'Login', hi: 'लॉगिन' },
  backToSite: { en: '← Back to website', hi: '← वेबसाइट पर वापस' },
  wrongLogin: { en: 'Wrong username or password', hi: 'यूज़रनेम या पासवर्ड गलत है' },
  accountDisabled: {
    en: 'This account has been disabled — contact the owner',
    hi: 'यह अकाउंट बंद कर दिया गया है — मालिक से बात करें'
  },
  dbNotConnectedShort: {
    en: 'Cannot reach MongoDB — check MONGODB_URI in .env.local',
    hi: 'MongoDB नहीं जुड़ रहा — .env.local में MONGODB_URI जाँचें'
  },
  tooManyIn: {
    en: 'Too many attempts — please try again in',
    hi: 'बहुत बार कोशिश हुई — दोबारा कोशिश करें'
  },
  minute: { en: 'minute', hi: 'मिनट में' },
  minutes: { en: 'minutes', hi: 'मिनट में' },

  setupTitle: { en: 'Create the first admin', hi: 'पहला एडमिन बनाएं' },
  setupIntro: {
    en: 'There is no admin in the database yet. The username and password you set here are saved in MongoDB.',
    hi: 'अभी डेटाबेस में कोई एडमिन नहीं है. यहाँ जो यूज़रनेम–पासवर्ड बनाएंगे, वही MongoDB में सेव होगा.'
  },
  yourName: { en: 'Your name', hi: 'आपका नाम' },
  confirmPassword: { en: 'Confirm password', hi: 'पासवर्ड दोबारा' },
  createAccount: { en: 'Create account', hi: 'अकाउंट बनाएं' },
  usernameHint: { en: 'Lowercase letters, numbers and . _ -', hi: 'छोटे अक्षर, अंक और . _ - चलेंगे' },
  passwordHint: {
    en: 'At least 8 characters, with both letters and numbers',
    hi: 'कम से कम 8 अक्षर, अक्षर + अंक दोनों'
  },
  passwordsDontMatch: { en: 'The two passwords do not match', hi: 'दोनों पासवर्ड एक जैसे नहीं हैं' },
  invalidUsername: {
    en: 'Username must be 3–32 characters — only a–z, 0–9, . _ -',
    hi: 'यूज़रनेम 3–32 अक्षर का हो, सिर्फ a–z 0–9 . _ -'
  },
  passwordTooShort: {
    en: 'Password must be at least 8 characters',
    hi: 'पासवर्ड कम से कम 8 अक्षर का रखें'
  },
  passwordTooLong: { en: 'Password is too long', hi: 'पासवर्ड बहुत लंबा है' },
  passwordTooSimple: {
    en: 'Password must contain both letters and numbers',
    hi: 'पासवर्ड में अक्षर और अंक दोनों होने चाहिए'
  },
  usernameTaken: { en: 'That username is already taken', hi: 'यह यूज़रनेम पहले से है' },
  setupDone: { en: 'An admin already exists — please refresh the page', hi: 'एडमिन पहले से बना हुआ है — पेज रिफ़्रेश करें' },
  showPassword: { en: 'Show password', hi: 'पासवर्ड दिखाएं' },
  hidePassword: { en: 'Hide password', hi: 'पासवर्ड छिपाएं' },

  /* ---------------- Dashboard ---------------- */
  dashSubtitle: { en: 'Everything about your website in one place', hi: 'आपकी वेबसाइट का पूरा हाल एक जगह' },
  cardNewOrders: { en: 'New orders', hi: 'नए ऑर्डर' },
  cardNewMessages: { en: 'New messages', hi: 'नए संदेश' },
  cardProducts: { en: 'Live products', hi: 'सामान' },
  cardGallery: { en: 'Gallery photos', hi: 'गैलरी फोटो' },
  recentOrders: { en: 'Recent orders', hi: 'हाल के ऑर्डर' },
  noOrdersYet: { en: 'No orders yet', hi: 'अभी कोई ऑर्डर नहीं आया' },
  itemsCount: { en: 'items', hi: 'चीज़ें' },

  /* ---------------- Order statuses ---------------- */
  statusNew: { en: 'New', hi: 'नया' },
  statusContacted: { en: 'Contacted', hi: 'बात हुई' },
  statusConfirmed: { en: 'Confirmed', hi: 'पक्का' },
  statusInProduction: { en: 'In production', hi: 'बन रहा है' },
  statusDelivered: { en: 'Delivered', hi: 'दे दिया' },
  statusCancelled: { en: 'Cancelled', hi: 'रद्द' },

  /* ---------------- Orders ---------------- */
  ordersTitle: { en: 'Orders', hi: 'ऑर्डर' },
  ordersSubtitle: {
    en: 'Every order that comes in from the website shows up here',
    hi: 'वेबसाइट से आए सारे ऑर्डर यहाँ दिखते हैं'
  },
  noOrdersFound: { en: 'No orders found', hi: 'कोई ऑर्डर नहीं मिला' },
  askForPrice: { en: 'to be quoted', hi: 'पूछना है' },
  items: { en: 'Items', hi: 'सामान' },
  customer: { en: 'Customer', hi: 'ग्राहक' },
  wantsHomeVisit: { en: 'Wants measurement at home', hi: 'घर पर नाप चाहिए' },
  customerNote: { en: "Customer's message", hi: 'ग्राहक का संदेश' },
  priceOnRequest: { en: 'Price on request', hi: 'दाम पूछें' },
  deleteOrderQ: { en: 'Delete this order?', hi: 'यह ऑर्डर हटाना है?' },

  /* ---------------- Products ---------------- */
  productsTitle: { en: 'Products', hi: 'सामान' },
  productsCount: { en: 'items live on the website', hi: 'चीज़ें वेबसाइट पर हैं' },
  addProduct: { en: 'Add product', hi: 'नया सामान जोड़ें' },
  editProduct: { en: 'Edit product', hi: 'सामान बदलें' },
  searchByName: { en: 'Search by name…', hi: 'नाम से खोजें…' },
  allRooms: { en: 'All categories', hi: 'सभी कमरे' },
  noProductsFound: { en: 'No products found', hi: 'कोई सामान नहीं मिला' },
  singleItem: { en: 'Single item', hi: 'अकेली चीज़' },
  fullSet: { en: 'Full set', hi: 'पूरा सेट' },
  home: { en: 'Home', hi: 'होम' },
  showOnHome: { en: 'Show on home page', hi: 'होम पेज पर दिखाएं' },
  liveOnSite: { en: 'Live on website', hi: 'वेबसाइट पर चालू' },
  deleteProductQ: { en: 'Delete this product?', hi: 'यह सामान हटाना है?' },

  /* ---------------- Product form ---------------- */
  nameHi: { en: 'Name (Hindi)', hi: 'नाम (हिंदी)' },
  nameEn: { en: 'Name (English)', hi: 'नाम (English)' },
  category: { en: 'Category', hi: 'कमरा' },
  type: { en: 'Type', hi: 'प्रकार' },
  descriptionHi: { en: 'Description (Hindi)', hi: 'जानकारी (हिंदी)' },
  descriptionEn: { en: 'Description (English)', hi: 'जानकारी (English)' },
  price: { en: 'Price', hi: 'दाम' },
  priceKind: { en: 'Price type', hi: 'दाम कैसा है' },
  unit: { en: 'Unit', hi: 'इकाई' },
  deliveryDays: { en: 'Ready in (days)', hi: 'कितने दिन में तैयार' },
  materialHi: { en: 'Wood / material (Hindi)', hi: 'लकड़ी / सामग्री (हिंदी)' },
  materialEn: { en: 'Wood / material (English)', hi: 'लकड़ी / सामग्री (English)' },
  size: { en: 'Size', hi: 'नाप' },
  slugHint: { en: '(leave empty and it fills itself)', hi: '(खाली छोड़ें तो अपने आप बन जाएगा)' },
  setIncludes: { en: 'What the set includes', hi: 'सेट में क्या-क्या आता है' },
  addLine: { en: 'Add line', hi: 'लाइन जोड़ें' },
  sortOrder: { en: 'Order', hi: 'क्रम' },
  unitPiece: { en: 'piece', hi: 'नग' },
  unitSet: { en: 'set', hi: 'सेट' },
  unitSqft: { en: 'sq.ft', hi: 'वर्ग फुट' },
  unitRunningFt: { en: 'running ft', hi: 'रनिंग फुट' },
  priceFixed: { en: 'Fixed price', hi: 'पक्का दाम' },
  priceFrom: { en: 'Starting from', hi: 'शुरू ... से' },
  priceQuote: { en: 'On request', hi: 'दाम पूछें' },
  slugExists: { en: 'That slug is already taken — use a different name/slug', hi: 'यह slug पहले से है — दूसरा नाम/slug रखें' },
  nameRequired: { en: 'Name is required', hi: 'नाम ज़रूरी है' },
  invalidCategory: { en: 'Please choose a category', hi: 'कमरा (category) चुनें' },

  /* ---------------- Gallery ---------------- */
  galleryTitle: { en: 'Gallery / our work', hi: 'गैलरी / हमारा काम' },
  photosCount: { en: 'photos live on the website', hi: 'फोटो वेबसाइट पर हैं' },
  addWork: { en: 'Add work', hi: 'नया काम जोड़ें' },
  editWork: { en: 'Edit work', hi: 'काम बदलें' },
  noPhotosYet: { en: 'No photos yet — press “Add work”', hi: 'अभी कोई फोटो नहीं — “नया काम जोड़ें” दबाएं' },
  workNameHi: { en: 'Work name (Hindi)', hi: 'काम का नाम (हिंदी)' },
  workNameEn: { en: 'Work name (English)', hi: 'काम का नाम (English)' },
  placeHi: { en: 'Place (Hindi)', hi: 'जगह (हिंदी)' },
  placeEn: { en: 'Place (English)', hi: 'जगह (English)' },
  year: { en: 'Year', hi: 'साल' },
  workPhoto: { en: 'Photo of the work', hi: 'काम की फोटो' },
  deletePhotoQ: { en: 'Delete this photo?', hi: 'यह फोटो हटानी है?' },
  titleRequired: { en: 'Name is required', hi: 'नाम ज़रूरी है' },

  /* ---------------- Testimonials ---------------- */
  testimonialsTitle: { en: 'Customer reviews', hi: 'ग्राहकों की राय' },
  testimonialsSubtitle: {
    en: 'Shown on the home page under “What customers say”',
    hi: 'होम पेज पर “ग्राहक क्या कहते हैं” में दिखती है'
  },
  addReview: { en: 'Add review', hi: 'नई राय जोड़ें' },
  editReview: { en: 'Edit review', hi: 'राय बदलें' },
  noReviewsYet: {
    en: 'No reviews yet — the home page is showing 3 sample reviews until you add one',
    hi: 'अभी कोई राय नहीं — जब तक आप नहीं जोड़ते, होम पेज पर 3 नमूना राय दिख रही हैं'
  },
  customerName: { en: 'Customer name', hi: 'ग्राहक का नाम' },
  reviewHi: { en: 'Review (Hindi)', hi: 'राय (हिंदी)' },
  reviewEn: { en: 'Review (English)', hi: 'राय (English)' },
  stars: { en: 'Stars', hi: 'स्टार' },
  deleteReviewQ: { en: 'Delete this review?', hi: 'यह राय हटानी है?' },
  reviewRequired: { en: 'Write the review in Hindi or English', hi: 'राय हिंदी या English में लिखें' },
  homeShowsSix: {
    en: 'The home page shows the first 6 reviews that are live.',
    hi: 'होम पेज पर पहली 6 चालू राय दिखती हैं।'
  },

  /* ---------------- Image uploader ---------------- */
  photos: { en: 'Photos', hi: 'फोटो' },
  addPhoto: { en: 'Add photo', hi: 'फोटो जोड़ें' },
  mainPhoto: { en: 'Main photo', hi: 'मुख्य फोटो' },
  photoTooBig: { en: 'photos bigger than 10MB will not work', hi: '10MB से बड़ी फोटो नहीं चलेगी' },
  cloudinaryMissing: {
    en: 'Cloudinary is not set up — add the CLOUDINARY_* values to .env.local',
    hi: 'Cloudinary सेट नहीं है — .env.local में CLOUDINARY_* values डालें'
  },
  uploadSignatureFailed: { en: 'Could not get an upload signature', hi: 'Upload signature नहीं मिला' },
  uploadFailed: { en: 'Cloudinary upload failed', hi: 'Cloudinary upload फेल हुआ' },

  /* ---------------- Messages ---------------- */
  messagesTitle: { en: 'Messages', hi: 'संदेश' },
  messagesSubtitle: { en: 'Every message from the contact form', hi: 'Contact फॉर्म से आए सारे संदेश' },
  noMessagesYet: { en: 'No messages yet', hi: 'अभी कोई संदेश नहीं आया' },
  msgNew: { en: 'New', hi: 'नया' },
  msgRead: { en: 'Read', hi: 'पढ़ लिया' },
  msgReplied: { en: 'Replied', hi: 'जवाब दिया' },
  markRead: { en: 'Mark as read', hi: 'पढ़ लिया' },
  markReplied: { en: 'Mark as replied', hi: 'जवाब दे दिया' },
  deleteMessageQ: { en: 'Delete this message?', hi: 'यह संदेश हटाना है?' },

  /* ---------------- Users ---------------- */
  usersTitle: { en: 'Users', hi: 'यूज़र' },
  usersSubtitle: {
    en: 'Who can log in to the admin panel — all stored in MongoDB',
    hi: 'एडमिन पैनल में कौन-कौन लॉगिन कर सकता है — सब MongoDB में सेव है'
  },
  addUser: { en: 'Add a new user', hi: 'नया यूज़र जोड़ें' },
  createUser: { en: 'Create user', hi: 'यूज़र बनाएं' },
  name: { en: 'Name', hi: 'नाम' },
  role: { en: 'Role', hi: 'भूमिका' },
  changePassword: { en: 'Change password', hi: 'पासवर्ड बदलें' },
  newPassword: { en: 'New password', hi: 'नया पासवर्ड' },
  disable: { en: 'Disable', hi: 'बंद करें' },
  enable: { en: 'Enable', hi: 'चालू करें' },
  makeStaff: { en: 'Make staff', hi: 'स्टाफ बनाएं' },
  makeOwner: { en: 'Make owner', hi: 'मालिक बनाएं' },
  lastLogin: { en: 'Last login', hi: 'आख़िरी लॉगिन' },
  neverLoggedIn: { en: 'Never logged in', hi: 'अभी तक लॉगिन नहीं किया' },
  deleteUserQ: { en: 'Delete this user?', hi: 'इस यूज़र को हटाना है?' },
  passwordChangedFor: { en: 'Password changed', hi: 'पासवर्ड बदल दिया गया' },
  lastOwner: {
    en: 'This is the last owner — it cannot be removed or changed',
    hi: 'यह आख़िरी owner है — इसे हटाया/बदला नहीं जा सकता'
  },
  cannotDeleteSelf: { en: 'You cannot delete your own account', hi: 'अपना ही अकाउंट नहीं हटा सकते' },
  ownerOnly: { en: 'Only an owner can manage users', hi: 'सिर्फ owner ही यूज़र सँभाल सकता है' },

  /* ---------------- My account ---------------- */
  myAccount: { en: 'My account', hi: 'मेरा अकाउंट' },
  currentPassword: { en: 'Current password', hi: 'पुराना पासवर्ड' },
  newPasswordAgain: { en: 'New password again', hi: 'नया पासवर्ड दोबारा' },
  savedTick: { en: 'Saved ✓', hi: 'सेव हो गया ✓' },
  notSaved: { en: 'Could not save', hi: 'सेव नहीं हो पाया' },
  wrongCurrentPassword: { en: 'Current password is wrong', hi: 'पुराना पासवर्ड गलत है' },
  passwordChangedNote: {
    en: 'Password changed ✓ Other devices have been logged out',
    hi: 'पासवर्ड बदल दिया गया ✓ बाकी डिवाइस अपने आप लॉगआउट हो गए'
  },

  /* ---------------- DB notice ---------------- */
  dbNotConnectedTitle: { en: 'MongoDB is not connected yet', hi: 'MongoDB अभी जुड़ा नहीं है' },
  dbNotConnectedIntro: {
    en: 'The admin panel stores its data in the database. To get it running:',
    hi: 'Admin panel का डेटा database में सेव होता है. चालू करने के लिए:'
  },
  dbStep1: {
    en: 'Create a free account at mongodb.com/atlas and make a cluster',
    hi: 'mongodb.com/atlas पर free account बनाएं और एक cluster बनाएं'
  },
  dbStep2: { en: 'Copy the connection string from Connect → Drivers', hi: 'Connect → Drivers से connection string copy करें' },
  dbStep3: {
    en: 'Paste it into MONGODB_URI in the project’s .env.local file',
    hi: 'प्रोजेक्ट की .env.local फाइल में MONGODB_URI में paste करें'
  },
  dbStep4: { en: 'Run npm run seed in the terminal', hi: 'टर्मिनल में npm run seed चलाएं' }
};
