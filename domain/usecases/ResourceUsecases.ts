import { Resource, ResourceType } from "../entities";

export function sortResourcesByRelevance(resources: Resource[]): Resource[] {
  return [...resources].sort((a, b) => b.matchScore - a.matchScore);
}

export function filterResourcesByType(resources: Resource[], type: ResourceType): Resource[] {
  return resources.filter((r) => r.type === type);
}

export function getTopRecommendedResources(resources: Resource[], limit: number): Resource[] {
  return sortResourcesByRelevance(resources).slice(0, limit);
}
