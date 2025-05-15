function processResults(list1, list2) {

  const sortedList1 = [...list1].sort((a, b) => a - b);
  const sortedList2 = [...list2].sort((a, b) => a - b);

  // Calculate distances once
  const distances = sortedList1.map((val, idx) =>
    Math.abs(val - sortedList2[idx])
  );

  // Derive all metrics from the distances array
  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0);
  const maxDistance = Math.max(...distances);

  return {
    originalList1: list1,
    originalList2: list2,
    sortedList1,
    sortedList2,
    distances,
    totalDistance,
    count: list1.length,
    averageDistance: (totalDistance / list1.length).toFixed(2),
    maxDistance,
  };
}

export { processResults };