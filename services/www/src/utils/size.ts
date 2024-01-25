export function near(candidats: number[], targetSize: number) {
  if(candidats.length === 0) throw new RangeError('');

  const sorted = [ ...candidats ].sort((a, b) => a - b);
  let result = sorted[sorted.length - 1];

  for(const c of sorted) {
    if(c > targetSize) {
      result = c;
      continue;
    }
    break;
  }

  return result;
}
