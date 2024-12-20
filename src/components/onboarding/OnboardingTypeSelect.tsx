import React from 'react';
import { OnboardType } from '../../types/onboarding';
import FormField from '../form/FormField';

interface OnboardingTypeSelectProps {
  value: OnboardType | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  mode?: 'producer' | 'consumer' | 'all';
}

const OnboardingTypeSelect: React.FC<OnboardingTypeSelectProps> = ({
  value,
  onChange,
  error,
  mode = 'all'
}) => {
  const getOptions = () => {
    switch (mode) {
      case 'producer':
        return [{ value: 'ECS_FARGATE_PRODUCER', label: 'ECS FARGATE PRODUCER' }];
      case 'consumer':
        return [
          { value: 'ECS_FARGATE_CONSUMER', label: 'ECS FARGATE CONSUMER' },
          { value: 'S3_SINK_CONNECTOR', label: 'S3 SINK CONNECTOR' },
          { value: 'EB_SINK_CONNECTOR', label: 'EB SINK CONNECTOR' },
          { value: 'EB_LAMBDA_PATTERN', label: 'EB LAMBDA PATTERN' }
        ];
      default:
        return [
          { value: 'ECS_FARGATE_PRODUCER', label: 'ECS FARGATE PRODUCER' },
          { value: 'ECS_FARGATE_CONSUMER', label: 'ECS FARGATE CONSUMER' },
          { value: 'S3_SINK_CONNECTOR', label: 'S3 SINK CONNECTOR' },
          { value: 'EB_SINK_CONNECTOR', label: 'EB SINK CONNECTOR' },
          { value: 'EB_LAMBDA_PATTERN', label: 'EB LAMBDA PATTERN' }
        ];
    }
  };

  return (
    <FormField label="Onboard Type">
      <select
        name="onboardType"
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm 
          bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
          sm:text-sm transition duration-150 ease-in-out
          ${error ? 'border-red-300' : 'border-gray-300'}`}
        required
      >
        <option value="">Select Type</option>
        {getOptions().map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </FormField>
  );
};

export default OnboardingTypeSelect;