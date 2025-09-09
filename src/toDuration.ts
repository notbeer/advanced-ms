import { getYearMs } from "./constants";

export type CompactUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'mo' | 'y';

/**
 * Options for controlling how `AdvancedMS` converts to human-readble time.
 *
 * Each option changes the way milliseconds are converted into human-readable units.
 * Examples are provided to illustrate how different settings affect the output.
 */
type BaseOptions = {
    /**
     * Treats the year as a leap year (366 days) instead of a normal year (365 days).
     * This only matters when converting large values (months or years).
     *
     * - Default: `false`
     *
     * @example
     * // Normal year (365 days)
     * AdvancedMS(31536000000, { isLeapYear: false }); // "1 year"
     *
     * // Leap year (366 days)
     * AdvancedMS(31622400000, { isLeapYear: true }); // "1 year"
     */
    isLeapYear?: boolean;
    
    /**
     * Forces the output to always list all time units, even if they are zero.
     * Normally, zero-valued units are omitted for brevity.
     *
     * - Default: `false`
     *
     * @example
     * AdvancedMS(90061000, { returnAllUnits: false }); // "1 day, 1 hour, 1 minute, 1 second"
     * 
     * AdvancedMS(90061000, { returnAllUnits: true }); // "0 year, 0 month, 0 week, 1 day, 1 hour, 1 minute, 1 second, 0 millisecond"
     */
    returnAllUnits?: boolean;
    
    /**
     * Chooses between "compact" and "expanded" output styles.
     *
     * - Compact: short labels (e.g., "2h 30m")
     * - Expanded: full words (e.g., "2 hours, 30 minutes")
     *
     * - Default: `false` (expanded)
     *
     * @example
     * AdvancedMS(90061000, { compactUnits: false }); // "1 day, 1 hour, 1 minute, 1 second"
     * 
     * AdvancedMS(90061000, { compactUnits: true }); // "1d 1h 1m 1s"
     */
    compactUnits?: boolean;
};

type SkipUnitsOptions = BaseOptions & {
    /**
     * Excludes specific units from the output. Any skipped unit will either:
     *   - Roll its value down into smaller units (default behavior)
     *   - Or be ignored entirely if `lockUnits` is also true
     *
     * Use the unit short codes: `'y'`, `'mo'`, `'w'`, `'d'`, `'h'`, `'m'`, `'s'`, `'ms'`.
     *
     * @example
     * // Default version
     * AdvancedMS(90061000, { skipUnits: [] }); // "1 day, 1 hour, 1 minute, 1 second"
     * 
     * // Exclude hours and minutes
     * AdvancedMS(90061000, { skipUnits: ['h', 'm'] }); // "1 day, 3661 seconds"
     */
    skipUnits: Array<CompactUnit>;
    
    /**
     * Works only when `skipUnits` is set. Decides how skipped units behave:
     *
     * - `false` (default): The value of the skipped unit is passed down to smaller units.
     *   Example: skipping hours turns "1 hour 30 minutes" into "90 minutes".
     *
     * - `true`: Skipped units are ignored entirely, and their values are discarded.
     *   Example: skipping hours turns "1 hour 30 minutes" into just "30 minutes".
     *
     * @example
     * // Normal behavior
     * AdvancedMS(90061000, { skipUnits: [], lockUnits: false }); // "1 day, 1 hour, 1 minute, 1 second"
     * 
     * // Roll over skipped unit (default)
     * AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: false }); // "1 day, 3661 seconds"
     * 
     * // Ignore skipped unit completely
     * AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: true }); // "1 day, 1 second"
     */
    lockUnits?: boolean;
}

/**
 * Options when skipUnits is NOT specified
 */
type NoSkipUnitsOptions = BaseOptions & {
    skipUnits?: undefined;
    lockUnits?: undefined;
};

/**
 * Full options type
 */
export type ToDurationOption = SkipUnitsOptions | NoSkipUnitsOptions;

/**
 * Converts a given number of milliseconds into a human-readable duration format.
 * 
 * @param value - The number of milliseconds to convert.
 * @param option - An optional object containing various configuration options:
 *   - `isLeapYear` (optional) - A boolean to specify whether to use a leap year in calculations (default is false).
 *   - `returnAllUnits` (optional) - A boolean to specify whether to include all units, even those with a value of 0 (default is false).
 *   - `compactUnits` (optional) - A boolean to specify whether to return the units in a compact format (e.g., `2h 30m` instead of `2 hours, 30 minutes`) (default is false).
 *   - `skipUnits` (optional) - An array of time formats to exclude from the result (e.g., `['y', 'mo']`).
 *   - `lockUnits` (optional) - A boolean to specify whether to use static units. Can only be used with option `skipUnits`. If true, it will return formatted time depending on what units were avoided. (default is false).
 * @returns A string representing the duration formatted according to the options provided.
 * 
 * @throws {Error} If the input is NOT a valid number.
 */
export function toDuration(
    value: number,
    option: ToDurationOption = {}
): string {
    const {
        isLeapYear,
        returnAllUnits,
        compactUnits,
        skipUnits,
        lockUnits
    } = option;

    const yearMs = getYearMs(isLeapYear);
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

        if(skipUnits?.includes(unit.short)) {
            if(!lockUnits) continue;
            else {
                remainingMs %= unit.ms; 
                continue;
            };
        };

        if(count > 0 || returnAllUnits) {
            result.push(
                `${Math.sign(value) === -1 ? '-' : ''}${compactUnits ? `${count}${unit.short}` : `${count} ${unit.long}${count > 1 ? 's' : ''}`}`
            );
            remainingMs %= unit.ms;
        };
    };
    
    return result.length > 0 ? result.join(compactUnits ? ' ' : ', ') : '0';
};