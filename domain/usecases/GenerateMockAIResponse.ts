const TOPIC_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["middleware", "next.js", "nextjs"],
    response:
      "To optimize your Next.js Middleware, I'd recommend checking your matcher config first — middleware runs on every request that matches its pattern. " +
      "Try narrowing the scope with `config.matcher` so it only targets routes that actually need an authentication guard, and move heavier logic, like database calls, into route handlers instead. " +
      "That should cut down on the latency of every request significantly.",
  },
  {
    keywords: ["mongodb", "index", "indexing"],
    response:
      "On MongoDB Indexing for the CED One-Stop Service project — I'd recommend creating a compound index on the fields you query most often, like `{ studentId: 1, status: 1 }`. " +
      "Use `explain('executionStats')` to check whether your query is actually using the index or scanning the whole collection. " +
      "If you see a collection scan, try adjusting the query shape to match the index order.",
  },
  {
    keywords: ["docker", "container", "network"],
    response:
      "It's totally normal to find Docker Networks confusing at first. Picture each container as living in its own separate network by default. " +
      "If you want the frontend to talk to the backend, they need to be on the same network — either create one with `docker network create`, " +
      "or just use `docker-compose`, which sets up a default network automatically and lets you call services by their service name.",
  },
  {
    keywords: ["deploy", "devops", "ci/cd", "pipeline"],
    response:
      "For a basic DevOps pipeline, I'd start with GitHub Actions — set up a workflow that builds and tests automatically on every push, then add a deploy step to a server or container registry. " +
      "Once you're comfortable with the basic pipeline, look into keeping a staging environment separate from production for safety.",
  },
  {
    keywords: ["pointer", "allocation", "memory"],
    response:
      "Think of memory as a wall of lockers, each with its own address. A pointer variable is just a slip of paper with a locker number written on it — it isn't the item itself. " +
      "I'd suggest practicing by sketching out the stack and heap alongside real code — it really helps make memory allocation and deallocation click.",
  },
];

const DEFAULT_RESPONSES = [
  "That's a great question! Let me suggest a starting approach — try breaking the problem into smaller steps, and start with the part that affects the core functionality the most.",
  "Based on your current roadmap, I'd recommend tying this back to the CED One-Stop Service project you're working on, so you can practice it hands-on at the same time.",
  "Try reading the official docs on this topic alongside building a small demo — doing both together tends to make the concept click much faster.",
];

export function generateMockAIResponse(query: string): string {
  const normalized = query.toLowerCase();
  const matched = TOPIC_RESPONSES.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  if (matched) return matched.response;

  const hash = normalized.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return DEFAULT_RESPONSES[hash % DEFAULT_RESPONSES.length];
}
