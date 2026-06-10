/** Draft posts are included in lists and routing only when running `next dev`. */
export function isDraftPreviewEnabled() {
  return process.env.NODE_ENV === 'development';
}
