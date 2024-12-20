import React from 'react';
import { getDomainTree } from '../utils/domainService';
import DomainTree from '../components/domain/DomainTree';

const DomainManagement = () => {
  const { domains } = getDomainTree();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Domain Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {domains.length > 0 ? (
          <DomainTree domains={domains} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No domains available.</p>
            <p className="text-sm mt-2">Domains will appear here when you onboard producers or consumers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainManagement;