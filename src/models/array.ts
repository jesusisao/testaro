export function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((item) => item[key]);
}

export function extractDuplicateItem<T>(data: Array<T>): Array<T> {
  const seen = new Set<T>();
  const duplicates = new Set<T>();
  for (const name of data) {
    if (seen.has(name)) {
      duplicates.add(name);
    }
    seen.add(name);
  }
  return [...duplicates];
}
