export type AggregateRow = {
    element: {};
    fullName: string;
    colorName: string;
    colorCentroids: {
        element: {};
        rgb: string;
        hex: string;
        centroidNumber: string;
    }[];
}

export type SimpleRow = {
    name: string;
    hex: string;
    centroidNumber: string;
}

export enum Options {
    All = "All",
    R = "Ridgway, Color Standards and Color Nomenclature",
    M = "Maerz and Paul, Dictionary of Color, 1st ed.",
    Centroid = "NBS/ISCC Centroids",
  }