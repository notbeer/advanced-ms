import AdvancedMS from '../src/index';

describe('AdvancedMS Function', () => {

    // ============================
    // STRING INPUT → returns number
    // ============================
    describe('String input parsing', () => {
        test('returns milliseconds for single-unit durations', () => {
            expect(AdvancedMS('1h')).toBe(3600000);
            expect(AdvancedMS('-1 hour')).toBe(-3600000);
            expect(AdvancedMS('2 day')).toBe(172800000);
            expect(AdvancedMS('3 weeks')).toBe(1814400000);
            expect(AdvancedMS('5mo')).toBe(13140000000);
        });

        test('returns milliseconds for plain numbers in string', () => {
            expect(AdvancedMS('1000')).toBe(1000);
            expect(AdvancedMS('86400000')).toBe(86400000);
        });

        test('returns millisecond format to millisecond', () => {
            expect(AdvancedMS('1000milliseconds')).toBe(1000);
            expect(AdvancedMS('1ms')).toBe(1);
        });

        test('parses multiple units in a single string', () => {
            expect(AdvancedMS('1 hours 30m')).toBe(5400000);
            expect(AdvancedMS('2d 3h 15minutes')).toBe(184500000);
            expect(AdvancedMS('1y 2months')).toBe(36792000000);
        });

        test('handles negative durations correctly', () => {
            expect(AdvancedMS('-1d')).toBe(-86400000);
            expect(AdvancedMS('-2h -30m')).toBe(-9000000);
            expect(AdvancedMS('-2h 30m')).toBe(-5400000);
            expect(AdvancedMS('2h -30m')).toBe(5400000);
        });

        test('handles zero and decimal values', () => {
            expect(AdvancedMS('0s')).toBe(0);
            expect(AdvancedMS('0d 0h 0m 0s')).toBe(0);
            expect(AdvancedMS('1.5h')).toBe(5400000);
        });

        test('handles extra spaces in input string', () => {
            expect(AdvancedMS('  1h   30m  ')).toBe(5400000);
            expect(AdvancedMS('  2d  3h   15m ')).toBe(184500000);
        });

        test('correctly calculates months and years with leap years', () => {
            expect(AdvancedMS('1mo', { isLeapYear: true })).toBe(31622400000 / 12);
            expect(AdvancedMS('1mo', { isLeapYear: false })).toBe(31536000000 / 12);
            expect(AdvancedMS('1y 2mo', { isLeapYear: true })).toBe(36892800000);
            expect(AdvancedMS('1y 2mo', { isLeapYear: false })).toBe(36792000000);
        });

        test('handles multiple units in different order', () => {
            expect(AdvancedMS('2d 3h 5m')).toBe(183900000);
            expect(AdvancedMS('3h 2d 5m')).toBe(183900000);
        });
    });

    // ============================
    // NUMBER INPUT → returns string
    // ============================
    describe('Number input formatting', () => {
        test('formats durations into human-readable strings', () => {
            expect(AdvancedMS(3600000)).toBe('1 hour');
            expect(AdvancedMS(-3600000)).toBe('-1 hour');
            expect(AdvancedMS(31536000000)).toBe('1 year');
            expect(AdvancedMS(31536000000 * 3)).toBe('3 years');
            expect(AdvancedMS(31622400000 * 3, { isLeapYear: true })).toBe('3 years');
        });

        test('handles compactUnits option', () => {
            expect(AdvancedMS(90061000, { compactUnits: true })).toBe('1d 1h 1m 1s');
        });

        test('handles returnAllUnits option', () => {
            expect(AdvancedMS(90061000, { returnAllUnits: true }))
                .toBe('0 year, 0 month, 0 week, 1 day, 1 hour, 1 minute, 1 second, 0 millisecond');
        });

        test('handles skipUnits and lockUnits options', () => {
            expect(AdvancedMS(90061000, { skipUnits: ['h', 'm'] })).toBe('1 day, 3661 seconds');
            expect(AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: true })).toBe('1 day, 1 second');
            expect(AdvancedMS(90061000, { skipUnits: ['y','mo','w','d','h','m','s','ms'] })).toBe('0');
        });
    });

    // ============================
    // STRING NUMBERS
    // ============================
    describe('String numbers', () => {
        test('returns number for numeric strings', () => {
            expect(AdvancedMS('5000')).toBe(5000);
            expect(AdvancedMS('10000')).toBe(10000);
        });
    });

    // ============================
    // EDGE CASES
    // ============================
    describe('Edge cases', () => {
        test('returns 0 for zero input', () => {
            expect(AdvancedMS(0)).toBe('0');
        });

        test('throws error for empty string', () => {
            expect(() => AdvancedMS('')).toThrow('Value is not a valid string');
        });

        test('throws error for invalid units in string', () => {
            expect(() => AdvancedMS('1x')).toThrow('Value is not a valid string');
            expect(() => AdvancedMS('2foo 3bar')).toThrow('Value is not a valid string');
        });

        test('throws error for invalid strings', () => {
            expect(() => AdvancedMS('invalid input')).toThrow('Value is not a valid string');
            expect(() => AdvancedMS('xyz123')).toThrow('Value is not a valid string');
        });

        test('throws error for invalid input types', () => {
            expect(() => AdvancedMS({} as any)).toThrow('Value is not a valid string nor number');
            expect(() => AdvancedMS([] as any)).toThrow('Value is not a valid string nor number');
            expect(() => AdvancedMS(null as any)).toThrow('Value is not a valid string nor number');
            expect(() => AdvancedMS(undefined as any)).toThrow('Value is not a valid string nor number');
        });
    });
});