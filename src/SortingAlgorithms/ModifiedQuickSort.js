//Use median-of-three as pivot. For small sub-problem of size ≤ 10, use insertion sort.
//import { insertionSort } from '../SortingAlgorithms/InsertionSort';

export function getModifiedQuickSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    animatedModifiedQuickSort(auxillaryArray, animations);
    auxillaryArray.pop();
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Modified quick sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

const CUTOFF = 10;

export function animatedModifiedQuickSort(a, low = 0, high = a.length) {
    if (low + CUTOFF <= high){
        // Sort low, middle, high
        let middle = Math.floor((low + high) / 2);
        if (a[middle] < a[low])
            swapReferences(a, low, middle);
        if (a[high] < a[low])
            swapReferences(a, low, high);
        if (a[high] < a[middle])
            swapReferences(a, middle, high);

        // Place pivot at position high - 1
        swapReferences(a, middle, high - 1);
        let pivot = a[high - 1];

        // Begin partitioning
        let i, j;
        for (i = low, j = high - 1; ;) {
            while (a[++i] < pivot);
            while (pivot < a[--j]);
            if (i < j)
                swapReferences(a, i, j);
            else break;
        }
        // Restore pivot
        swapReferences(a, i, high - 1);

        modifiedQuickSort(a, low, i - 1);    // Sort small elements
        modifiedQuickSort(a, i + 1, high);   // Sort large elements
    } else { 
        insertionSort(a, low, high);
    }
}




export function modifiedQuickSort(a, low = 0, high = a.length) {
    if (low + CUTOFF <= high){
        // Sort low, middle, high
        let middle = Math.floor((low + high) / 2);
        if (a[middle] < a[low])
            swapReferences(a, low, middle);
        if (a[high] < a[low])
            swapReferences(a, low, high);
        if (a[high] < a[middle])
            swapReferences(a, middle, high);

        // Place pivot at position high - 1
        swapReferences(a, middle, high - 1);
        let pivot = a[high - 1];

        // Begin partitioning
        let i, j;
        for (i = low, j = high - 1; ;) {
            while (a[++i] < pivot);
            while (pivot < a[--j]);
            if (i < j)
                swapReferences(a, i, j);
            else break;
        }
        // Restore pivot
        swapReferences(a, i, high - 1);

        modifiedQuickSort(a, low, i - 1);    // Sort small elements
        modifiedQuickSort(a, i + 1, high);   // Sort large elements
    } else { 
        insertionSort(a, low, high);
    }
}

function swapReferences(a, index1, index2) {
    let tmp = a[index1];
    a[index1] = a[index2];
    a[index2] = tmp;
}

function insertionSort(a, low = 0, high = a.length) {
    for (let p = low + 1; p <= high; p++) {
        let tmp = a[p];
        let j;

        for (j = p; j > low && tmp < a[j - 1]; j--)
            a[j] = a[j - 1];
        a[j] = tmp;
    }
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
}