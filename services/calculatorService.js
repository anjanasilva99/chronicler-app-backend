function calculateTotalDistance(list1, list2) {
    const sortedList1 = [...list1].sort((a, b) => a - b);
    const sortedList2 = [...list2].sort((a, b) => a - b);
    
    if (sortedList1.length !== sortedList2.length) {
        throw new Error("Lists must be of equal length");
    }
    
    let totalDistance = 0;
    for (let i = 0; i < sortedList1.length; i++) {
        const distance = Math.abs(sortedList1[i] - sortedList2[i]);
        totalDistance += distance;
    }
    
    return totalDistance;
}

function processResults(list1, list2) {
    const sortedList1 = [...list1].sort((a, b) => a - b);
    const sortedList2 = [...list2].sort((a, b) => a - b);
    
    const distances = sortedList1.map((val, idx) => Math.abs(val - sortedList2[idx]));
    const totalDistance = calculateTotalDistance(list1, list2);
    
    return {
        originalList1: list1,
        originalList2: list2,
        sortedList1,
        sortedList2,
        distances,
        totalDistance,
        count: list1.length,
        averageDistance: (totalDistance / list1.length).toFixed(2),
        maxDistance: Math.max(...distances)
    };
}

export { calculateTotalDistance, processResults };