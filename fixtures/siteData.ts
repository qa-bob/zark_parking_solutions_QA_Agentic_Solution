/** Typed test data for functional and regression tests */

export const validDemoFormData = {
  firstName: 'Jane',
  lastName: 'Tester',
  company: 'QA Corp',
  email: 'jane.tester@qacorp.com',
  howHeard: 'Search Engine',
};

export const validContactFormData = {
  firstName: 'John',
  lastName: 'Tester',
  company: 'QA Corp',
  email: 'john.tester@qacorp.com',
  message: 'I would like to learn more about Hud for my team.',
};

export const invalidEmailData = {
  firstName: 'Bad',
  lastName: 'Email',
  company: 'Test Co',
  email: 'not-an-email',
};

export const missingRequiredData = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
};

export const expectedNavLinks = [
  { text: 'Blog', href: /blog/ },
  { text: 'Docs', href: /docs\.hud\.io/ },
  { text: 'About us', href: /about-us/ },
  { text: 'Book a demo', href: /book-a-demo/ },
  { text: 'Log in', href: /app\.hud\.io/ },
];

export const expectedFooterLinks = [
  { text: 'Terms of service', href: /terms-of-service/ },
  { text: 'Privacy Policy', href: /privacy-policy/ },
  { text: 'About us', href: /about-us/ },
  { text: 'Careers', href: /careers/ },
  { text: 'Glossary', href: /glossary/ },
  { text: 'Q&A', href: /questions/ },
  { text: 'Contact us', href: /contact-us/ },
];

export const allPages = [
  { name: 'Homepage', path: '/', expectedTitle: 'Hud | Runtime Code Sensor for Production-Safe AI Code' },
  { name: 'About Us', path: '/about-us/', expectedTitle: 'About us - Hud' },
  { name: 'Book a Demo', path: '/book-a-demo/', expectedTitle: 'Book a demo - Hud' },
  { name: 'Contact Us', path: '/contact-us/', expectedTitle: 'Contact us - Hud' },
  { name: 'Blog', path: '/blog/', expectedTitle: 'Blog - Hud' },
  { name: 'Careers', path: '/careers/', expectedTitle: 'Careers - Hud' },
  { name: 'Terms of Service', path: '/legal/terms-of-service/', expectedTitle: 'Terms of service - Hud' },
  { name: 'Privacy Policy', path: '/legal/privacy-policy/', expectedTitle: 'Privacy Policy - Hud' },
];
