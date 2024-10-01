export const selectBalancedItems = <T>(items: T[], count: number): T[] => {
  const length = items.length;

  // Handle edge cases
  if (count <= 0 || length === 0) {
    return [];
  }
  if (count >= length) {
    return items;
  }

  const result: T[] = [];
  // Calculate step size based on the number of items to return
  const step = (length - 1) / (count - 1);

  for (let index_ = 0; index_ < count; index_++) {
    const index = Math.round(index_ * step);
    result.push(items[index]);
  }

  return result;
};
