import React from 'react';
import { OnboardingData } from '../../types/onboarding';
import TableHeader from '../table/TableHeader';
import { ExpandableTableRow } from '../table/ExpandableTableRow';

interface ConsumerTableProps {
  consumers: OnboardingData[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ConsumerTable: React.FC<ConsumerTableProps> = ({ consumers, onDelete, onEdit }) => {
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
            {consumers.map((consumer) => (
              <ExpandableTableRow
                key={consumer.id}
                data={consumer}
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