export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Vulnerability {
  id: string;
  name: string;
  severity: Severity;
  instances: number;
  description: string;
  owasp: string;
  category: string;
  affectedComponents: string[];
  shortDesc: string;
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: 'sql-injection',
    name: 'SQL Injection',
    severity: 'Critical',
    instances: 3,
    description:
      'An attacker can manipulate database queries by injecting malicious SQL code through unsanitized user input fields, potentially bypassing authentication or exposing entire databases.',
    owasp: 'A03:2021',
    category: 'Injection',
    affectedComponents: ['Login Form', 'Search Bar', 'User Profile API'],
    shortDesc: 'Malicious SQL inserted through user input manipulates your database.',
  },
  {
    id: 'xss',
    name: 'Cross-Site Scripting (XSS)',
    severity: 'High',
    instances: 5,
    description:
      'Attackers inject malicious scripts into web pages viewed by other users. This can lead to session hijacking, credential theft, and malware distribution.',
    owasp: 'A03:2021',
    category: 'Injection',
    affectedComponents: ['Comment Section', 'User Bio Field', 'Search Results'],
    shortDesc: 'Malicious scripts injected into pages run in victims\' browsers.',
  },
  {
    id: 'csrf',
    name: 'Cross-Site Request Forgery (CSRF)',
    severity: 'Medium',
    instances: 2,
    description:
      'A malicious website tricks an authenticated user\'s browser into making unwanted requests to your application, performing actions without the user\'s knowledge or consent.',
    owasp: 'A01:2021',
    category: 'Broken Access Control',
    affectedComponents: ['Transfer Form', 'Account Settings', 'Delete Actions'],
    shortDesc: 'Malicious sites forge requests on behalf of authenticated users.',
  },
  {
    id: 'insecure-auth',
    name: 'Insecure Authentication',
    severity: 'Critical',
    instances: 4,
    description:
      'Weak authentication mechanisms including plain-text passwords, missing rate limiting, no multi-factor authentication, and predictable session tokens allow attackers to compromise user accounts.',
    owasp: 'A07:2021',
    category: 'Identification & Authentication Failures',
    affectedComponents: ['Login Form', 'Password Reset', 'Session Management'],
    shortDesc: 'Weak auth mechanisms allow attackers to bypass login controls.',
  },
  {
    id: 'sensitive-data',
    name: 'Sensitive Data Exposure',
    severity: 'High',
    instances: 6,
    description:
      'Sensitive data such as passwords, credit card numbers, and personal information is transmitted or stored without adequate encryption, making it vulnerable to interception or theft.',
    owasp: 'A02:2021',
    category: 'Cryptographic Failures',
    affectedComponents: ['User API', 'Payment Form', 'Database Storage'],
    shortDesc: 'Sensitive information exposed without proper encryption or masking.',
  },
];

export const severityConfig: Record<Severity, { color: string; hex: string; bg: string; border: string; dot: string }> = {
  Critical: {
    color: 'text-red-400',
    hex: '#f87171',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    dot: 'bg-red-500',
  },
  High: {
    color: 'text-orange-400',
    hex: '#fb923c',
    bg: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.3)',
    dot: 'bg-orange-500',
  },
  Medium: {
    color: 'text-yellow-400',
    hex: '#facc15',
    bg: 'rgba(234,179,8,0.1)',
    border: 'rgba(234,179,8,0.3)',
    dot: 'bg-yellow-500',
  },
  Low: {
    color: 'text-green-400',
    hex: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    border: 'rgba(74,222,128,0.3)',
    dot: 'bg-green-500',
  },
};