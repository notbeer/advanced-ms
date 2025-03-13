"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
describe('AdvancedMS Function', () => {
    test('should return a number when given a valid string duration', () => {
        expect((0, index_1.default)('1h')).toBe(3600000);
        expect((0, index_1.default)('2d')).toBe(172800000);
        expect((0, index_1.default)('3w')).toBe(1814400000);
        expect((0, index_1.default)('5mo')).toBe(13140000000);
    });
    test('should return milliseconds for a plain number string', () => {
        expect((0, index_1.default)('1000')).toBe(1000);
        expect((0, index_1.default)('86400000')).toBe(86400000);
    });
    test('should handle multiple duration units', () => {
        expect((0, index_1.default)('1h 30m')).toBe(5400000);
        expect((0, index_1.default)('2d 3h 15m')).toBe(184500000);
        expect((0, index_1.default)('1y 2mo')).toBe(36792000000);
    });
    test('should handle large numbers', () => {
        expect((0, index_1.default)('1000y')).toBe(31536000000000);
    });
    test('should return proper formatting when given large durations', () => {
        expect((0, index_1.default)(31536000000 * 3)).toBe('3 years');
        expect((0, index_1.default)(31622400000 * 3, { isLeapYear: true })).toBe('3 years');
    });
    test('should calculate months correctly with leap years', () => {
        expect((0, index_1.default)('1mo', { isLeapYear: true })).toBe(31622400000 / 12);
        expect((0, index_1.default)('1mo', { isLeapYear: false })).toBe(31536000000 / 12);
    });
    test('should handle leap years in complex durations', () => {
        expect((0, index_1.default)('1y 2mo', { isLeapYear: true })).toBe(31622400000 + (2 * 31622400000 / 12));
        expect((0, index_1.default)('1y 2mo', { isLeapYear: false })).toBe(31536000000 + (2 * 31536000000 / 12));
    });
    test('should handle leap year calculations correctly', () => {
        expect((0, index_1.default)('1y 2mo', { isLeapYear: true })).toBe(36892800000);
        expect((0, index_1.default)('1y 2mo', { isLeapYear: false })).toBe(36792000000);
    });
    test('should handle multiple units in different order', () => {
        expect((0, index_1.default)('2d 3h 5m')).toBe(183900000);
        expect((0, index_1.default)('3h 2d 5m')).toBe(183900000);
    });
    test('should return formatted durations correctly when avoiding specific units', () => {
        expect((0, index_1.default)(90061000, { avoidUnits: ['d', 'h'] })).toBe('1501 minutes, 1 second');
        expect((0, index_1.default)(90061000, { avoidUnits: ['d', 'h', 'm'] })).toBe('90061 seconds');
        expect((0, index_1.default)(90061000, { avoidUnits: ['d', 'h', 'm', 's'] })).toBe('90061000 milliseconds');
    });
    test('should correctly return milliseconds for very small values', () => {
        expect((0, index_1.default)('1ms')).toBe(1);
        expect((0, index_1.default)('500ms')).toBe(500);
        expect((0, index_1.default)('999ms')).toBe(999);
    });
    test('should handle strings with extra spaces', () => {
        expect((0, index_1.default)('  1h   30m  ')).toBe(5400000);
        expect((0, index_1.default)('  2d  3h   15m ')).toBe(184500000);
    });
    test('should handle negative durations correctly', () => {
        expect((0, index_1.default)('-1d')).toBe(-86400000);
        expect((0, index_1.default)('-2h -30m')).toBe(-9000000);
        expect((0, index_1.default)('-2h 30m')).toBe(-5400000);
        expect((0, index_1.default)('2h -30m')).toBe(5400000);
    });
    test('should handle zero values and decimals', () => {
        expect((0, index_1.default)('0s')).toBe(0);
        expect((0, index_1.default)('0d 0h 0m 0s')).toBe(0);
        expect((0, index_1.default)('1.5h')).toBe(5400000);
    });
    test('should return a formatted duration when given a number', () => {
        expect((0, index_1.default)(3600000)).toBe('1 hour');
        expect((0, index_1.default)(31536000000)).toBe('1 year');
    });
    test('should return correct duration when avoidUnits is applied', () => {
        expect((0, index_1.default)(90061000)).toBe('1 day, 1 hour, 1 minute, 1 second');
        expect((0, index_1.default)(90061000, { avoidUnits: ['h', 'm'] })).toBe('1 day, 3661 seconds');
        expect((0, index_1.default)(90061000, { avoidUnits: ['h', 'm'], staticUnits: true })).toBe('1 day, 1 second');
    });
    test('should handle compactDuration correctly', () => {
        expect((0, index_1.default)(90061000, { compactDuration: true })).toBe('1d 1h 1m 1s');
    });
    test('should return "0" when all units are avoided', () => {
        expect((0, index_1.default)(90061000, { avoidUnits: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms'] })).toBe('0');
    });
    test('should correctly convert a string number to a number', () => {
        expect((0, index_1.default)('5000')).toBe(5000);
        expect((0, index_1.default)('10000')).toBe(10000);
    });
    test('should return zero for zero-millisecond input', () => {
        expect((0, index_1.default)(0)).toBe('0');
    });
    test('should return zero for empty string input', () => {
        expect(() => (0, index_1.default)('')).toThrow('Value is not a valid string');
    });
    test('should throw an error for invalid duration units', () => {
        expect(() => (0, index_1.default)('1x')).toThrow('Value is not a valid string');
        expect(() => (0, index_1.default)('2foo 3bar')).toThrow('Value is not a valid string');
    });
    test('should throw an error for invalid string input', () => {
        expect(() => (0, index_1.default)('invalid input')).toThrow('Value is not a valid string');
        expect(() => (0, index_1.default)('xyz123')).toThrow('Value is not a valid string');
    });
    test('should throw an error for invalid input types', () => {
        expect(() => (0, index_1.default)({})).toThrow('Value is not a valid string nor number');
        expect(() => (0, index_1.default)([])).toThrow('Value is not a valid string nor number');
        expect(() => (0, index_1.default)(null)).toThrow('Value is not a valid string nor number');
        expect(() => (0, index_1.default)(undefined)).toThrow('Value is not a valid string nor number');
    });
});
