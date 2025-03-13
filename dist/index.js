"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toMS_1 = require("./toMS");
const toDuration_1 = require("./toDuration");
function isError(error) {
    return typeof error === 'object' && error !== null && 'message' in error;
}
;
function AdvancedMS(value, option) {
    try {
        if (typeof value === 'string') {
            if (/^\d+$/.test(value))
                return Number(value);
            const durations = value.match(/\s*-?\s*\d*\.?\d+\s*?(years?|yrs?|months?|mo|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|ms|[smhdwy])/gi);
            if (durations)
                return durations.reduce((a, b) => a + (0, toMS_1.toMS)(b, { isLeapYear: option === null || option === void 0 ? void 0 : option.isLeapYear }), 0);
            throw new Error('Value is not a valid string');
        }
        ;
        if (typeof value === 'number')
            return (0, toDuration_1.toDuration)(value, option);
        throw new Error('Value is not a valid string nor number');
    }
    catch (err) {
        const message = isError(err)
            ? `${err.message}. Value = ${JSON.stringify(value)}`
            : 'An unknown error has occured.';
        throw new Error(message);
    }
    ;
}
;
exports.default = AdvancedMS;
