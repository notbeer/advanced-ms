/**
 * Gets leap year in milliseconds
 * @param {boolean=} isLeapYear 
 * @returns {number}
 */
export const getYearMs = (isLeapYear?: boolean): number => isLeapYear ? 31622400000 : 31536000000;