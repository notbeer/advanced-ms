import { CompactUnit, Option } from "./option";

declare module 'advanced-ms' {
    /**
     * Converts a given string or number value into either milliseconds or a human-readable duration.
     * 
     * @param value - The input value to convert. Can be a string (e.g., `"2h 30m"`) or a number (milliseconds).
     * @param option - Optional configuration options for conversion.
     * @returns {string | number} - Returns milliseconds if the input is a duration string, 
     *                              or a formatted string if the input is a number (milliseconds).
     * @throws {Error} If the input is neither a valid number nor a properly formatted duration string.
     */
    export function AdvancedMS(value: string | number, option?: Option): string | number;
};

export { CompactUnit, Option };