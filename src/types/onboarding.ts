export type OnboardType = 
  | 'ECS_FARGATE_PRODUCER'
  | 'ECS_FARGATE_CONSUMER'
  | 'S3_SINK_CONNECTOR'
  | 'EB_SINK_CONNECTOR'
  | 'EB_LAMBDA_PATTERN';

export interface OnboardingData {
  id: string;
  lobName: string;
  onboardType: OnboardType;
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

export const PRODUCER_TYPES = ['ECS_FARGATE_PRODUCER'];
export const CONSUMER_TYPES = [
  'ECS_FARGATE_CONSUMER',
  'S3_SINK_CONNECTOR',
  'EB_SINK_CONNECTOR',
  'EB_LAMBDA_PATTERN'
];