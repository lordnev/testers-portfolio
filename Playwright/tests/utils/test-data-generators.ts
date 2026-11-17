import { faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  zipCode: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface ProductData {
  name: string;
  price: string;
  description?: string;
}

export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  vacancy?: string;
  resume?: string;
  keywords?: string;
}

// Test users for Swag Labs
export const SWAG_LABS_USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce', expectsSuccess: true, description: 'Standard user' },
  locked: { username: 'locked_out_user', password: 'secret_sauce', expectsSuccess: false, description: 'Locked out user' },
  problem: { username: 'problem_user', password: 'secret_sauce', expectsSuccess: true, description: 'Problem user' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce', expectsSuccess: true, description: 'Performance glitch user' },
  error: { username: 'error_user', password: 'secret_sauce', expectsSuccess: true, description: 'Error user' },
  visual: { username: 'visual_user', password: 'secret_sauce', expectsSuccess: true, description: 'Visual user' },
} as const;

export type SwagLabsUserType = keyof typeof SWAG_LABS_USERS;

// OrangeHRM test users
export const ORANGEHRM_USERS = {
  admin: { username: 'Admin', password: 'admin123', role: 'Admin' },
} as const;

// Generate random test user data
export function generateTestUser(overrides: Partial<UserData> = {}): UserData {
  const locale = overrides.locale || 'en';
  faker.setLocale(locale);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode('#####'),
    email: faker.internet.email(),
    phone: faker.phone.number('555-###-####'),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    country: faker.location.country(),
    ...overrides,
  };
}

// Generate multiple test users
export function generateTestUsers(count: number, overrides: Partial<UserData> = {}): UserData[] {
  return Array.from({ length: count }, () => generateTestUser(overrides));
}

// Generate product data
export function generateProductData(overrides: Partial<ProductData> = {}): ProductData {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 500, dec: 2 }),
    description: faker.commerce.productDescription(),
    ...overrides,
  };
}

// Swag Labs specific products
export const SWAG_LABS_PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  tShirt: 'Sauce Labs Bolt T-Shirt',
  jacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  tShirtRed: 'Test.allTheThings() T-Shirt (Red)',
} as const;

// Generate employee data for OrangeHRM
export function generateEmployeeData(overrides: Partial<EmployeeData> = {}): EmployeeData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    middleName: faker.person.middleName(),
    lastName,
    employeeId: faker.string.numeric(5),
    username: faker.internet.username({ firstName, lastName }).toLowerCase(),
    password: 'Password123!',
    confirmPassword: 'Password123!',
    ...overrides,
  };
}

// Generate candidate data for OrangeHRM Recruitment
export function generateCandidateData(overrides: Partial<CandidateData> = {}): CandidateData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    vacancy: 'QA Automation Engineer',
    keywords: 'Playwright, TypeScript, Automation',
    ...overrides,
  };
}

// Generate job vacancy data
export function generateJobVacancyData(overrides: { title?: string; description?: string } = {}) {
  return {
    title: overrides.title || `QA ${faker.person.jobTitle()}`,
    description: overrides.description || faker.lorem.paragraphs(2),
    hiringManager: 'Admin',
    position: Math.floor(Math.random() * 5) + 1,
  };
}

// Generate leave request data
export function generateLeaveData(overrides: { leaveType?: string; fromDate?: string; toDate?: string } = {}) {
  const fromDate = overrides.fromDate || faker.date.future({ years: 1 }).toISOString().split('T')[0];
  const toDate = overrides.toDate || faker.date.future({ years: 1, refDate: new Date(fromDate) }).toISOString().split('T')[0];

  return {
    leaveType: overrides.leaveType || 'Sick Leave',
    fromDate,
    toDate,
    comment: faker.lorem.sentence(),
  };
}

// DemoQA specific data
export const DEMOQA_TEST_DATA = {
  validUser: {
    firstName: 'Bartłomiej',
    lastName: 'Tester',
    email: 'bartlomiej@example.com',
    gender: 'Male',
    phoneNumber: '1234567890',
    dateOfBirth: '15 January 1990',
    subjects: ['Maths', 'Computer Science'],
    hobbies: ['Sports', 'Reading', 'Music'],
    address: '123 Test Street, Test City',
    state: 'NCR',
    city: 'Delhi',
    filePath: 'sample-upload.pdf',
  },
  invalidEmail: 'invalid-email',
  validEmail: 'valid@example.com',
};

// Wikipedia test data
export const WIKIPEDIA_TEST_DATA = {
  searchTerms: {
    valid: ['OpenAI', 'Playwright', 'TypeScript', 'JavaScript', 'Python', 'Tesla', 'Earth'],
    invalid: ['ThisIsSomeRandomText123456789', 'asdfghjkl123', 'xyzzyx987'],
    special: ['C++', 'C#', '.NET', 'Node.js'],
  },
  articles: {
    openai: 'OpenAI',
    playwright: 'Playwright',
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    tesla: 'Tesla, Inc.',
    earth: 'Earth',
  },
};

// API test data
export const API_TEST_DATA = {
  jsonPlaceholder: {
    post: {
      title: 'Test Post Title',
      body: 'Test post body content',
      userId: 1,
    },
    updatedPost: {
      title: 'Updated Test Post Title',
      body: 'Updated test post body content',
      userId: 1,
    },
  },
  reqres: {
    user: {
      name: 'morpheus',
      job: 'leader',
    },
    updatedUser: {
      name: 'morpheus',
      job: 'zion resident',
    },
    register: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
    login: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
  },
};

// Helper to get random item from array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper to generate random string
export function generateRandomString(length: number = 10): string {
  return faker.string.alphanumeric(length);
}

// Helper to generate random number in range
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Current date helpers
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function getTomorrowISO(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function getFutureDateISO(days: number = 7): string {
  const future = new Date();
  future.setDate(future.getDate() + days);
  return future.toISOString().split('T')[0];
}

export function getPastDateISO(days: number = 7): string {
  const past = new Date();
  past.setDate(past.getDate() - days);
  return past.toISOString().split('T')[0];
}