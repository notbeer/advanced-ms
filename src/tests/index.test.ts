import AdvancedMS from '../index';

describe('AdvancedMS Function', () => {

    test('should return a number when given a valid string duration', () => {
        expect(AdvancedMS('1h')).toBe(3600000);
        expect(AdvancedMS('2d')).toBe(172800000);
        expect(AdvancedMS('3w')).toBe(1814400000);
        expect(AdvancedMS('5mo')).toBe(13140000000);
    });

    test('should return milliseconds for a plain number string', () => {
        expect(AdvancedMS('1000')).toBe(1000);
        expect(AdvancedMS('86400000')).toBe(86400000);
    });

    test('should handle multiple duration units', () => {
        expect(AdvancedMS('1h 30m')).toBe(5400000);
        expect(AdvancedMS('2d 3h 15m')).toBe(184500000);
        expect(AdvancedMS('1y 2mo')).toBe(36792000000);
    });

    test('should handle large numbers', () => {
        expect(AdvancedMS('1000y')).toBe(31536000000000);
    });

    test('should return proper formatting when given large durations', () => {
        expect(AdvancedMS(31536000000 * 3)).toBe('3 years');
        expect(AdvancedMS(31622400000 * 3, { isLeapYear: true })).toBe('3 years');
    });

    test('should calculate months correctly with leap years', () => {
        expect(AdvancedMS('1mo', { isLeapYear: true })).toBe(31622400000 / 12);
        expect(AdvancedMS('1mo', { isLeapYear: false })).toBe(31536000000 / 12);
    });
    
    test('should handle leap years in complex durations', () => {
        expect(AdvancedMS('1y 2mo', { isLeapYear: true })).toBe(31622400000 + (2 * 31622400000 / 12));
        expect(AdvancedMS('1y 2mo', { isLeapYear: false })).toBe(31536000000 + (2 * 31536000000 / 12));
    });

    test('should handle leap year calculations correctly', () => {
        expect(AdvancedMS('1y 2mo', { isLeapYear: true })).toBe(36892800000);
        expect(AdvancedMS('1y 2mo', { isLeapYear: false })).toBe(36792000000);
    });

    test('should handle multiple units in different order', () => {
        expect(AdvancedMS('2d 3h 5m')).toBe(183900000);
        expect(AdvancedMS('3h 2d 5m')).toBe(183900000);
    });

    test('should return formatted durations correctly when avoiding specific units', () => {
        expect(AdvancedMS(90061000, { avoidUnits: ['d', 'h'] })).toBe('1501 minutes, 1 second');
        expect(AdvancedMS(90061000, { avoidUnits: ['d', 'h', 'm'] })).toBe('90061 seconds');
        expect(AdvancedMS(90061000, { avoidUnits: ['d', 'h', 'm', 's'] })).toBe('90061000 milliseconds');
    });
    
    test('should correctly return milliseconds for very small values', () => {
        expect(AdvancedMS('1ms')).toBe(1);
        expect(AdvancedMS('500ms')).toBe(500);
        expect(AdvancedMS('999ms')).toBe(999);
    });
    
    test('should handle strings with extra spaces', () => {
        expect(AdvancedMS('  1h   30m  ')).toBe(5400000);
        expect(AdvancedMS('  2d  3h   15m ')).toBe(184500000);
    });

    test('should handle negative durations correctly', () => {
        expect(AdvancedMS('-1d')).toBe(-86400000);
        expect(AdvancedMS('-2h -30m')).toBe(-9000000);
        expect(AdvancedMS('-2h 30m')).toBe(-5400000);
        expect(AdvancedMS('2h -30m')).toBe(5400000);
    });

    test('should handle zero values and decimals', () => {
        expect(AdvancedMS('0s')).toBe(0);
        expect(AdvancedMS('0d 0h 0m 0s')).toBe(0);
        expect(AdvancedMS('1.5h')).toBe(5400000);
    });

    test('should return all durations on returnAllUnits', () => {
        expect(AdvancedMS(90061000, { returnAllUnits: true })).toBe('0 year, 0 month, 0 week, 1 day, 1 hour, 1 minute, 1 second, 0 millisecond');
    });

    test('should return a formatted duration when given a number', () => {
        expect(AdvancedMS(3600000)).toBe('1 hour');
        expect(AdvancedMS(31536000000)).toBe('1 year');
    });

    test('should return correct duration when avoidUnits is applied', () => {
        expect(AdvancedMS(90061000)).toBe('1 day, 1 hour, 1 minute, 1 second');
        expect(AdvancedMS(90061000, { avoidUnits: ['h', 'm'] })).toBe('1 day, 3661 seconds');
        expect(AdvancedMS(90061000, { avoidUnits: ['h', 'm'], staticUnits: true })).toBe('1 day, 1 second');
    });

    test('should handle compactDuration correctly', () => {
        expect(AdvancedMS(90061000, { compactUnits: true })).toBe('1d 1h 1m 1s');
    });
    
    test('should return "0" when all units are avoided', () => {
        expect(AdvancedMS(90061000, { avoidUnits: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms'] })).toBe('0');
    });

    test('should correctly convert a string number to a number', () => {
        expect(AdvancedMS('5000')).toBe(5000);
        expect(AdvancedMS('10000')).toBe(10000);
    });

    test('should return zero for zero-millisecond input', () => {
        expect(AdvancedMS(0)).toBe('0');
    });

    test('should return zero for empty string input', () => {
        expect(() => AdvancedMS('')).toThrow('Value is not a valid string');
    });
    test('should throw an error for invalid duration units', () => {
        expect(() => AdvancedMS('1x')).toThrow('Value is not a valid string');
        expect(() => AdvancedMS('2foo 3bar')).toThrow('Value is not a valid string');
    });
    
    test('should throw an error for invalid string input', () => {
        expect(() => AdvancedMS('invalid input')).toThrow('Value is not a valid string');
        expect(() => AdvancedMS('xyz123')).toThrow('Value is not a valid string');
    });
    test('should throw an error for invalid input types', () => {
        expect(() => AdvancedMS({} as any)).toThrow('Value is not a valid string nor number');
        expect(() => AdvancedMS([] as any)).toThrow('Value is not a valid string nor number');
        expect(() => AdvancedMS(null as any)).toThrow('Value is not a valid string nor number');
        expect(() => AdvancedMS(undefined as any)).toThrow('Value is not a valid string nor number');
    });

});