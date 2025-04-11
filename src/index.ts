import { toMS } from './toMS';
import {
    toDuration
} from './toDuration';

import {
    CompactUnit,
    Option
} from '@types';

interface FlexOptions {
    isLeapYear?: boolean,
    returnAllUnits?: boolean,
    compactUnits?: boolean
}

function isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
};

function AdvancedMS(value: string, option?: { isLeapYear?: boolean }): number;
function AdvancedMS(value: number, option?: FlexOptions): string;
function AdvancedMS(
    value: number,
    option: FlexOptions & { avoidUnits: Array<CompactUnit>; staticUnits?: boolean }
): string;
function AdvancedMS(
    value: string | number,
    option?: Option
): string | number {
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