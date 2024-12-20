import React, { useState } from 'react';
import { DomainNode as DomainNodeType } from '../../types/domain';
import DomainNode from './DomainNode';

interface DomainTreeProps {
  domains: DomainNodeType[];
}

const DomainTree: React.FC<DomainTreeProps> = ({ domains }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderNode = (node: DomainNodeType, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id}>
        <DomainNode
          node={node}
          level={level}
          expanded={isExpanded}
          onToggle={() => toggleNode(node.id)}
        />
        {isExpanded && node.subDomains.length > 0 && (
          <div className="ml-4">
            {node.subDomains.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {domains.map(domain => renderNode(domain))}
    </div>
  );
};

export default DomainTree;