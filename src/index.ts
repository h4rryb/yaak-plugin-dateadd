import type { PluginDefinition } from '@yaakapp/api';

export const plugin: PluginDefinition = {
  templateFunctions: [
    {
      name: 'dateAdd',
      description: 'Add days, months, years, hours, minutes, or seconds to a date and format the output',
      args: [
        {
          type: 'text',
          name: 'dateTime',
          label: 'Base Date/Time (optional)',
          placeholder: 'Leave empty for current date/time',
        },
        {
          type: 'text',
          name: 'years',
          label: 'Years',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'months',
          label: 'Months',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'days',
          label: 'Days',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'hours',
          label: 'Hours',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'minutes',
          label: 'Minutes',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'seconds',
          label: 'Seconds',
          placeholder: '0',
        },
        {
          type: 'text',
          name: 'format',
          label: 'Format',
          placeholder: 'YYYY-MM-DD HH:mm:ss',
        },
      ],
      async onRender(_ctx, args): Promise<string> {
        // Parse the base date/time
        let date: Date;
        const baseDateTimeStr = args.values.dateTime?.trim();
        
        if (baseDateTimeStr) {
          // Try to parse the provided date/time
          const parsedDate = new Date(baseDateTimeStr);
          if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date/time format: "${baseDateTimeStr}". Please use ISO 8601 format or a valid date string.`);
          }
          date = parsedDate;
        } else {
          // Use current date/time
          date = new Date();
        }

        // Parse all the adjustment values
        const years = Number(args.values.years) || 0;
        const months = Number(args.values.months) || 0;
        const days = Number(args.values.days) || 0;
        const hours = Number(args.values.hours) || 0;
        const minutes = Number(args.values.minutes) || 0;
        const seconds = Number(args.values.seconds) || 0;

        // Add the specified time periods
        date.setFullYear(date.getFullYear() + years);
        date.setMonth(date.getMonth() + months);
        date.setDate(date.getDate() + days);
        date.setHours(date.getHours() + hours);
        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() + seconds);

        // Default format based on whether time components were adjusted
        let format = args.values.format;
        if (!format) {
          format = (hours !== 0 || minutes !== 0 || seconds !== 0 || baseDateTimeStr)
            ? 'YYYY-MM-DD HH:mm:ss'
            : 'YYYY-MM-DD';
        }

        // Format the date according to the specified format string
        return formatDate(date, format);
      },
    },
  ],
};

/**
 * Format a date according to a format string
 * Supports common date format tokens similar to moment.js
 */
function formatDate(date: Date, format: string): string {
  const tokens: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MMMM: getMonthName(date.getMonth()),
    MMM: getMonthName(date.getMonth()).slice(0, 3),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    M: String(date.getMonth() + 1),
    DD: String(date.getDate()).padStart(2, '0'),
    D: String(date.getDate()),
    dddd: getDayName(date.getDay()),
    ddd: getDayName(date.getDay()).slice(0, 3),
    dd: getDayName(date.getDay()).slice(0, 2),
    d: String(date.getDay()),
    HH: String(date.getHours()).padStart(2, '0'),
    H: String(date.getHours()),
    hh: String(date.getHours() % 12 || 12).padStart(2, '0'),
    h: String(date.getHours() % 12 || 12),
    mm: String(date.getMinutes()).padStart(2, '0'),
    m: String(date.getMinutes()),
    ss: String(date.getSeconds()).padStart(2, '0'),
    s: String(date.getSeconds()),
    SSS: String(date.getMilliseconds()).padStart(3, '0'),
    A: date.getHours() >= 12 ? 'PM' : 'AM',
    a: date.getHours() >= 12 ? 'pm' : 'am',
    Z: getTimezoneOffset(date),
    ZZ: getTimezoneOffset(date).replace(':', ''),
    X: Math.floor(date.getTime() / 1000).toString(),
    x: date.getTime().toString(),
  };

  // Replace tokens in the format string
  let result = format;
  // Sort tokens by length (descending) to match longer tokens first
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);
  
  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, 'g'), tokens[token]);
  }

  return result;
}

function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

function getDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
}

function getTimezoneOffset(date: Date): string {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
}