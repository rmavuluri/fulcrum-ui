import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OnboardingData, OnboardType, PRODUCER_TYPES } from '../types/onboarding';
import { saveOnboardingData, getOnboardingById } from '../utils/onboardingService';
import { useTopicName } from '../hooks/useTopicName';
import FormLayout from './form/FormLayout';
import FormSection from './form/FormSection';
import FormField from './form/FormField';
import TextInput from './form/TextInput';
import TextArea from './form/TextArea';

const OnboardingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({});
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    lobName: '',
    onboardType: undefined,
    domain: '',
    subDomain: '',
    volumeOfEvents: '',
    schemaName: '',
    topicName: '',
    tentativeProdDate: '',
    canPerformPT: false,
    allEnvARNs: '',
    notificationEmail: '',
    contactEmails: '',
  });

  const generatedTopicName = useTopicName(formData.domain || '', formData.subDomain || '');

  useEffect(() => {
    if (id) {
      const entry = getOnboardingById(id);
      if (entry) {
        setFormData(entry);
      }
    }
  }, [id]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      topicName: generatedTopicName
    }));
  }, [generatedTopicName]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OnboardingData, string>> = {};
    
    if (!formData.lobName?.trim()) {
      newErrors.lobName = 'LOB Name is required';
    }
    
    if (!formData.onboardType) {
      newErrors.onboardType = 'Onboard Type is required';
    }
    
    if (!formData.domain?.trim()) {
      newErrors.domain = 'Domain is required';
    }
    
    if (!formData.topicName?.trim()) {
      newErrors.topicName = 'Topic Name is required';
    }

    if (!formData.notificationEmail?.trim()) {
      newErrors.notificationEmail = 'Notification Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.notificationEmail)) {
      newErrors.notificationEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = saveOnboardingData({
      ...formData,
      id: id || Date.now().toString(),
      createdAt: id ? formData.createdAt! : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as OnboardingData);

    if (success) {
      const isProducer = PRODUCER_TYPES.includes(formData.onboardType as OnboardType);
      navigate(isProducer ? '/producers' : '/consumers');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    if (errors[name as keyof OnboardingData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const formActions = (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {id ? 'Update' : 'Submit'}
      </button>
    </>
  );

  return (
    <FormLayout 
      title={id ? 'Edit Onboarding' : 'New Onboarding'} 
      onSubmit={handleSubmit}
      actions={formActions}
    >
      <FormSection title="Basic Information">
        <FormField label="LOB Name">
          <TextInput
            name="lobName"
            value={formData.lobName}
            onChange={handleInputChange}
            error={errors.lobName}
            required
          />
        </FormField>

        <FormField label="Onboard Type">
          <select
            name="onboardType"
            value={formData.onboardType}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm
              ${errors.onboardType ? 'border-red-300' : 'border-gray-300'}`}
            required
          >
            <option value="">Select Type</option>
            <option value="ECS_FARGATE_PRODUCER">ECS FARGATE PRODUCER</option>
            <option value="ECS_FARGATE_CONSUMER">ECS FARGATE CONSUMER</option>
            <option value="S3_SINK_CONNECTOR">S3 SINK CONNECTOR</option>
            <option value="EB_SINK_CONNECTOR">EB SINK CONNECTOR</option>
            <option value="EB_LAMBDA_PATTERN">EB LAMBDA PATTERN</option>
          </select>
          {errors.onboardType && (
            <p className="mt-1 text-sm text-red-600">{errors.onboardType}</p>
          )}
        </FormField>
      </FormSection>

      <FormSection title="Domain Information">
        <FormField label="Domain">
          <TextInput
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
            error={errors.domain}
            required
          />
        </FormField>

        <FormField label="Sub-Domain">
          <TextInput
            name="subDomain"
            value={formData.subDomain}
            onChange={handleInputChange}
            error={errors.subDomain}
          />
        </FormField>

        <FormField label="Topic Name">
          <TextInput
            name="topicName"
            value={formData.topicName}
            error={errors.topicName}
            readOnly
            className="bg-gray-50"
            required
          />
        </FormField>

        <FormField label="Schema Name">
          <TextInput
            name="schemaName"
            value={formData.schemaName}
            onChange={handleInputChange}
            error={errors.schemaName}
          />
        </FormField>
      </FormSection>

      <FormSection title="Additional Details">
        <FormField label="Volume of Events">
          <TextInput
            name="volumeOfEvents"
            value={formData.volumeOfEvents}
            onChange={handleInputChange}
            error={errors.volumeOfEvents}
          />
        </FormField>

        <FormField label="Tentative PROD Date">
          <TextInput
            type="date"
            name="tentativeProdDate"
            value={formData.tentativeProdDate}
            onChange={handleInputChange}
            error={errors.tentativeProdDate}
          />
        </FormField>

        <div className="col-span-2">
          <FormField label="All Env ARNs">
            <TextArea
              name="allEnvARNs"
              value={formData.allEnvARNs}
              onChange={handleInputChange}
              error={errors.allEnvARNs}
              placeholder="Enter ARNs for all environments"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Contact Information">
        <FormField label="Notification Email">
          <TextInput
            type="email"
            name="notificationEmail"
            value={formData.notificationEmail}
            onChange={handleInputChange}
            error={errors.notificationEmail}
            required
          />
        </FormField>

        <FormField label="Contact Emails">
          <TextInput
            type="text"
            name="contactEmails"
            value={formData.contactEmails}
            onChange={handleInputChange}
            error={errors.contactEmails}
            placeholder="Comma-separated email addresses"
          />
        </FormField>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="canPerformPT"
              checked={formData.canPerformPT}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Able to perform PT?</span>
          </label>
        </div>
      </FormSection>
    </FormLayout>
  );
};

export default OnboardingForm;