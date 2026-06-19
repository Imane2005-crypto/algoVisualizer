"use client"

import { totalmem } from "os";
import { ChartDataProps, sleep } from "../components/shared/BarGraph";

export async function bubbleSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number): Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }>{
    const sortedData = [...data];
    let n = sortedData.length;
    let swapped: boolean;
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            const start = performance.now();
            comparisons++;
            if (sortedData[i].bar > sortedData[i + 1].bar) {
                [sortedData[i], sortedData[i + 1]] = [sortedData[i + 1], sortedData[i]];
                swaps++;
                executionTime += performance.now() - start;
                setChartData([...sortedData]);
                await sleep(delay);
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return {sortedData,
            comparisons,
            swaps,
            executionTime,
            };
}


export async function selectionSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number):     Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }> {
    const sortedData = [...data];
    let n = sortedData.length;
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
            const start = performance.now();
            comparisons++;
            if (sortedData[j].bar < sortedData[min_idx].bar) {
                min_idx = j;
            }
            executionTime += performance.now() - start;
        }
        if(min_idx !== i){
            const start = performance.now();
            let temp = sortedData[i].bar; 
            sortedData[i].bar = sortedData[min_idx].bar;
            sortedData[min_idx].bar = temp;
            swaps++;
            executionTime += performance.now() - start;
            setChartData([...sortedData]);
            await sleep(delay);
        }    
    }
    return {sortedData,
            comparisons,
            swaps,
            executionTime,
            };
}

export async function mergeSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number):     Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }>{
    const sortedData = [...data];
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;

    async function mergeSortHelper(arr: ChartDataProps[], start: number, end: number): Promise<void> {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(arr, start, mid);
        await mergeSortHelper(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }

    async function merge(arr: ChartDataProps[], start: number, mid: number, end: number): Promise<void> {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

    
        while (i < left.length && j < right.length) {
            comparisons++;
            if (left[i].bar <= right[j].bar) {
                const start = performance.now();
                arr[k] = left[i];
                swaps++;
                i++;
                k++;
                executionTime += performance.now() - start;
                setChartData([...arr]);
                await sleep(delay);
            } else {
                const start = performance.now();
                arr[k] = right[j];
                swaps++;
                j++;
                k++;
                executionTime += performance.now() - start;
                setChartData([...arr]);
                await sleep(delay);
            }
        }

        while (i < left.length) {
            const start = performance.now();
            arr[k] = left[i];
            swaps++;
            i++;
            k++;
            executionTime += performance.now() - start;
            setChartData([...arr]);
            await sleep(delay);

        }

        while (j < right.length) {
            const start = performance.now();
            arr[k] = right[j];
            swaps++;
            j++;
            k++;
            executionTime += performance.now() - start;
            setChartData([...arr]);
            await sleep(delay);
        }
    }

    await mergeSortHelper(sortedData, 0, sortedData.length - 1);
    return {
            sortedData,
            comparisons,
            swaps,
            executionTime,
            };
}


export async function heapSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number):     Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }>{
    const sortedData = [...data];
    let n = sortedData.length;
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;

    const heapify = async (arr: ChartDataProps[], length: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        comparisons++;
        if (left < length && arr[left].bar > arr[largest].bar) {
            largest = left;
        }
        comparisons++;
        if (right < length && arr[right].bar > arr[largest].bar) {
            largest = right;


        if (largest !== i) {
            const start = performance.now();
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            swaps++;
            executionTime += performance.now() - start;
            setChartData([...arr]);
            await sleep(delay);
            await heapify(arr, length, largest);
        }
    };
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(sortedData, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        const start = performance.now();
        [sortedData[0], sortedData[i]] = [sortedData[i], sortedData[0]];
        swaps++;
        executionTime += performance.now() - start;
        setChartData([...sortedData]);
        await sleep(delay);
        await heapify(sortedData, i, 0);
    }
    const finalData = [...sortedData].sort((a,b) => a.bar - b.bar);

    setChartData([...finalData]);
    return {sortedData: finalData,
            comparisons,
            swaps,
            executionTime,
            };
}


export async function quickSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number):    Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }> {
    const sortedData = [...data];
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;

    async function quickSortHelper(arr: ChartDataProps[], low: number, high: number): Promise<void> {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    }

    async function partition(arr: ChartDataProps[], low: number, high: number): Promise<number> {
        const pivot = arr[high].bar;
        let i = low - 1;

        
        for (let j = low; j < high; j++) {
            comparisons++;
            if (arr[j].bar < pivot) {
                const start = performance.now();
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swaps++;
                executionTime += performance.now() - start;
                setChartData([...arr]);
                await sleep(delay);
            }
        }
        const start = performance.now();
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        executionTime += performance.now() - start;
        setChartData([...arr]);
        await sleep(delay);
        return i + 1;
    }

    await quickSortHelper(sortedData, 0, sortedData.length - 1);
    return {sortedData,
            comparisons,
            swaps,
            executionTime,
            };
}

export async function insertionSort(data: ChartDataProps[], setChartData: React.Dispatch<React.SetStateAction<ChartDataProps[]>>, delay: number) :     Promise<{
        sortedData: ChartDataProps[]
        comparisons: number
        swaps: number
        executionTime: number
    }>{
    const sortedData = [...data];
    let n = sortedData.length;
    let comparisons = 0;
    let swaps = 0;
    let executionTime = 0;

    for (let i = 1; i < n; i++) {
        let key = sortedData[i];
        let j = i - 1;
        while (j >= 0 && sortedData[j].bar > key.bar) {
            const start = performance.now();
            comparisons++;
            sortedData[j + 1] = sortedData[j];
            swaps++;
            executionTime += performance.now() - start;
            setChartData([...sortedData]);
            await sleep(delay);
            j = j - 1;
        }
        const start = performance.now();
        sortedData[j + 1] = key;
        executionTime += performance.now() - start;
        setChartData([...sortedData]);
        await sleep(delay);
    }
    return {sortedData,
            comparisons,
            swaps,
            executionTime,
            };
}
// Function to get appropriate sort function based on algorithm name
export const getSortFunction = (algorithm: string) => {
    switch (algorithm) {
      case 'bubble':
        return bubbleSort;
      case 'quick':
        return quickSort;
      case 'merge':
        return mergeSort;
      case 'insertion':
        return insertionSort;
      case 'selection':
        return selectionSort;
      case 'heap':
        return heapSort;
      default:
        return null;
    }
  };

