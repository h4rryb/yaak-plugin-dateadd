# Yaak DateAdd Plugin

A Yaak template function plugin that allows you to manipulate dates by adding days, months, or years to the current date and formatting the output.

## Features

- Add or subtract days, months, and years from the current date
- Support for negative values to subtract time periods
- Flexible date formatting with common format tokens
- Simple and intuitive interface

## Installation

### Option 1: Manual Installation (Development)

1. Install the Yaak CLI:
```bash
npm install -g @yaakapp/cli
```

2. Clone or create the plugin directory:
```bash
mkdir yaak-plugin-dateadd
cd yaak-plugin-dateadd
```

3. Copy the plugin files (`package.json`, `tsconfig.json`, and `src/index.ts`) to this directory

4. Install dependencies:
```bash
npm install
```

5. Build the plugin:
```bash
npm run build
```

6. Install the plugin in Yaak:
   - Open Yaak
   - Go to Settings > Plugins
   - Click "Install from folder"
   - Select the plugin directory

### Option 2: Development Mode

For active development, use the dev command to watch for changes:
```bash
npm run dev
```

## Usage

Once installed, you can use the `dateAdd` template function in your Yaak requests:

### Basic Usage

```
${[ dateAdd() ]}
```
Returns the current date in `YYYY-MM-DD` format.

### Add Days

```
${[ dateAdd(7) ]}
```
Returns the date 7 days from now.

### Add Months

```
${[ dateAdd(0, 3) ]}
```
Returns the date 3 months from now.

### Add Years

```
${[ dateAdd(0, 0, 1) ]}
```
Returns the date 1 year from now.

### Subtract Time

```
${[ dateAdd(-7, -1, 0) ]}
```
Returns the date 7 days and 1 month ago.

### Custom Format

```
${[ dateAdd(0, 0, 0, 'DD/MM/YYYY') ]}
```
Returns today's date in `DD/MM/YYYY` format.

### Complex Example

```
${[ dateAdd(15, 2, 1, 'MMMM D, YYYY') ]}
```
Returns the date 15 days, 2 months, and 1 year from now, formatted as "January 15, 2026".

## Format Tokens

The plugin supports the following format tokens:

| Token | Description | Example |
|-------|-------------|---------|
| `YYYY` | 4-digit year | 2025 |
| `YY` | 2-digit year | 25 |
| `MMMM` | Full month name | January |
| `MMM` | Short month name | Jan |
| `MM` | 2-digit month | 01 |
| `M` | Month number | 1 |
| `DD` | 2-digit day | 05 |
| `D` | Day number | 5 |
| `dddd` | Full day name | Monday |
| `ddd` | Short day name | Mon |
| `dd` | Min day name | Mo |
| `d` | Day of week (0-6) | 1 |
| `HH` | 24-hour (2-digit) | 13 |
| `H` | 24-hour | 13 |
| `hh` | 12-hour (2-digit) | 01 |
| `h` | 12-hour | 1 |
| `mm` | 2-digit minutes | 05 |
| `m` | Minutes | 5 |
| `ss` | 2-digit seconds | 09 |
| `s` | Seconds | 9 |
| `SSS` | Milliseconds | 123 |
| `A` | AM/PM uppercase | PM |
| `a` | am/pm lowercase | pm |
| `Z` | Timezone offset | +01:00 |
| `ZZ` | Timezone offset (no colon) | +0100 |
| `X` | Unix timestamp (seconds) | 1735000000 |
| `x` | Unix timestamp (milliseconds) | 1735000000000 |

## Common Format Examples

| Format | Example Output |
|--------|----------------|
| `YYYY-MM-DD` | 2025-01-15 |
| `DD/MM/YYYY` | 15/01/2025 |
| `MM/DD/YYYY` | 01/15/2025 |
| `MMMM D, YYYY` | January 15, 2025 |
| `dddd, MMMM D, YYYY` | Wednesday, January 15, 2025 |
| `YYYY-MM-DD HH:mm:ss` | 2025-01-15 14:30:45 |
| `DD MMM YYYY HH:mm` | 15 Jan 2025 14:30 |
| `YYYY-MM-DDTHH:mm:ssZ` | 2025-01-15T14:30:45+01:00 |
| `X` | 1735000000 (Unix timestamp) |

## Use Cases

### API Testing

- Generate dynamic expiration dates for tokens
- Create date ranges for queries
- Test date validation with future/past dates

### Example: Authorization Header with Expiry

```json
{
  "Authorization": "Bearer token",
  "Expires": "${[ dateAdd(7, 0, 0, 'YYYY-MM-DDTHH:mm:ssZ') ]}"
}
```

### Example: Query Past Date Range

```
GET /api/reports?start_date=${[ dateAdd(-30) ]}&end_date=${[ dateAdd(0) ]}
```

### Example: Future Appointment Booking

```json
{
  "appointment_date": "${[ dateAdd(14, 0, 0, 'YYYY-MM-DD') ]}",
  "follow_up_date": "${[ dateAdd(44, 0, 0, 'YYYY-MM-DD') ]}"
}
```

## Development

### Project Structure

```
yaak-plugin-dateadd/
├── src/
│   └── index.ts          # Plugin source code
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## Comparison with Insomnia DateAdd

This plugin is inspired by the [DateAdd plugin for Insomnia](https://github.com/SebBrookfield/DateAdd) by SebBrookfield. It provides similar functionality for Yaak users:

- Same parameter structure (days, months, years, format)
- Support for negative values
- Compatible format tokens (no external dependencies like moment.js)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [Yaak Plugin Documentation](https://yaak.app/documentation)

## Credits

- Inspired by [SebBrookfield/DateAdd](https://github.com/SebBrookfield/DateAdd) for Insomnia
- Built for [Yaak API Client](https://yaak.app)
