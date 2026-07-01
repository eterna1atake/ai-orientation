export function withLatency<T>(data: T, ms: number = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}
