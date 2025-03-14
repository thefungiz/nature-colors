import rColors from '../../resources/R.json'
import mColors from '../../resources/M.json'
import centroidColors from '../../resources/centroid.json'
import { AggregateRow, Options, SimpleRow } from '../types';


const getRColors = (predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown): SimpleRow[] => {
    const totalColors = simpleTransform(rColors, 'R');
    return !!predicate ? totalColors.filter(predicate) : totalColors;
}

const getMColors = (predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown): SimpleRow[] => {
    const totalColors = simpleTransform(mColors, 'M');
    return !!predicate ? totalColors.filter(predicate) : totalColors;
}

const getCentroidColors = (predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown): SimpleRow[] => {
    const totalColors = (centroidColors as SimpleRow[]).map(x => ({ ...x, reference: 'C' }));
    return !!predicate ? totalColors.filter(predicate) : totalColors;
}

const getAllColors = (predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown): SimpleRow[] => {
    const totalColors = [...simpleTransform(rColors, 'R'), ...simpleTransform(mColors, 'M'), ...(centroidColors as SimpleRow[]).map(x => ({ ...x, reference: 'C' }))]
    return !!predicate ? totalColors.filter(predicate) : totalColors;
}

const simpleTransform = (rows: AggregateRow[], reference: string): SimpleRow[] => {
    let collection: SimpleRow[] = [];
    rows
        .forEach(row => {
            row.colorCentroids.forEach(x => {
                collection.push({
                    name: row.colorName,
                    hex: x.hex,
                    centroidNumber: x.centroidNumber,
                    reference
                })
            })
        })
    return collection;
}

export const sortByCentroid = (rows: SimpleRow[]): SimpleRow[] => {
    return rows.sort((a, b) => (a.centroidNumber as unknown as number) - (b.centroidNumber as unknown as number));
  }

export const sortByHex = (rows: SimpleRow[]): SimpleRow[] => {
    // Helper function to convert a hex color to an RGB array
    function hexToRgb(hex: string): number[] {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    // Sorting function to compare two RGB arrays from SimpleRow objects
    function rgbComparator(a: SimpleRow, b: SimpleRow): number {
        const rgbA = hexToRgb(a.hex);
        const rgbB = hexToRgb(b.hex);
        // Sort primarily by the red, then green, then blue components
        for (let i = 0; i < 3; i++) {
            if (rgbA[i] !== rgbB[i]) {
                return rgbA[i] - rgbB[i];
            }
        }
        return 0; // Return 0 if they are the same color
    }

    // Copy the array to avoid mutating the original and sort it
    return [...rows].sort(rgbComparator);
}

const optionToFunctionMap: Record<Options, (predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown) => SimpleRow[]> = {
    [Options.All]: getAllColors.bind(this),
    [Options.R]: getRColors.bind(this),
    [Options.M]: getMColors.bind(this),
    [Options.Centroid]: getCentroidColors.bind(this),
};

export const getColors = (option: Options, predicate?: (value: SimpleRow, index: number, array: SimpleRow[]) => unknown): SimpleRow[] => {
    const selectedFunction = optionToFunctionMap[option];
    if (!selectedFunction) {
        throw new Error(`Invalid option: ${option}`);
    }
    return selectedFunction(predicate);
}