"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMS = toMS;
/**
 * Convert Durations to milliseconds
 * @param {string} value The string time value
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 * @returns {number}
 *
* @throws {Error} If the input is NOT a valid string.
 */
function toMS(value, option = {}) {
    const number = Number(value.replace(/[^-.0-9]+/g, '')), noSpaceValue = value.replace(/\s+/g, '');
    const yearMs = option.isLeapYear ? 31622400000 : 31536000000;
    if (/\d+(?=y)/i.test(noSpaceValue))
        return number * yearMs;
    else if (/\d+(?=ms|milliseconds?)/i.test(noSpaceValue))
        return number;
    else if (/\d+(?=mo|months?)/i.test(noSpaceValue))
        return number * (yearMs / 12);
    else if (/\d+(?=w)/i.test(noSpaceValue))
        return number * 604800000;
    else if (/\d+(?=d)/i.test(noSpaceValue))
        return number * 86400000;
    else if (/\d+(?=h)/i.test(noSpaceValue))
        return number * 3600000;
    else if (/\d+(?=m)/i.test(noSpaceValue))
        return number * 60000;
    else if (/\d+(?=s)/i.test(noSpaceValue))
        return number * 1000;
    throw new Error(`Something went wrong while converting value "${value}" with function toMS()`);
}
;
