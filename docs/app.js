const generateArray = document.querySelector('#generateArray')
const arraySizeSlider = document.querySelector('#arraySizeSlider')
const bubbleSort = document.querySelector('#bubbleSort')
const quickSort = document.querySelector('#quickSort')
const insertionSort = document.querySelector('#insertionSort')
const heapSort = document.querySelector('#heapSort')
const selectionSort = document.querySelector('#selectionSort')
const sort = document.querySelector('#sort')
const container = document.querySelector('#sortingContainer')
const algoBeingUsed = document.querySelector("#algoBeingUsed")
const resetApp = document.querySelector("#resetApp")
const clock = document.querySelector('#clock')
const arraySize = document.querySelector('#arraySize')

let arrayLength = 4
let arrayOfElements = []
let sortType = 'bubbleSort'
let timerInterval = 0;
let seconds = 0;
let isTimerRunning = false;
let isSorting = false;
const MAX_HEIGHT = 500;
const buttons = [bubbleSort, quickSort, insertionSort, selectionSort, heapSort, sort, generateArray, arraySizeSlider]

// Function to generate a random array based on user input or button click
function randomArray(e) {
    // Get the ID of the clicked element
    const buttonId = e.target.id;

    // Update the array length if the button clicked is not the 'Generate Array' button
    if (buttonId !== 'generateArray') {
        arrayLength = e.target.value;
    }

    // Initialize an empty array for the elements
    arrayOfElements = []

    // Clear existing child elements in the container div
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // Add new div elements for the array with random heights
    for (let i = 0; i < arrayLength; i++) {
        let randomNumber = getRandomNumber()
        const newElement = document.createElement('div');
        newElement.style.height = `${randomNumber}px`
        newElement.id = `element${i}`
        arrayOfElements.push(newElement)
        newElement.classList.add("flex-1", "bg-blue-500", "items-end");
        container.appendChild(newElement);

        arraySize.innerHTML = `ARRAY SIZE: ${arrayLength}`
    }
}

// Add a click event listener to the 'Generate Array' button
generateArray.addEventListener('click', function (e) {
    // Call the randomArray function when the button is clicked
    randomArray(e);
})
// Execute randomArray function when the window has finished loading
window.onload = function () {
    randomArray({ target: { id: 'generateArray', value: arrayLength } });
};

// Generate a random number within the specified range
function getRandomNumber() {
    return randNumber = Math.floor(Math.random() * MAX_HEIGHT) + 1;
}

// Asynchronous implementation of the Bubble Sort algorithm
async function bubbleSortMethod(arr) {
    let swapped = false;

    // Continue sorting until no more swaps are needed
    do {
        swapped = false;

        // Iterate through the array and perform comparisons
        for (let i = 0; i < arr.length - 1; i++) {
            const height1 = parseInt(arr[i].style.height.replace(/px/g, ''));
            const height2 = parseInt(arr[i + 1].style.height.replace(/px/g, ''));

            // Swap elements if they are in the wrong order
            if (height1 > height2) {
                const tempHeight = arr[i].style.height;
                arr[i].style.height = arr[i + 1].style.height;
                arr[i + 1].style.height = tempHeight;

                const element1 = document.querySelector(`#element${i}`);
                const element2 = document.querySelector(`#element${i + 1}`);

                // Update element heights and highlight swapped elements
                element1.style.height = arr[i].style.height;
                highLight(element1, 'bg-red-500');
                element2.style.height = arr[i + 1].style.height;
                highLight(element2, 'bg-green-500');

                // Indicate that a swap has occurred and introduce a delay for visualization
                swapped = true;
                await new Promise(resolve => setTimeout(resolve, 1));
            }
        }
    } while (swapped);

    // Remove highlighting after sorting is complete
    arr.forEach(element => {
        element.classList.remove('bg-red-500', 'bg-green-500');
    });
}

// Asynchronous implementation of the Quick Sort algorithm
async function quickSortMethod(arr, left = 0, right = arr.length - 1) {
    // Check if there are more than one element in the subarray
    if (left < right) {
        // Get the partition index asynchronously
        let pIdx = await partition(arr, left, right);

        // Recursive calls to quickSort for the left and right subarrays
        await quickSortMethod(arr, left, pIdx - 1);
        await quickSortMethod(arr, pIdx + 1, right);
    }
}

