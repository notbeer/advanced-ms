import {
    ToMSOption,
    toMS
} from './toMS';
import {
    ToDurationOption,
    toDuration
} from './toDuration';

function isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
};

/**
 * Converts a duration string (e.g., "2h 30m") into milliseconds.
 * @param {string} value The string time value
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 * @returns The total duration in milliseconds as a number.
 *
 * @example
 * AdvancedMS("1 day 1 hour 1 minute 1 second"); // 90061000
 * AdvancedMS("1y 2mo", { isLeapYear: false }) // 36792000000
 * AdvancedMS("1y 2mo", { isLeapYear: true }); // 36892800000
 */
function AdvancedMS(value: string, option?: ToMSOption): number;

/**
 * Converts a number of milliseconds into a human-readable duration string.
 *
 * @param value - The number of milliseconds to convert.
 * @param option - Optional configuration:
 *   - `isLeapYear`: If true, months and years will account for leap years.
 *   - `returnAllUnits`: Include all time units, even if zero.
 *   - `compactUnits`: Display in compact format (e.g., "2h 30m" instead of "2 hours, 30 minutes").
 *   - `skipUnits`: Array of unit short names to exclude from the output (e.g., ['h', 'm']).
 *   - `lockUnits`: Used with `skipUnits`. If true, prevents leftover milliseconds from being carried to smaller units.
 * @returns A human-readable string representing the duration.
 *
 * @example
 * AdvancedMS(90061000); // "1 day, 1 hour, 1 minute, 1 second"
 * AdvancedMS(90061000, { compactUnits: true }); // "1d 1h 1m 1s"
 * AdvancedMS(90061000, { skipUnits: ['h', 'm'] }); // "1 day, 3661 seconds"
 * AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: true }); // "1 day, 1 second"
 */
function AdvancedMS(value: number, option?: ToDurationOption): string;

/**
 * Implementation signature for AdvancedMS.
 * 
 * This function handles both string-to-milliseconds parsing and number-to-duration formatting.
 * Hidden from IntelliSense; use the overloads above for documentation.
 */
function AdvancedMS(value: string | number, option?: ToDurationOption): string | number {
    try {
        if(typeof value === 'string') {
            if(/^\d+$/.test(value)) return Number(value);

            const durations = value.match(/\s*-?\s*\d*\.?\d+\s*?(years?|yrs?|months?|mo|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|ms|[smhdwy])/gi);
            if(durations) return durations.reduce((a, b) => a + toMS(b, { isLeapYear: option?.isLeapYear }), 0);

            throw new Error('Value is not a valid string');
        };
        if(typeof value === 'number') return toDuration(value, option);

        throw new Error('Value is not a valid string nor number');
    } catch(err) {  
        const message = isError(err)
        ? `${err.message}. Value = ${JSON.stringify(value)}`
        : 'An unknown error has occured.';

        throw new Error(message);
    };
};

export default AdvancedMS;