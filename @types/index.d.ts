import { CompactUnit, Option } from "./option";

declare module 'advanced-ms' {
    /**
     * Converts a given string or number value into either milliseconds or a human-readable duration.
     * 
     * @param {string | number} value - The input value to convert. Can be a string (e.g., `"2h 30m"`) or a number (milliseconds).
     * @param {Option} option - An optional object containing various configuration options:
     *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
     *   - `returnAllUnits` (optional) - A boolean to specify whether to include all units, even those with a value of 0 (default is false).
     *   - `compactDuration` (optional) - A boolean to specify whether to return the duration in a compact format (e.g., `2h 30m` instead of `2 hours, 30 minutes`) (default is false).
     *   - `avoidUnits` (optional) - An array of time formats to exclude from the result (e.g., `['y', 'mo']`).
     *   - `staticUnits` (optional) - A boolean to specify whether to use static units. Can only be used with option `avoidUnits`. If true, it will return formatted time depending on what units were avoided. (default is false).
     * @returns {string | number} - Returns milliseconds if the input is a duration string, 
     *                              or a formatted string if the input is a number (milliseconds).
     * @throws {Error} If the input is neither a valid number nor a properly formatted duration string.
     */
    export function AdvancedMS(value: string | number, option?: Option): string | number;
};

export { CompactUnit, Option };