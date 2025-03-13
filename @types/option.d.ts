export type CompactUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'mo' | 'y';

/**
 * Interface for options to customize the `toDuration` function behavior.
 */
export interface Option {
    /**
     * Whether to use a leap year when calculating (default is false).
     */
    isLeapYear?: boolean;
    
    /**
     * Whether to return all units in the result, even if some of them have a value of 0 (default is false).
     */
    returnAllUnits?: boolean;
    
    /**
     * Whether to return the duration in a compact format (e.g., `2h 30m` instead of `2 hours, 30 minutes`).
     * Default is false.
     */
    compactDuration?: boolean;
    
    /**
     * A list of unit short names (e.g., `'y'`, `'mo'`, `'w'`) to exclude from the result.
     * Default is undefined, meaning no units are avoided.
     */
    avoidUnits?: Array<CompactUnit>;
    
    /**
     * Can only be used with option `avoidUnits`. If true, it will return formatted time depending on what units were avoided.
     * when iterating over time units (default is false).
     */
    staticUnits?: boolean;
};