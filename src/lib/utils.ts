/** Tiny class-name joiner. Filters out falsy values so conditionals stay inline. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Formats a number for the animated counters.
 * Keeps thousands separators and honours a fixed decimal count.
 */
export function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
