import { getTruthyIndices, mapString, sample } from './utils';

export type RevealMode = 'typewriter' | 'random';

/**
 * - Obfuscator -
 *
 * Provides a low-level interface to obfuscate and reveal
 * a string based on its corresponding bitmap.
 *
 * ('hello', [0,1,0,1,0], '*') => '*e*l*o'
 *
 */

export default class Obfuscator {
  value: string;
  bitmap: number[] = [];

  constructor(str: string) {
    this.value = str;
    this.init();
  }

  /**
   * Set the bitmap to an array of 1s, with length equal to this.value.
   */
  init() {
    this.bitmap = this.value.split('').map(() => 1);
    return this;
  }

  /**
   * Create and return a string by mapping each character in
   * this.value to either one of the provided characters randomly
   * or to itself, depending on whether the corresponding bitmap
   * index is truthy.
   */
  render(characters: string[] = [], exclude: string[] = []) {
    // If no characters are provided, return the raw value.
    if (!characters.length) return this.value;

    return mapString(this.value, (char: string, index: number) => {
      // Skip any characters that are passed as exclude.
      if (exclude.indexOf(char) > -1) return char;

      /**
       * If corresponding bitmap index is truthy, return
       * a randomly chosen character from characters, else
       * return this character.
       */
      return this.bitmap[index] ? sample(characters) : char;
    });
  }

  /**
   * Set bitmap indices to 0, chosen by mode.
   *
   * @param mode Determines how indices are chosen, defaults to random
   */
  decay(mode: RevealMode = 'random') {
    const indices = getTruthyIndices<number>(this.bitmap);
    if (mode === 'typewriter') {
      this.bitmap[this.value.length - indices.length] = 0;
    } else {
      // @ts-expect-error: Allow number | false values
      this.bitmap[sample<number>(indices)] = 0;
    }

    return this;
  }

  /**
   * Change this.value to a new string and reset this.bitmap
   * to match.
   */
  text(str = this.value) {
    this.value = str;
    this.init();

    return this;
  }
}
