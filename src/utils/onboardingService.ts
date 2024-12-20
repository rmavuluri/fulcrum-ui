import { OnboardingData } from '../types';
import { addDomainWithSubdomain } from './domainService';
import { StorageService } from '../services/storageService';

export const saveOnboardingData = (data: OnboardingData): boolean => {
  try {
    const onboardingData = StorageService.getOnboarding();
    const index = onboardingData.entries.findIndex((e: OnboardingData) => e.id === data.id);
    
    if (index >= 0) {
      onboardingData.entries[index] = data;
    } else {
      onboardingData.entries.push(data);
    }
    
    StorageService.setOnboarding(onboardingData);

    // Update domain tree when saving onboarding data
    if (data.domain) {
      addDomainWithSubdomain(data.domain, data.subDomain || '');
    }

    return true;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return false;
  }
};

export const getOnboardingById = (id: string): OnboardingData | null => {
  try {
    const { entries } = StorageService.getOnboarding();
    return entries.find((e: OnboardingData) => e.id === id) || null;
  } catch (error) {
    console.error('Error getting onboarding data:', error);
    return null;
  }
};

export const deleteOnboardingEntry = (id: string): boolean => {
  try {
    const onboardingData = StorageService.getOnboarding();
    onboardingData.entries = onboardingData.entries.filter((e: OnboardingData) => e.id !== id);
    StorageService.setOnboarding(onboardingData);
    return true;
  } catch (error) {
    console.error('Error deleting onboarding entry:', error);
    return false;
  }
};

export const getAllEntries = (type?: 'producer' | 'consumer'): OnboardingData[] => {
  try {
    const { entries } = StorageService.getOnboarding();
    if (!type) return entries || [];

    return (entries || []).filter((e: OnboardingData) => {
      const isProducer = e.onboardType === 'ECS_FARGATE_PRODUCER';
      return type === 'producer' ? isProducer : !isProducer;
    });
  } catch (error) {
    console.error('Error getting entries:', error);
    return [];
  }
};