import { Roadmap } from "@/domain/entities";
import { mockRoadmap } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

export async function fetchRoadmap(): Promise<Roadmap> {
  return withLatency(mockRoadmap, 400);
}
