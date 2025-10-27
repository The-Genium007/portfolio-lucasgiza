const MONTHS_SHORT_EN = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.'
];

/**
 * Formats a YYYY-MM string using short English month labels.
 * @param {string} value - Date string in the form "YYYY-MM" or the literal 'Present'.
 * @returns {string}
 */
export function formatDate(value) {
  if (!value) return '';
  if (value === 'Present') return 'PRESENT';
  const [y, m] = value.split('-');
  const monthIdx = Math.max(0, Math.min(11, Number(m) - 1));
  const month = MONTHS_SHORT_EN[monthIdx];
  return `${month} ${y}`;
}

// NOTE: fonction cn dupliquée retirée; utiliser lib/cn.js
