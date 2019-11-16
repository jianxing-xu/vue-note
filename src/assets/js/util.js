import dateformat from 'dateformat-util'

export function DateFormat(date, fmt = "yyyy-MM-dd") {
  return dateformat.format(new Date(date), fmt);
}