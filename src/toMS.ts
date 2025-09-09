import { getYearMs } from "./constants";

/**
 * Options for controlling how `AdvancedMS` converts to milliseconds.
 */
export interface ToMSOption {
    /**
     * Treats the year as a leap year (366 days) instead of a normal year (365 days).
     * This only matters when converting large values (months or years).
     *
     * - Default: `false`
     *
     * @example
     * AdvancedMS("1y 2mo", { isLeapYear: false }) // 36792000000
     * AdvancedMS("1y 2mo", { isLeapYear: true }); // 36892800000
     */
    isLeapYear?: boolean;
}

/**
 * Convert Durations to milliseconds
 * @param {string} value The string time value
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 * @returns {number}
 * 
* @throws {Error} If the input is NOT a valid string.
 */
export function toMS(
    value: string,
    option: ToMSOption = {}
): number {
    const {
        isLeapYear
    } = option;

    const number = Number(value.replace(/[^-.0-9]+/g, '')), noSpaceValue = value.replace(/\s+/g, '');

    const yearMs = getYearMs(isLeapYear);

    if(/\d+(?=y)/i.test(noSpaceValue)) return number * yearMs;
    else if(/\d+(?=ms|milliseconds?)/i.test(noSpaceValue)) return number;
    else if(/\d+(?=mo|months?)/i.test(noSpaceValue)) return number * (yearMs / 12);
    else if(/\d+(?=w)/i.test(noSpaceValue)) return number * 604800000;
    else if(/\d+(?=d)/i.test(noSpaceValue)) return number * 86400000;
    else if(/\d+(?=h)/i.test(noSpaceValue)) return number * 3600000;
    else if(/\d+(?=m)/i.test(noSpaceValue)) return number * 60000;
    else if(/\d+(?=s)/i.test(noSpaceValue)) return number * 1000;

    throw new Error(`Something went wrong while converting value "${value}" with function toMS()`);
};