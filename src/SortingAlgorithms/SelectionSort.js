export function getSelectionSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    animatedSelectionSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Selection sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function animatedSelectionSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    for (let i = 0; i < N - 1; i++) {
        let minIndex = i; //Finding minimum element in unsorted array
        for (let j = i + 1; j < N; j++) {
            animations.push(["comparision1", j, minIndex]);
            animations.push(["comparision2", j, minIndex]);
            if (auxillaryArray[j] < auxillaryArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, auxillaryArray[i]]);
        animations.push(["swap", i, auxillaryArray[minIndex]]);
        // Swap the found minimum element with the first element
        swap(auxillaryArray, minIndex, i);
    }
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


export function selectionSort(arr) {
    const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];

    arr.forEach((item, i) => {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) min = j;
        };
        swap(arr, i, min);
    });

    return arr;
}