import { Option } from "@types";
/**
 * Converts a given number of milliseconds into a human-readable duration format.
 *
 * @param value - The number of milliseconds to convert.
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 *   - `returnAllUnits` (optional) - A boolean to specify whether to include all units, even those with a value of 0 (default is false).
 *   - `compactDuration` (optional) - A boolean to specify whether to return the duration in a compact format (e.g., `2h 30m` instead of `2 hours, 30 minutes`) (default is false).
 *   - `avoidUnits` (optional) - An array of time formats to exclude from the result (e.g., `['y', 'mo']`).
 *   - `staticUnits` (optional) - A boolean to specify whether to use static units. Can only be used with option `avoidUnits`. If true, it will return formatted time depending on what units were avoided. (default is false).
 * @returns A string representing the duration formatted according to the options provided.
 *
 * @throws {Error} If the input is NOT a valid number.
 */
export declare function toDuration(value: number, option?: Option): string;
