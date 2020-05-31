// vector based and insert one item at a time
export function getHeapSortAnimations(array) {
    let animations = [];
    let auxillaryArray = array.slice();
    animatedHeapSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Heap sort works correctly? ", arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

var array_length;

function animatedHeapSort(auxillaryArray, animation) {
    array_length = auxillaryArray.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(auxillaryArray, i);
    }

    for (i = auxillaryArray.length - 1; i > 0; i--) {
        swap(auxillaryArray, 0, i);
        array_length--;
        heap_root(auxillaryArray, 0);
    }
}

function heap_root(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max]) {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
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

export function heapSort(auxillaryArray){
    array_length = auxillaryArray.length;

    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        heap_root(auxillaryArray, i);
    }

    for (i = auxillaryArray.length - 1; i > 0; i--) {
        swap(auxillaryArray, 0, i);
        array_length--;
        heap_root(auxillaryArray, 0);
    }
}