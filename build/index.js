"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  plugin: () => plugin
});
module.exports = __toCommonJS(src_exports);
var plugin = {
  templateFunctions: [
    {
      name: "dateAdd",
      description: "Add days, months, years, hours, minutes, or seconds to a date and format the output",
      args: [
        {
          type: "text",
          name: "dateTime",
          label: "Base Date/Time (optional)",
          placeholder: "Leave empty for current date/time"
        },
        {
          type: "text",
          name: "years",
          label: "Years",
          placeholder: "0"
        },
        {
          type: "text",
          name: "months",
          label: "Months",
          placeholder: "0"
        },
        {
          type: "text",
          name: "days",
          label: "Days",
          placeholder: "0"
        },
        {
          type: "text",
          name: "hours",
          label: "Hours",
          placeholder: "0"
        },
        {
          type: "text",
          name: "minutes",
          label: "Minutes",
          placeholder: "0"
        },
        {
          type: "text",
          name: "seconds",
          label: "Seconds",
          placeholder: "0"
        },
        {
          type: "text",
          name: "format",
          label: "Format",
          placeholder: "YYYY-MM-DD HH:mm:ss"
        }
      ],
      async onRender(_ctx, args) {
        let date;
        const baseDateTimeStr = args.values.dateTime?.trim();
        if (baseDateTimeStr) {
          let parsedDate;
          const hasTimezone = /Z|[+-]\d{2}:\d{2}$|[+-]\d{4}$/.test(baseDateTimeStr);
          if (hasTimezone) {
            parsedDate = new Date(baseDateTimeStr);
          } else {
            const normalizedStr = baseDateTimeStr.replace("T", " ");
            parsedDate = new Date(normalizedStr);
          }
          if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date/time format: "${baseDateTimeStr}". Please use ISO 8601 format or a valid date string.`);
          }
          date = parsedDate;
        } else {
          date = /* @__PURE__ */ new Date();
          date = new Date(Date.now());
        }
        const years = Number(args.values.years) || 0;
        const months = Number(args.values.months) || 0;
        const days = Number(args.values.days) || 0;
        const hours = Number(args.values.hours) || 0;
        const minutes = Number(args.values.minutes) || 0;
        const seconds = Number(args.values.seconds) || 0;
        date.setFullYear(date.getFullYear() + years);
        date.setMonth(date.getMonth() + months);
        date.setDate(date.getDate() + days);
        date.setHours(date.getHours() + hours);
        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() + seconds);
        let format = args.values.format;
        if (!format) {
          format = hours !== 0 || minutes !== 0 || seconds !== 0 || baseDateTimeStr ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
        }
        return formatDate(date, format);
      }
    }
  ]
};
function formatDate(date, format) {
  const tokens = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MMMM: getMonthName(date.getMonth()),
    MMM: getMonthName(date.getMonth()).slice(0, 3),
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: String(date.getMonth() + 1),
    DD: String(date.getDate()).padStart(2, "0"),
    D: String(date.getDate()),
    dddd: getDayName(date.getDay()),
    ddd: getDayName(date.getDay()).slice(0, 3),
    dd: getDayName(date.getDay()).slice(0, 2),
    d: String(date.getDay()),
    HH: String(date.getHours()).padStart(2, "0"),
    H: String(date.getHours()),
    hh: String(date.getHours() % 12 || 12).padStart(2, "0"),
    h: String(date.getHours() % 12 || 12),
    mm: String(date.getMinutes()).padStart(2, "0"),
    m: String(date.getMinutes()),
    ss: String(date.getSeconds()).padStart(2, "0"),
    s: String(date.getSeconds()),
    SSS: String(date.getMilliseconds()).padStart(3, "0"),
    A: date.getHours() >= 12 ? "PM" : "AM",
    a: date.getHours() >= 12 ? "pm" : "am",
    Z: getTimezoneOffset(date),
    ZZ: getTimezoneOffset(date).replace(":", ""),
    X: Math.floor(date.getTime() / 1e3).toString(),
    x: date.getTime().toString()
  };
  let result = format;
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);
  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, "g"), tokens[token]);
  }
  return result;
}
function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return months[month];
}
function getDayName(day) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}
function getTimezoneOffset(date) {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  plugin
});
