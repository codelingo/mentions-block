export type Coords = { x: number; y: number };

export function distance(a: Coords, b: Coords): number {
  const x = Math.abs(a.x - b.x);
  const y = Math.abs(a.y - b.y);
  return Math.sqrt(x * x + y * y);
}
