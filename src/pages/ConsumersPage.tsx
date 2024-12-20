import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEntries, deleteOnboardingEntry } from '../utils/onboardingService';
import { ConsumerTable } from '../components/consumer/ConsumerTable';

const ConsumersPage: React.FC = () => {
  const navigate = useNavigate();
  const consumers = getAllEntries('consumer');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this consumer?')) {
      deleteOnboardingEntry(id);
      navigate('/consumers');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Consumers</h1>
        <button
          onClick={() => navigate('/consumers/new')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add Consumer
        </button>
      </div>

      <ConsumerTable 
        consumers={consumers} 
        onDelete={handleDelete} 
        onEdit={(id) => navigate(`/onboard/${id}`)} 
      />
    </div>
  );
};

export default ConsumersPage;