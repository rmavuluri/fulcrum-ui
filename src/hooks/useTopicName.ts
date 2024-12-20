import { useEffect, useState } from 'react';

export const useTopicName = (domain: string, subDomain: string) => {
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    if (domain) {
      setTopicName(
        subDomain ? `${domain}-${subDomain}`.toLowerCase() : domain.toLowerCase()
      );
    } else {
      setTopicName('');
    }
  }, [domain, subDomain]);

  return topicName;
};