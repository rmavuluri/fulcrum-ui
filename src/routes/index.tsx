import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import OnboardingForm from '../components/onboarding/OnboardingForm';
import DomainManagement from '../pages/DomainManagement';
import ProducersPage from '../pages/ProducersPage';
import ConsumersPage from '../pages/ConsumersPage';

export const AppRoutes = (
  <>
    <Route index element={<Dashboard />} />
    <Route path="onboard" element={<OnboardingForm />} />
    <Route path="onboard/:id" element={<OnboardingForm />} />
    <Route path="producers/new" element={<OnboardingForm />} />
    <Route path="consumers/new" element={<OnboardingForm />} />
    <Route path="domain" element={<DomainManagement />} />
    <Route path="producers" element={<ProducersPage />} />
    <Route path="consumers" element={<ConsumersPage />} />
  </>
);