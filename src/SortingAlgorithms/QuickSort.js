// any random item or the first or the last item of your input can be pivot
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

export function quickSort(){

}