import React from 'react';
import './SortingVisualizer.css';
import { getBubbleSortAnimations, bubbleSort } from '../SortingAlgorithms/BubbleSort';
import { getHeapSortAnimations, heapSort } from '../SortingAlgorithms/HeapSort';
import { getInsertionSortAnimations, insertionSort } from '../SortingAlgorithms/InsertionSort';
import { getMergeSortAnimations, mergeSort } from '../SortingAlgorithms/MergeSort';
import { getModifiedQuickSortAnimations, modifiedQuickSort } from '../SortingAlgorithms/ModifiedQuickSort';
import { getQuickSortAnimations, quickSort } from '../SortingAlgorithms/QuickSort';
import { getSelectionSortAnimations, selectionSort } from '../SortingAlgorithms/SelectionSort';
import Chart from '../Components/Chart';

//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);

let bubbleSortData = [];
let heapSortData = [];
let insertionSortData = [];
let mergeSortData = [];
let modifiedQuickSortData = [];
let quickSortData = [];
let selectionSortData = [];


function reportWindowSize() {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200) / 8);
}
window.onresize = reportWindowSize; //TBD -> find a way to update state also when resized
document.title = "Sorting Algorithms";

const PRIMARY_COLOR = 'dodgerblue'; //Normal color of bars
const SECONDARY_COLOR = 'orangered'; //Color of bars when they are being compared
const ANIMATION_SPEED_MS = 1; //Animation Speed (how fast color changes, how fast height gets overwritten)

