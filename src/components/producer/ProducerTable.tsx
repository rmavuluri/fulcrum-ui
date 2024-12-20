import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import TableHeader from '../table/TableHeader';
import { ExpandableTableRow } from '../table/ExpandableTableRow';

interface ProducerTableProps {
  producers: OnboardingData[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ProducerTable: React.FC<ProducerTableProps> = ({ producers, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={[
              'LOB Name',
              'Domain',
              'Sub-Domain',
              'Topic Name',
              'Schema Name',
              'PROD Date',
              'PT Ready',
              'Actions'
            ]}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {producers.map((producer) => (
              <ExpandableTableRow
                key={producer.id}
                data={producer}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};