// Asynchronous function to partition the array and select a pivot
async function partition(arr, left, right) {
    // Set the pivot value as the rightmost element's height
    let pivotValue = arr[right].style.height;
    let i = left - 1;

    // Iterate through the subarray and rearrange elements based on the pivot
    for (let j = left; j < right; j++) {
        const height1 = parseInt(arr[j].style.height.replace(/px/g, ''));
        const pivotHeight = parseInt(pivotValue.replace(/px/g, ''));

        // Swap elements if they are smaller than the pivot
        if (height1 < pivotHeight) {
            i++;
            const tempHeight = arr[i].style.height;
            arr[i].style.height = arr[j].style.height;
            arr[j].style.height = tempHeight;

            const element1 = document.querySelector(`#element${i}`);
            const element2 = document.querySelector(`#element${j}`);

            // Update element heights and highlight swapped elements
            element1.style.height = arr[i].style.height;
            highLight(element1, 'bg-red-500');
            element2.style.height = arr[j].style.height;
            highLight(element2, 'bg-green-500');

            // Introduce a delay for visualization
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }

    // Swap the pivot element to its correct position
    const tempHeight = arr[i + 1].style.height;
    arr[i + 1].style.height = arr[right].style.height;
    arr[right].style.height = tempHeight;

    // Highlight the pivot element
    const pivotElement = document.querySelector(`#element${i + 1}`);
    highLight(pivotElement, 'bg-blue-500');

    // Return the index where the pivot element is placed
    return i + 1;
}


// Asynchronous implementation of the Insertion Sort algorithm
async function insertionSortMethod(arr) {
    // Iterate through the array starting from the second element
    for (let i = 1; i < arr.length; i++) {
        // Get the height value of the element to be inserted
        let valueToSort = parseInt(arr[i].style.height.replace(/px/g, ''));

        // Compare and swap elements until the correct position is found
        while (i > 0 && parseInt(arr[i - 1].style.height.replace(/px/g, '')) > valueToSort) {
            // Swap heights of the current and previous elements
            const tempHeight = arr[i].style.height;
            arr[i].style.height = arr[i - 1].style.height;
            arr[i - 1].style.height = tempHeight;

            const element1 = document.querySelector(`#element${i}`);
            const element2 = document.querySelector(`#element${i - 1}`);

            // Update element heights and highlight swapped elements
            element1.style.height = arr[i].style.height;
            highLight(element1, 'bg-red-500');
            element2.style.height = arr[i - 1].style.height;
            highLight(element2, 'bg-green-500');

            // Move to the previous element and introduce a delay for visualization
            i -= 1;
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
}

// Asynchronous implementation of the Selection Sort algorithm
async function selectionSortMethod(arr) {
    // Iterate through the array for selecting the minimum element
    for (let i = 0; i < arr.length; i++) {
        let m = i;

        // Iterate through the unsorted part of the array to find the minimum element
        for (let j = i + 1; j < arr.length; j++) {
            // Compare heights to find the index of the minimum element
            if (parseInt(arr[j].style.height.replace(/px/g, '')) < parseInt(arr[m].style.height.replace(/px/g, ''))) {
                m = j;
                // Introduce a delay for visualization
                await new Promise(resolve => setTimeout(resolve, 1));
            }
        }

        // Swap the found minimum element with the first element in the unsorted part
        if (m !== i) {
            const tempHeight = arr[i].style.height;
            arr[i].style.height = arr[m].style.height;
            arr[m].style.height = tempHeight;

            const element1 = document.querySelector(`#element${i}`);
            const element2 = document.querySelector(`#element${m}`);

            // Update element heights and highlight swapped elements
            element1.style.height = arr[i].style.height;
            highLight(element1, 'bg-red-500');
            element2.style.height = arr[m].style.height;
            highLight(element2, 'bg-green-500');

            // Introduce a delay for visualization
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }
}


// Asynchronous function to heapify a subtree rooted at index i
async function heapify(arr, n, i) {
    // Initialize the largest element as the root
    let largest = i;

    // Calculate the left and right child indices
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Check if the left child is larger than the root
    if (left < n && parseInt(arr[left].style.height.replace(/px/g, '')) > parseInt(arr[largest].style.height.replace(/px/g, ''))) {
        largest = left;
    }

    // Check if the right child is larger than the largest so far
    if (right < n && parseInt(arr[right].style.height.replace(/px/g, '')) > parseInt(arr[largest].style.height.replace(/px/g, ''))) {
        largest = right;
    }

    // If the largest is not the root, swap and continue heapifying the subtree
    if (largest !== i) {
        const tempHeight = arr[i].style.height;
        arr[i].style.height = arr[largest].style.height;
        arr[largest].style.height = tempHeight;

        const element1 = document.querySelector(`#element${i}`);
        const element2 = document.querySelector(`#element${largest}`);

        // Update element heights and highlight swapped elements
        element1.style.height = arr[i].style.height;
        highLight(element1, 'bg-red-500');
        element2.style.height = arr[largest].style.height;
        highLight(element2, 'bg-green-500');

        // Introduce a delay for visualization
        await new Promise(resolve => setTimeout(resolve, 1));

        // Recursively heapify the affected subtree
        await heapify(arr, n, largest);
    }
}


// Asynchronous implementation of the Heap Sort algorithm
async function heapSortMethod(arr) {
    const n = arr.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Swap the root (largest element) with the last element
        const tempHeight = arr[0].style.height;
        arr[0].style.height = arr[i].style.height;
        arr[i].style.height = tempHeight;

        const rootElement = document.querySelector(`#element0`);
        const lastElement = document.querySelector(`#element${i}`);

        // Update element heights and highlight swapped elements
        rootElement.style.height = arr[0].style.height;
        highLight(rootElement, 'bg-red-500');
        lastElement.style.height = arr[i].style.height;
        highLight(lastElement, 'bg-green-500');

        // Introduce a delay for visualization
        await new Promise(resolve => setTimeout(resolve, 1));

        // Heapify the reduced heap
        await heapify(arr, i, 0);
    }
}

// Event listener for input changes on the array size slider
arraySizeSlider.addEventListener('input', function (e) {
    // Regenerate a random array based on the new size
    randomArray(e);
});

arraySizeSlider.addEventListener('input', function (e) {
    randomArray(e);

});

bubbleSort.addEventListener('click', function (e) {
    if (bubbleSort.disabled) {
        return;
    }

    algoBeingUsed.innerHTML = 'SORTING USING BUBBLE SORT'
    sortType = 'bubbleSort'
    seconds = 0
    clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`;
});

quickSort.addEventListener('click', function (e) {
    if (quickSort.disabled) {
        return;
    }

    algoBeingUsed.innerHTML = 'SORTING USING QUICK SORT'
    sortType = 'quickSort'
    seconds = 0
    clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`
});

insertionSort.addEventListener('click', function (e) {
    if (insertionSort.disabled) {
        return;
    }

    algoBeingUsed.innerHTML = 'SORTING USING INSERTION SORT'
    sortType = 'insertionSort'
    seconds = 0
    clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`;
});

heapSort.addEventListener('click', function (e) {
    if (heapSort.disabled) {
        return;
    }

    algoBeingUsed.innerHTML = 'SORTING USING HEAP SORT';
    sortType = 'heapSort';
    seconds = 0;
    clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`;
});

selectionSort.addEventListener('click', function (e) {
    if (selectionSort.disabled) {
        return;
    }

    algoBeingUsed.innerHTML = 'SORTING USING SELECTION SORT'
    sortType = 'selectionSort'
    seconds = 0
    clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`;
});


resetApp.addEventListener('click', function (e) {
    location.reload();
});

sort.addEventListener('click', async function (e) {
    if (isSorting) {
        return;
    }

    isSorting = true;

    disableButtons(buttons, true);

    const handleSorting = async (sortMethod) => {
        timer();
        await sortMethod(arrayOfElements);
        timer();
        disableButtons(buttons, false);
        await animateArray(arrayOfElements, 'bg-green-500');
        addSortedHighLight(arrayOfElements, 'bg-green-500');
        isSorting = false;
    };

    switch (sortType) {
        case 'bubbleSort':
            await handleSorting(bubbleSortMethod);
            break;
        case 'quickSort':
            await handleSorting(quickSortMethod);
            break;
        case 'insertionSort':
            await handleSorting(insertionSortMethod);
            break;
        case 'selectionSort':
            await handleSorting(selectionSortMethod);
            break;
        case 'heapSort':
            await handleSorting(heapSortMethod);
            break;
        default:
            await handleSorting(bubbleSortMethod);
            break;
    }
});

// Function to apply a highlighting effect to a specified element with a color
function highLight(element, color) {
    // Remove the default background color and apply the specified color
    element.classList.remove('bg-blue-500');
    element.classList.add(color);

    // Reset the background color after a short delay for visualization
    setTimeout(() => {
        element.classList.remove(color);
        element.classList.add('bg-blue-500');
    }, 1);
}


// Function to add a highlighting effect to elements in an array with a delay
function addSortedHighLight(arr, color) {
    arr.forEach((element, index) => {
        setTimeout(() => {
            // Remove the default background color and apply the specified color
            element.classList.remove('bg-blue-500');
            element.classList.add(color);
        }, index * 5); // Introduce a delay for visualization
    });
}

// Asynchronous function to animate the elements in an array with a highlighting effect
async function animateArray(arr, color) {
    for (let i = 0; i < arr.length; i++) {
        const element = document.querySelector(`#element${i}`);
        // Set the height of the current element based on the original array
        element.style.height = arr[i].style.height;
        // Apply the highlighting effect
        highLight(element, color);
        // Introduce a delay for visualization
        await new Promise(resolve => setTimeout(resolve, 5));
    }
}



// Function to disable or enable buttons and adjust their styles
function disableButtons(buttons, disable) {
    for (let button of buttons) {
        // Remove hover effect class
        button.classList.remove('hover:bg-gray-700');

        // Apply transition and styling for disabled or enabled state
        if (disable) {
            button.classList.add('transition', 'duration-500', 'ease-in-out', 'hover:bg-red-500', 'disable-click', 'cursor-not-allowed');
        } else {
            button.classList.remove('transition', 'duration-500', 'ease-in-out', 'hover:bg-red-500', 'disable-click', 'cursor-not-allowed');
        }

        // Set the disabled property of the button
        button.disabled = disable;
    }
}
// Function to control the timer for the algorithm clock
function timer() {
    if (!isTimerRunning) {
        // Start the timer interval
        timerInterval = setInterval(function () {
            seconds++;
            clock.innerHTML = `ALGO CLOCK: ${seconds} seconds`;
        }, 1000);
        isTimerRunning = true;
    } else {
        // Stop the timer interval
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}