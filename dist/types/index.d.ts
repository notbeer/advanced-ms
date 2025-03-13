import { CompactUnit } from '@types';
interface FlexOptions {
    isLeapYear?: boolean;
    returnAllUnits?: boolean;
    compactDuration?: boolean;
}
declare function AdvancedMS(value: string, option?: {
    isLeapYear?: boolean;
}): number;
declare function AdvancedMS(value: number, option?: FlexOptions): string;
declare function AdvancedMS(value: number, option: FlexOptions & {
    avoidUnits: Array<CompactUnit>;
    staticUnits?: boolean;
}): string;
export default AdvancedMS;
