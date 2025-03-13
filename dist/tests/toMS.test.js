"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toMS_1 = require("../toMS");
describe('toMS Function', () => {
    test('should convert different time units correctly', () => {
        expect((0, toMS_1.toMS)('1y')).toBe(31536000000);
        expect((0, toMS_1.toMS)('1mo')).toBe(2628000000);
        expect((0, toMS_1.toMS)('1w')).toBe(604800000);
        expect((0, toMS_1.toMS)('1d')).toBe(86400000);
        expect((0, toMS_1.toMS)('1h')).toBe(3600000);
        expect((0, toMS_1.toMS)('1m')).toBe(60000);
        expect((0, toMS_1.toMS)('1s')).toBe(1000);
        expect((0, toMS_1.toMS)('1ms')).toBe(1);
    });
    test('should handle leap years correctly', () => {
        expect((0, toMS_1.toMS)('1y', { isLeapYear: true })).toBe(31622400000);
        expect((0, toMS_1.toMS)('1y', { isLeapYear: false })).toBe(31536000000);
    });
    test('should handle leap year and non-leap year with months', () => {
        expect((0, toMS_1.toMS)('1mo', { isLeapYear: true })).toBe(2635200000);
        expect((0, toMS_1.toMS)('1mo', { isLeapYear: false })).toBe(2628000000);
    });
    test('should handle large leap year durations', () => {
        expect((0, toMS_1.toMS)('10y', { isLeapYear: true })).toBe(316224000000);
        expect((0, toMS_1.toMS)('10y', { isLeapYear: false })).toBe(315360000000);
    });
    test('should handle decimal values correctly', () => {
        expect((0, toMS_1.toMS)('0.5d')).toBe(43200000); // Half a day
        expect((0, toMS_1.toMS)('1.5h')).toBe(5400000); // 1 hour 30 min
        expect((0, toMS_1.toMS)('2.75m')).toBe(165000); // 2 minutes 45 sec
    });
    test('should handle large values correctly', () => {
        expect((0, toMS_1.toMS)('100y')).toBe(3153600000000);
        expect((0, toMS_1.toMS)('1000d')).toBe(86400000000);
        expect((0, toMS_1.toMS)('50000h')).toBe(180000000000);
    });
    test('should handle multiple values correctly', () => {
        expect((0, toMS_1.toMS)('2d')).toBe(172800000);
        expect((0, toMS_1.toMS)('3h')).toBe(10800000);
        expect((0, toMS_1.toMS)('45m')).toBe(2700000);
        expect((0, toMS_1.toMS)('10s')).toBe(10000);
        expect((0, toMS_1.toMS)('500ms')).toBe(500);
    });
    test('should handle spaces and variations in formatting', () => {
        expect((0, toMS_1.toMS)(' 2 d ')).toBe(172800000); // Spaces around
        expect((0, toMS_1.toMS)('3hours')).toBe(10800000); // Full word "hours"
        expect((0, toMS_1.toMS)('4days')).toBe(345600000); // "days" instead of "d"
        expect((0, toMS_1.toMS)('  5   min')).toBe(300000); // Multiple spaces
    });
    test('should handle negative values correctly', () => {
        expect((0, toMS_1.toMS)('-2d')).toBe(-172800000);
        expect((0, toMS_1.toMS)('-3h')).toBe(-10800000);
        expect((0, toMS_1.toMS)('-45m')).toBe(-2700000);
        expect((0, toMS_1.toMS)('-10s')).toBe(-10000);
        expect((0, toMS_1.toMS)('-500ms')).toBe(-500);
    });
    test('should throw an error for invalid inputs', () => {
        expect(() => (0, toMS_1.toMS)('abc')).toThrow();
        expect(() => (0, toMS_1.toMS)('')).toThrow();
        expect(() => (0, toMS_1.toMS)('5xyz')).toThrow();
        expect(() => (0, toMS_1.toMS)('no time')).toThrow();
        expect(() => (0, toMS_1.toMS)('999')).toThrow();
    });
});