//Tooltips for buttons
const DISABLED_BUTTON = "Currently Disabled"
const ENABLED_BUTTON = {
    nlogn: "O(NlogN) Time Complexity",
    nSquare: "O(N^2) Time Complexity",
    plotToolTip: "Compare all algorithms for different input sizes",
    generateRandomArray: "Generates a new random unsorted array",
    generateSortedArray: "Generates a new sorted array",
    generateReversedArray: "Generates a new reversed array"
}

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            chartDataRandom: {},
            chartDataSorted: {},
            chartDataReversed: {},
            showGraphs: false
        };
    }

    componentDidMount() {
        this.resetArray();
        //this.getChartData();
    }

    //Generates new random array 
    resetArray() {
        const array = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(25, WINDOW_HEIGHT - 30));
        }
        this.setState({ array: array });
        this.restoreButtons();
    }

    //Sorts a new array
    sortArray() {
        this.resetArray();
        const sorted = this.state.array.slice().sort((a, b) => a - b); //Adjusted sort function because sort w/o args uses string comparison, not number
        this.setState({ array: sorted });
    }

    //Sorts and reverses a new array
    reverseArray() {
        this.resetArray();
        const reverse = this.state.array.slice().sort((a, b) => a - b).reverse(); //Adjusted sort function because sort w/o args uses string comparison, not number
        this.setState({ array: reverse });
    }

    disableButtons() {
        document.getElementById("arrayGen").disabled = true;
        let buttonStyle = document.getElementById("arrayGen").style;
        document.getElementById("arrayGen").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("sortArray").disabled = true;
        buttonStyle = document.getElementById("sortArray").style;
        document.getElementById("sortArray").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("reverseArray").disabled = true;
        buttonStyle = document.getElementById("reverseArray").style;
        document.getElementById("reverseArray").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("mergeSort").disabled = true;
        buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("heapSort").disabled = true;
        buttonStyle = document.getElementById("heapSort").style;
        document.getElementById("heapSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("bubbleSort").disabled = true;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("modQuickSort").disabled = true;
        buttonStyle = document.getElementById("modQuickSort").style;
        document.getElementById("modQuickSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";

        document.getElementById("comparisonPlot").disabled = true;
        buttonStyle = document.getElementById("comparisonPlot").style;
        document.getElementById("comparisonPlot").title = DISABLED_BUTTON;
        buttonStyle.cursor = "wait";
        buttonStyle.background = "#000000";
    }

    restoreButtons() {
        document.getElementById("arrayGen").disabled = false;
        let buttonStyle = document.getElementById("arrayGen").style;
        document.getElementById("arrayGen").title = ENABLED_BUTTON.generateRandomArray;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("sortArray").disabled = false;
        buttonStyle = document.getElementById("sortArray").style;
        document.getElementById("sortArray").title = ENABLED_BUTTON.generateSortedArray;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("reverseArray").disabled = false;
        buttonStyle = document.getElementById("reverseArray").style;
        document.getElementById("reverseArray").title = ENABLED_BUTTON.generateReversedArray;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("mergeSort").disabled = false;
        buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("bubbleSort").disabled = false;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("heapSort").disabled = false;
        buttonStyle = document.getElementById("heapSort").style;
        document.getElementById("heapSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("modQuickSort").disabled = false;
        buttonStyle = document.getElementById("modQuickSort").style;
        document.getElementById("modQuickSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("comparisonPlot").disabled = false;
        buttonStyle = document.getElementById("comparisonPlot").style;
        document.getElementById("comparisonPlot").title = ENABLED_BUTTON.plotToolTip;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";
    }


    //Sorting Algorithms
    bubbleSort() {
        this.disableButtons();
        const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS * 0.5);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS * 0.5);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }

    heapSort() {
        this.disableButtons();
        const [animations, sortArray] = getHeapSortAnimations(this.state.array);
        // for (let i = 0; i < animations.length; i++) {
        //     const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
        //     const arrayBars = document.getElementsByClassName('array-bar');
        //     if (isColorChange === true) {
        //         const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
        //         const [temp, barOneIndex, barTwoIndex] = animations[i];
        //         const barOneStyle = arrayBars[barOneIndex].style;
        //         const barTwoStyle = arrayBars[barTwoIndex].style;
        //         setTimeout(() => {
        //             barOneStyle.backgroundColor = color;
        //             barTwoStyle.backgroundColor = color;
        //         }, i * ANIMATION_SPEED_MS);
        //     }
        //     else {
        //         const [temp, barIndex, newHeight] = animations[i];
        //         const barStyle = arrayBars[barIndex].style;
        //         setTimeout(() => {
        //             barStyle.height = `${newHeight}px`;
        //         }, i * ANIMATION_SPEED_MS);
        //     }
        // }
        // // this.setState({array: sortArray})
        // const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        // setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }


    insertionSort() {
        this.disableButtons();
        const [animations, sortArray] = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }

    mergeSort() {
        this.disableButtons();
        const [animations, sortArray] = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 3 !== 2);
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }

    modQuickSort() {
        this.disableButtons();
        const [animations, sortArray] = getModifiedQuickSortAnimations(this.state.array);
    }

    quickSort() {
        this.disableButtons();
        const [animations, sortArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length - 1; i++) {
            const isColorChange = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                if (barOneIndex === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }

    selectionSort() {
        this.disableButtons();
        const [animations, sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
        setTimeout(() => this.restoreButtons(), RESTORE_TIME);
    }


    getChartRandomData() {
        this.resetData();
        var arraySizes = [1000, 2000, 4000, 5000, 10000, 40000, 50000];
        var array = []
        var t0, t1 = 0;
        for (var index = 0; index < arraySizes.length; ++index) { //Iterate through each array size
            array = [];
            for (let i = 0; i < arraySizes[index]; i++) { array.push(Math.random()); } //Generate an array based on the current array size
            var tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                bubbleSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            bubbleSortData.push(average(tmp));


            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                heapSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            heapSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                insertionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            insertionSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                mergeSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            mergeSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                modifiedQuickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            modifiedQuickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                quickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            quickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                selectionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            selectionSortData.push(average(tmp));
        }
    }
    getChartSortedData() {
        this.resetData();
        var arraySizes = [1000, 2000, 4000, 5000, 10000, 40000, 50000];
        var array = []
        var t0, t1 = 0;
        for (var index = 0; index < arraySizes.length; ++index) { //Iterate through each array size
            array = [];
            for (let i = 0; i < arraySizes[index]; i++) { array.push(Math.random()); } //Generate an array based on the current array size
            array.sort((a, b) => a - b); //Adjusted sort function because sort w/o args uses string comparison, not number
            var tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                bubbleSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            bubbleSortData.push(average(tmp));


            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                heapSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            heapSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                insertionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            insertionSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                mergeSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            mergeSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                modifiedQuickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            modifiedQuickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                quickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            quickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                selectionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            selectionSortData.push(average(tmp));
        }
    }
    getChartReverseData() {
        this.resetData();
        var arraySizes = [1000, 2000, 4000, 5000, 10000, 40000, 50000];
        var array = []
        var t0, t1 = 0;
        for (var index = 0; index < arraySizes.length; ++index) { //Iterate through each array size
            array = [];
            for (let i = 0; i < arraySizes[index]; i++) { array.push(Math.random()); } //Generate an array based on the current array size
            array.sort((a, b) => a - b).reverse();

            var tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                bubbleSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            bubbleSortData.push(average(tmp));


            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                heapSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            heapSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                insertionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            insertionSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                mergeSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            mergeSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                modifiedQuickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            modifiedQuickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                quickSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            quickSortData.push(average(tmp));

            tmp = []
            for (let i = 0; i < (arraySizes.length - index); i++) {
                t0 = performance.now();
                selectionSort(array.slice());
                t1 = performance.now();
                tmp.push(t1 - t0)
            }
            selectionSortData.push(average(tmp));
        }
    }
    resetData() {
        bubbleSortData = [];
        heapSortData = [];
        insertionSortData = [];
        mergeSortData = [];
        modifiedQuickSortData = [];
        quickSortData = [];
        selectionSortData = [];
    }
    getAllData() {
        this.getChartRandomData();
        //console.log("bubble", bubbleSortData);
        this.setState({
            chartDataRandom: {
                labels: ['1,000', '2,000', '4,000', '5,000', '10,000', '40,000', '50,000'],
                datasets: [
                    {
                        label: 'Bubble Sort',
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        data: bubbleSortData,
                    }, {
                        label: 'Heap Sort',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        data: heapSortData,
                    }, {
                        label: 'Insertion Sort',
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        data: insertionSortData,
                    }, {
                        label: 'Merge Sort',
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        data: mergeSortData,
                    }, {
                        label: 'Modified Quick Sort',
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        data: modifiedQuickSortData,
                    }, {
                        label: 'Quick Sort',
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        data: quickSortData,
                    }, {
                        label: 'Selection Sort',
                        backgroundColor: 'rgba(99, 255, 132, 0.6)',
                        data: selectionSortData,
                    }
                ]
            }
        });

        this.getChartSortedData();
        //console.log("bubblesort", bubbleSortData);
        this.setState({
            chartDataSorted: {
                labels: ['1,000', '2,000', '4,000', '5,000', '10,000', '40,000', '50,000'],
                datasets: [
                    {
                        label: 'Bubble Sort',
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        data: bubbleSortData,
                    }, {
                        label: 'Heap Sort',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        data: heapSortData,
                    }, {
                        label: 'Insertion Sort',
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        data: insertionSortData,
                    }, {
                        label: 'Merge Sort',
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        data: mergeSortData,
                    }, {
                        label: 'Modified Quick Sort',
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        data: modifiedQuickSortData,
                    }, {
                        label: 'Quick Sort',
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        data: quickSortData,
                    }, {
                        label: 'Selection Sort',
                        backgroundColor: 'rgba(99, 255, 132, 0.6)',
                        data: selectionSortData,
                    }
                ]
            }
        });

        this.getChartReverseData();
        //console.log("bubblereverse", bubbleSortData);
        this.setState({
            chartDataReversed: {
                labels: ['1,000', '2,000', '4,000', '5,000', '10,000', '40,000', '50,000'],
                datasets: [
                    {
                        label: 'Bubble Sort',
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        data: bubbleSortData,
                    }, {
                        label: 'Heap Sort',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        data: heapSortData,
                    }, {
                        label: 'Insertion Sort',
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        data: insertionSortData,
                    }, {
                        label: 'Merge Sort',
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        data: mergeSortData,
                    }, {
                        label: 'Modified Quick Sort',
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        data: modifiedQuickSortData,
                    }, {
                        label: 'Quick Sort',
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        data: quickSortData,
                    }, {
                        label: 'Selection Sort',
                        backgroundColor: 'rgba(99, 255, 132, 0.6)',
                        data: selectionSortData,
                    }
                ]
            }
        });
    }

    comparisonPlot() {
        this.disableButtons()
        this.render()
        alert("This will take about 1 minute to complete, if your browser asks you to Wait please allow it. ");
        this.getAllData()
        document.title = "Time Complexity Analysis";
        this.setState({ showGraphs: true })
    }

    render() {
        const array = this.state.array;
        const SORT_BUTTONS = 6;
        const TOTAL_BUTTONS = 1 + SORT_BUTTONS;
        if (this.state.showGraphs) {
            return (
                <>
                    <div className="Charts">
                        <div className="App-header" >
                            <h1>Time Complexity Analysis</h1>
                        </div>
                        <Chart chartData={this.state.chartDataRandom} title="Algorithms Tested With Random Data" />
                        <div style={{ height: `50px` }}></div>
                        <Chart chartData={this.state.chartDataSorted} title="Algorithms Tested With Sorted Data" />
                        <div style={{ height: `50px` }}></div>
                        <Chart chartData={this.state.chartDataReversed} title="Algorithms Tested With Reversely Sorted Data" />
                    </div>
                </>
            );

        } else {
            return (
                <>
                    <div className="array-container" style={{ position: 'absolute', right: `20px` }}>
                        {array.map((value, idx) => (
                            <div
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="buttons" >
                        <button title="Generates a new random unsorted array" id="arrayGen" style={{ position: 'relative', top: `${0 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.resetArray()}>
                            Generate an Unsorted Array
                    </button>
                        <button title="Generates a new sorted array" id="sortArray" style={{ position: 'relative', top: `${0 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.sortArray()}>
                            Generate a Sorted Array
                    </button>
                        <button title="Generates a new reversed array" id="reverseArray" style={{ position: 'relative', top: `${0 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.reverseArray()}>
                            Generate a Sorted Reversed Array
                    </button>
                        <button title="O(N^2) Time Complexity" id="bubbleSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.bubbleSort()}>
                            Bubble Sort
                    </button>
                        <button title="O(NlogN) Time Complexity" id="heapSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.heapSort()}>
                            Heap Sort
                    </button>
                        <button title="O(N^2) Time Complexity" id="insertionSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.insertionSort()}>
                            Insertion Sort
                    </button>
                        <button title="O(NlogN) Time Complexity" id="mergeSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.mergeSort()}>
                            Merge Sort
                    </button>
                        <button title="O(N^2) Time Complexity" id="modQuickSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.modQuickSort()}>
                            Modified Quick Sort
                    </button>
                        <button title="O(N^2) Time Complexity" id="quickSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.quickSort()}>
                            In-Place Quick Sort
                    </button>
                        <button title="O(N^2) Time Complexity" id="selectionSort" style={{ position: 'relative', top: `${0.5 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.selectionSort()}>
                            Selection Sort
                    </button>
                        <button title="Compare all algorithms for different input sizes" id="comparisonPlot" style={{ position: 'relative', top: `${1.0 * (WINDOW_HEIGHT - 20) / TOTAL_BUTTONS}px` }} onClick={() => this.comparisonPlot()}>
                            Time Complexity Analysis
                    </button>

                    </div>
                </>
            );
        }

    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }//min max inclusive
const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
export default SortingVisualizer;