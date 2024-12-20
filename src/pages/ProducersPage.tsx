import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEntries, deleteOnboardingEntry } from '../utils/onboardingService';
import { ProducerTable } from '../components/producer/ProducerTable';

const ProducersPage: React.FC = () => {
  const navigate = useNavigate();
  const producers = getAllEntries('producer');

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this producer?')) {
      deleteOnboardingEntry(id);
      navigate('/producers');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Producers</h1>
        <button
          onClick={() => navigate('/producers/new')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add Producer
        </button>
      </div>

      <ProducerTable 
        producers={producers} 
        onDelete={handleDelete} 
        onEdit={(id) => navigate(`/onboard/${id}`)} 
      />
    </div>
  );
};

export default ProducersPage;