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
export function toDuration(
    value: number,
    option: Option = {}
): string {
    if(typeof value !== 'number' || isNaN(value)) throw new Error('Value is not a valid number.');

    const {
        isLeapYear,
        returnAllUnits,
        compactDuration,
        avoidUnits,
        staticUnits
    } = option;

    const yearMs = isLeapYear ? 31622400000 : 31536000000;
    const timeUnits: Array<any> = [
        { short: 'y', long: 'year', ms: yearMs },
        { short: 'mo', long: 'month', ms: yearMs / 12 },
        { short: 'w', long: 'week', ms: 604800000 },
        { short: 'd', long: 'day', ms: 86400000 },
        { short: 'h', long: 'hour', ms: 3600000 },
        { short: 'm', long: 'minute', ms: 60000 },
        { short: 's', long: 'second', ms: 1000 },
        { short: 'ms', long: 'millisecond', ms: 1 }
    ];
    
    const result = [];
    let remainingMs = Math.abs(value);
    
    for(const unit of timeUnits) {
        const count = Math.floor(remainingMs / unit.ms);

        if(returnAllUnits || count > 0) {
            if(staticUnits) remainingMs %= unit.ms;
            if(avoidUnits && avoidUnits.includes(unit.short)) continue;
            if(!staticUnits) remainingMs %= unit.ms;

            result.push(`${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${count}${unit.short}` : `${count} ${unit.long}${count > 1 ? 's' : ''}`}`)
        };
    };
    
    return result.length > 0 ? result.join(compactDuration ? ' ' : ', ') : `0`;
};