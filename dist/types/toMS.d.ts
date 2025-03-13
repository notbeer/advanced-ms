/**
 * Convert Durations to milliseconds
 * @param {string} value The string time value
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 * @returns {number}
 *
* @throws {Error} If the input is NOT a valid string.
 */
export declare function toMS(value: string, option?: {
    isLeapYear?: boolean;
}): number;
