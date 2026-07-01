import { Resource } from "@/domain/entities";
import { mockResources } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchResources(): Promise<Resource[]> {
  return withLatency(mockResources, 350);
}
