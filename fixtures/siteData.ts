/** Typed test data for functional and regression tests — zarkparking.com */

export const validContactSalesFormData = {
  firstName: 'Jane',
  lastName: 'Tester',
  email: 'jane.tester@propertyco.com',
  phone: '6025551234',
  company: 'Property Co LLC',
  communityName: 'Sunset Ridge Apartments',
  numberOfUnits: '120',
  message: 'We are interested in adding flexible parking to our community.',
  address: '123 Main St, Scottsdale, AZ 85251',
};

export const validResidentSupportFormData = {
  email: 'resident@example.com',
  communityName: 'Sunset Ridge Apartments',
  subject: 'Unable to reserve a parking spot',
  message: 'I am having trouble reserving a spot through the app.',
};

export const expectedNavLinks = [
  { text: 'Zark Parking', href: /short-term-parking/ },
  { text: 'Rentable Items', href: /rentable-items/ },
  { text: 'Parking Enforcement', href: /parking-enforcement/ },
  { text: 'Resident Guide', href: /resident-guide/ },
  { text: 'Contact sales', href: /contact-sales/ },
];

export const expectedFooterLinks = [
  { text: 'Zark Parking', href: /short-term-parking/ },
  { text: 'Rentable Items', href: /rentable-items/ },
  { text: 'Parking Enforcement', href: /parking-enforcement/ },
  { text: 'PMS Integrations', href: /pms-integrations/ },
  { text: 'Case Studies', href: /blog/ },
  { text: 'Resident Guide', href: /resident-guide/ },
  { text: 'Contact Sales', href: /contact-us/ },
  { text: 'Terms and Conditions', href: /terms-and-conditions/ },
  { text: 'Privacy Policy', href: /privacy-policy/ },
];

export const allPages = [
  { name: 'Homepage', path: '/', expectedTitle: 'Zark - Flexible Multifamily Parking' },
  { name: 'Zark Parking', path: '/short-term-parking', expectedTitle: 'Zark Parking' },
  { name: 'Rentable Items', path: '/rentable-items', expectedTitle: 'Rentable Items' },
  { name: 'Parking Enforcement', path: '/parking-enforcement', expectedTitle: 'Parking Enforcement' },
  { name: 'Resident Guide', path: '/resident-guide', expectedTitle: 'Getting Started as a Resident' },
  { name: 'Contact Sales', path: '/contact-sales', expectedTitle: "Let's Get Zarking!" },
  { name: 'PMS Integrations', path: '/pms-integrations', expectedTitle: 'PMS Integrations' },
  { name: 'Terms and Conditions', path: '/terms-and-conditions', expectedTitle: 'Terms and Conditions' },
  { name: 'Privacy Policy', path: '/privacy-policy', expectedTitle: 'Privacy Policy' },
];

