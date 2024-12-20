export interface DomainNode {
  id: string;
  name: string;
  subDomains: DomainNode[];
}

export interface DomainTree {
  domains: DomainNode[];
}