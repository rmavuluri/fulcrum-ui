import { DomainNode, DomainTree } from '../types/domain';

const DOMAIN_STORAGE_KEY = 'domainTree';

export const getDomainTree = (): DomainTree => {
  try {
    const data = localStorage.getItem(DOMAIN_STORAGE_KEY);
    return data ? JSON.parse(data) : { domains: [] };
  } catch (error) {
    console.error('Error getting domain tree:', error);
    return { domains: [] };
  }
};

export const saveDomainTree = (tree: DomainTree): boolean => {
  try {
    localStorage.setItem(DOMAIN_STORAGE_KEY, JSON.stringify(tree));
    return true;
  } catch (error) {
    console.error('Error saving domain tree:', error);
    return false;
  }
};

export const addDomainWithSubdomain = (domain: string, subdomain: string): boolean => {
  try {
    const tree = getDomainTree();
    let domainNode = tree.domains.find(d => d.name === domain);

    if (!domainNode) {
      domainNode = {
        id: Date.now().toString(),
        name: domain,
        subDomains: []
      };
      tree.domains.push(domainNode);
    }

    if (subdomain && !domainNode.subDomains.find(sd => sd.name === subdomain)) {
      domainNode.subDomains.push({
        id: Date.now().toString(),
        name: subdomain,
        subDomains: []
      });
    }

    return saveDomainTree(tree);
  } catch (error) {
    console.error('Error adding domain with subdomain:', error);
    return false;
  }
};