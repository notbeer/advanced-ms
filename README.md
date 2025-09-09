
<h1 align="center">
  Advanced MS
</h1>

<h4 align="center">AdvancedMS is a lightweight TypeScript/JavaScript utility for converting between human-readable time durations and milliseconds.</h4>

<p align="center">
    <img src="https://img.shields.io/npm/v/advanced-ms" alt="NPM Version">
    <img src="https://img.shields.io/npm/dt/advanced-ms" alt="NPM Downloads">
    <img src="https://img.shields.io/github/license/notbeer/advanced-ms" alt="License">
    <img src="https://img.shields.io/codecov/c/github/notbeer/advanced-ms" alt="Coverage">
    <img src="https://img.shields.io/github/last-commit/notbeer/advanced-ms" alt="Last Commit">
    <img src="https://img.shields.io/node/v/advanced-ms" alt="Node Version">
    <img src="https://img.shields.io/badge/TS-5.9-blue" alt="TypeScript Version">
    <img src="https://img.shields.io/github/issues/notbeer/advanced-ms" alt="Issues">
    <img src="https://img.shields.io/github/issues-pr/notbeer/advanced-ms" alt="Pull Requests">
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

## Key Features

✨ Features

* 🔄 Bidirectional conversion
    * `"1h 30m"` → `5400000`
    * `5400000` → `"1 hour, 30 minutes"`

* 📏 Supports all major time units in short, long and plurals
    * years (`y`), months (`mo`), weeks (`w`), days (`d`), hours (`h`), minutes (`m`), seconds (`s`), milliseconds (`ms`)

* 📅 Leap year support (`isLeapYear`)

* 🪶 Formatting options
    * `compactUnits` → `"1d 1h 1m 1s"`
    * `returnAllUnits` → `"0 year, 0 month, …"`
    * `skipUnits` → Exclude certain units from output
    * `staticUnits` → Works only when `skipUnits` is set. Decides how skipped units behave:

* ➖ Negative duration support

* 🧪 Extensive test coverage (handles edge cases, invalid input, etc.)

## Installation
---

```bash
npm install advanced-ms
```

### or

```bash
yarn add advanced-ms
```

## How To Use
---

### Import

```ts
import AdvancedMS from "advanced-ms";
```

#### Convert string → milliseconds

```ts
AdvancedMS("1h");         // 3600000
AdvancedMS("2d 3h 15m");  // 184500000
AdvancedMS("1y 2mo");     // 36792000000
AdvancedMS("1000");       // 1000 (plain number strings are parsed)
AdvancedMS("1.5h");       // 5400000
```

#### Supports negatives and spaces

```ts
AdvancedMS("-1d");        // -86400000
AdvancedMS("-2h -30m");   // -9000000
AdvancedMS(" 2h -30m ");    // 5400000
```

#### Convert milliseconds → formatted string

```ts
AdvancedMS(3600000);         // "1 hour"
AdvancedMS(31536000000);     // "1 year"
AdvancedMS(90061000);        // "1 day, 1 hour, 1 minute, 1 second"
```

### Options

---

**`isLeapYear: boolean`**
* Determines whether a year should be treated as a leap year (366 days) instead of a normal year (365 days). This only affects conversions involving months or years.  
  - **Default:** `false`
```ts
// Normal year (365 days)
AdvancedMS(31536000000, { isLeapYear: false }); // "1 year"

// Leap year (366 days)
AdvancedMS(31622400000, { isLeapYear: true }); // "1 year"

// Example with months
AdvancedMS("1mo", { isLeapYear: true });  // 31622400000 / 12
AdvancedMS("1mo", { isLeapYear: false }); // 31536000000 / 12
```

**`returnAllUnits: boolean`**
* If true, lists all units, including those with a value of 0.
  - **Default**: `false` (only non-zero units are shown)
```ts
// Only non-zero units
AdvancedMS(90061000, { returnAllUnits: false }); // "1 day, 1 hour, 1 minute, 1 second"

// All units, including zeros
AdvancedMS(90061000, { returnAllUnits: true }); // "0 year, 0 month, 0 week, 1 day, 1 hour, 1 minute, 1 second, 0 millisecond"
```

**`compactUnits: boolean`**
* Controls the output style of the duration string:
  - **Default**: `false` (Full words, e.g., "2 hours, 30 minutes")
```ts
// Expanded (default)
AdvancedMS(90061000, { compactUnits: false }); // "1 day, 1 hour, 1 minute, 1 second"

// Compact
AdvancedMS(90061000, { compactUnits: true }); // "1d 1h 1m 1s"
```

**`skipUnits: Array<CompactUnit>`**
* Specifies which units to exclude from the output. Units can be: `'y' | 'mo' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'`
  - **Default**: `false`
```ts
// Default 
AdvancedMS(90061000, { skipUnits: [] }); // "1 day, 1 hour, 1 minute, 1 second"

// Roll skipped units into smaller units
AdvancedMS(90061000, { skipUnits: ['h', 'm'] }); // "1 day, 3661 seconds"
```

**`lockUnits: boolean`**
* Used only with skipUnits. Determines how skipped units behave:
  - **Default**: `false` (Skipped unit values roll down to smaller units.)
  - `true` (Skipped units value does NOT add onto smaller units.)
```ts
// Normal behavior (skipped units roll down)
AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: false }); // "1 day, 3661 seconds"

// Ignore skipped units entirely
AdvancedMS(90061000, { skipUnits: ['h', 'm'], lockUnits: true }); // "1 day, 1 second"
```

### ⚠️ Error Handling
---
Throws clear errors on invalid input:
```ts
AdvancedMS("");          // ❌ Error: Value is not a valid string
AdvancedMS("1x");        // ❌ Error: Value is not a valid string
AdvancedMS({} as any);   // ❌ Error: Value is not a valid string nor number
```

## Contributors
---
<a href="https://github.com/notbeer/advanced-ms/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=notbeer/advanced-ms" alt="contrib.rocks image" />
</a>

## License

[GPL-3.0](LICENSE)