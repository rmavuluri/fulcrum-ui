import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { DomainNode as DomainNodeType } from '../../types/domain';

interface DomainNodeProps {
  node: DomainNodeType;
  level?: number;
  expanded: boolean;
  onToggle: () => void;
}

const DomainNode: React.FC<DomainNodeProps> = ({
  node,
  level = 0,
  expanded,
  onToggle
}) => {
  const hasChildren = node.subDomains.length > 0;
  const paddingLeft = `${level * 1.5}rem`;

  return (
    <div>
      <div
        className="flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer"
        style={{ paddingLeft }}
        onClick={onToggle}
      >
        {hasChildren && (
          <span className="mr-2">
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </span>
        )}
        <span className="text-sm font-medium text-gray-700">{node.name}</span>
      </div>
    </div>
  );
};

export default DomainNode;