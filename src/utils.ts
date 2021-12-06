/**
 * Get an array of indices of truthy values from an array.
 *
 * @param array The array to test
 */
export function getTruthyIndices<T>(array: T[]) {
  return array
    .map((item, index) => {
      if (!item) return false;
      return index;
    })
    .filter((item) => item !== false);
}

/**
 * Transform each character in a string.
 *
 * @param string The string to transform
 * @param fn the transform function to use when mapping through the strings characters
 */
export function mapString(string: string, fn: (character: string, index: number) => void) {
  return string.split('').map(fn).join('');
}

/**
 * Get a random item from an array.
 *
 * @param array The array to sample from
 */
export function sample<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
