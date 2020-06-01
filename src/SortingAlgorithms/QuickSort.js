// any random item or the first or the last item of your input can be pivot
var globalArray = [];


export function getQuickSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    animatedQuickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Quick sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function animatedQuickSort(auxillaryArray, startIndex, endIndex, animations) {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxillaryArray, startIndex, endIndex, animations);
        animatedQuickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
        animatedQuickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
    }
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
    let pivot = auxillaryArray[endIndex];
    let pivotIndex = startIndex;
    for (let i = startIndex; i <= endIndex - 1; i++) {
        animations.push([i, endIndex]);
        animations.push([i, endIndex]);
        if (auxillaryArray[i] <= pivot) {
            //Swap these two heights
            animations.push([i, auxillaryArray[pivotIndex]]);
            animations.push([pivotIndex, auxillaryArray[i]]);
            swap(auxillaryArray, i, pivotIndex);
            pivotIndex++;
        }
        else {
            animations.push([-1, -1]);
            animations.push([-1, -1]);
        }
        animations.push([-1, -1]);
        animations.push([-1, -1]);
    }
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    animations.push([-1, -1]);
    //Swap these two heights
    animations.push([pivotIndex, auxillaryArray[endIndex]]);
    animations.push([endIndex, auxillaryArray[pivotIndex]]);
    swap(auxillaryArray, pivotIndex, endIndex);
    return pivotIndex;
}

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition(arr, low, high) {
    let pivot = arr[high];    // pivot
    let i = (low - 1);  // Index of smaller element

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than or
        // equal to pivot
        if (arr[j] <= pivot) {
            i++;    // increment index of smaller element
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

// For the time complexity analysis I implemented Tail Call Elimination: https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/
// Because JS stack size is limited by browser: https://stackoverflow.com/questions/7826992/browser-javascript-stack-size-limit

function rQuickSort(arr, low, high)
{
    while (low < high) {
        /* pi is partitioning index, arr[p] is now
           at right place */
        let pi = partition(arr, low, high);

        if (pi - low < high - pi) {
            rQuickSort(arr, low, pi - 1);
            low = pi + 1;
        }
        else {
            rQuickSort(arr, pi + 1, high);
            high = pi - 1;
        }
    }
}


export function quickSort(arr) {
    rQuickSort(arr, 0, arr.length - 1)
    return arr
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

// Testing functions
// let tmpArr = []
// for (let i = 0; i < 50000; i++) { tmpArr.push(Math.random()); }
// let tmpSorted = quickSort(tmpArr.slice());
// console.log(tmpSorted)

// const javaScriptSortedArray = tmpArr.slice().sort((a, b) => a - b);
// console.log("Quick sort works correctly? ", arraysAreEqual(javaScriptSortedArray, tmpSorted));