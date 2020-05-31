export function getMergeSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    animatedMergeSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Merge sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function animatedMergeSort(auxillaryArray, startIndex, endIndex, animations) {
    if (startIndex === endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    animatedMergeSort(auxillaryArray, startIndex, middleIndex, animations);
    animatedMergeSort(auxillaryArray, middleIndex + 1, endIndex, animations);
    merge(auxillaryArray, startIndex, middleIndex, endIndex, animations);
}

function merge(auxillaryArray, startIndex, middleIndex, endIndex, animations) {
    let sortArray = [];
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
        //Comparing value at ith and jth index so push them to change their color
        animations.push([i, j]);
        //By changing color we imply that we are comparing those two values and then again we should revert back to their original color so push them again
        animations.push([i, j]);
        if (auxillaryArray[i] <= auxillaryArray[j]) {
            //We should overwrite the value at (i+startIndex)th index with ith index so push them to highlight swap their heights
            animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
            sortArray.push(auxillaryArray[i++]);
        }
        else {
            //We should overwrite the value at (i+startIndex)th index with jth index so push them to highlight swap their heights
            animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
            sortArray.push(auxillaryArray[j++]);
        }
    }
    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([sortArray.length + startIndex, auxillaryArray[i]]);
        sortArray.push(auxillaryArray[i++]);
    }
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([sortArray.length + startIndex, auxillaryArray[j]]);
        sortArray.push(auxillaryArray[j++]);
    }
    for (let i = startIndex; i <= endIndex; i++) {
        auxillaryArray[i] = sortArray[i - startIndex];
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

const mergeArrays = (arr1, arr2) => {
    let sorted = [];

    while (arr1.length && arr2.length) {
        if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
        else sorted.push(arr2.shift());
    };

    return sorted.concat(arr1.slice().concat(arr2.slice()));
};

export function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2),
        left = mergeSort(arr.slice(0, mid)),
        right = mergeSort(arr.slice(mid));

    return mergeArrays(left, right);
};