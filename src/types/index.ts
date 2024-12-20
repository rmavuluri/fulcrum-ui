export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface OnboardingData {
  id: string;
  lobName: string;
  onboardType: 'producer' | 'consumer';
  domain: string;
  subDomain: string;
  volumeOfEvents: string;
  schemaName: string;
  topicName: string;
  tentativeProdDate: string;
  canPerformPT: boolean;
  allEnvARNs: string;
  notificationEmail: string;
  contactEmails: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  producers: number;
  consumers: number;
  systemUptime: number;
}