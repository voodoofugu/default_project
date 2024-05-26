/**
 * Converts a string to camel case by removing leading digits and
 * capitalizing the first letter of each word separated by hyphens or underscores.
 *
 * @param {string} text - The string to convert to camel case.
 * @return {string} The converted string in camel case.
 */
export default function textToCamelcase(text: string): string {
  // Remove leading digits
  let transformed = text.replace(/^\d+/, "");

  // Capitalize the first letter of each word
  transformed = transformed.replace(/[-_]\w/g, (match) =>
    match.charAt(1).toUpperCase()
  );

  // Lowercase the first letter of the transformed string
  transformed = transformed.charAt(0).toLowerCase() + transformed.slice(1);

  return transformed;
}
