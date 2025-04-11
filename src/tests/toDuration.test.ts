import { toDuration } from '../toDuration';

describe('toDuration Function', () => {

    test('should convert milliseconds to a human-readable format', () => {
        expect(toDuration(86400000)).toBe('1 day');
        expect(toDuration(3600000)).toBe('1 hour');
        expect(toDuration(60000)).toBe('1 minute');
        expect(toDuration(1000)).toBe('1 second');
    });

    test('should return compact duration when compactDuration is true', () => {
        expect(toDuration(90061000, { compactUnits: true })).toBe('1d 1h 1m 1s');
    });

    test('should return multiple units when returnAllUnits is true, even if time is "0"', () => {
        expect(toDuration(90061000, { returnAllUnits: true })).toBe('0 year, 0 month, 0 week, 1 day, 1 hour, 1 minute, 1 second, 0 millisecond');
    });

    test('should return compact duration when compactDuration is true', () => {
        expect(toDuration(90061000)).toBe('1 day, 1 hour, 1 minute, 1 second');
    });
    test('should return static units when staticUnits is true', () => {
        expect(toDuration(90061000, { staticUnits: true })).toBe('1 day, 1 hour, 1 minute, 1 second');
    });
    test('should exclude specified units when avoidUnits is set', () => {
        expect(toDuration(90061000, { avoidUnits: ['h', 'm'] })).toBe('1 day, 3661 seconds');
    });
    test('should return static numbers when staticUnits is set with avoidUnits', () => {
        expect(toDuration(90061000, { avoidUnits: ['h', 'm'], staticUnits: true })).toBe('1 day, 1 second');
    });

    test('should handle leap years correctly', () => {
        expect(toDuration(36892800000, { isLeapYear: true, compactUnits: true })).toBe('1y 2mo')
        expect(toDuration(36792000000, { compactUnits: true })).toBe('1y 2mo')
        
        expect(toDuration(31536000000, { isLeapYear: false })).toBe('1 year');
        expect(toDuration(31622400000, { isLeapYear: true })).toBe('1 year');

        expect(toDuration(31536000000, { isLeapYear: false })).toBe('1 year');
        expect(toDuration(31622400000, { isLeapYear: true, returnAllUnits: true })).toBe("1 year, 0 month, 0 week, 0 day, 0 hour, 0 minute, 0 second, 0 millisecond");
    });

    test('should handle negative values', () => {
        expect(toDuration(-86400000)).toBe('-1 day');
        expect(toDuration(-3600000)).toBe('-1 hour');
    });

    test('should return "0" for zero millisecond', () => {
        expect(toDuration(0)).toBe('0');
    });

    test('should handle small values correctly', () => {
        expect(toDuration(1)).toBe('1 millisecond');
        expect(toDuration(999)).toBe('999 milliseconds');
    });

    test('should handle plurals correctly', () => {
        expect(toDuration(60000)).toBe('1 minute');
        expect(toDuration(120000)).toBe('2 minutes');

        expect(toDuration(60000, { compactUnits: true })).toBe('1m');
        expect(toDuration(120000, { compactUnits: true })).toBe('2m');
    });

    test('should not round up values incorrectly', () => {
        expect(toDuration(59999, { avoidUnits: ['ms'] })).toBe('59 seconds'); // Should not become 1 minute
    });

    test('should handle large durations correctly', () => {
        expect(toDuration(31536000000 * 2)).toBe('2 years');
        expect(toDuration(31622400000 * 2, { isLeapYear: true })).toBe('2 years');
    });

    test('should return "0" when all units are avoided', () => {
        expect(toDuration(90061000, { avoidUnits: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms'] })).toBe('0');
    });

    test('should handle invalid inputs gracefully', () => {
        expect(() => toDuration(NaN)).toThrow();
        expect(() => toDuration(undefined as any)).toThrow();
        expect(() => toDuration(null as any)).toThrow();
        expect(() => toDuration("1234" as any)).toThrow();
    });
});
