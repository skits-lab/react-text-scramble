import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { getTruthyIndices } from './utils';
import Obfuscator, { RevealMode } from './obfuscator';
import { baffleReducer, initialState } from './reducer';
import { DEFAULT_SCRAMBLE_SPEED, SYMBOLS } from './constants';

const defaultConfig = {
  characters: SYMBOLS,
  exclude: [' '],
  speed: DEFAULT_SCRAMBLE_SPEED,
};

type TextScrambleConfig = {
  characters: string;
  exclude: string[];
  speed: number;
};

type TextScrambleOptions = {
  [K in keyof TextScrambleConfig]?: TextScrambleConfig[K];
};

export const useTextScramble = (text: string, options?: TextScrambleOptions) => {
  const config = useMemo<TextScrambleConfig>(() => ({ ...defaultConfig, ...options }), [options]);
  const obfuscator = useMemo(() => new Obfuscator(text), [text]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const startInterval = useRef<NodeJS.Timeout | null>(null);
  const revealInterval = useRef<NodeJS.Timeout | null>(null);

  const [state, dispatch] = useReducer(baffleReducer, {
    ...initialState,
    output: obfuscator.render(config.characters.split(''), config.exclude),
  });

  /**
   *
   */
  const obfuscate = useCallback(() => {
    dispatch({
      type: 'SET_OUTPUT',
      payload: obfuscator.render(config.characters.split(''), config.exclude),
    });
  }, [config.characters, config.exclude, obfuscator]);

  /**
   *
   */
  const stop = useCallback(() => {
    dispatch({ type: 'STOP_BAFFLE' });
    startInterval.current && clearInterval(startInterval.current);
    revealInterval.current && clearInterval(revealInterval.current);
  }, []);

  /**
   *
   */
  const start = useCallback(() => {
    dispatch({ type: 'START_BAFFLE' });

    startInterval.current && clearInterval(startInterval.current);
    startInterval.current = setInterval(obfuscate, config.speed);
  }, [config.speed, obfuscate]);

  /**
   * Start a new interval, obfuscating fewer characters
   * on each cycle at pace to finish within duration
   * milliseconds. Optionally, delay by delay milliseconds.
   *
   * Once all elements are revealed, call stop() and
   * initialize each element.
   */
  const reveal = useCallback(
    (revealSpeed = 0, delay = 0, revealMode: RevealMode, onRevealComplete?: () => void) => {
      const interval = revealSpeed < config.speed ? config.speed : revealSpeed;

      const run = () => {
        revealInterval.current && clearInterval(revealInterval.current);
        revealInterval.current = setInterval(() => {
          // If all elements are revealed, stop and init
          if (!getTruthyIndices<number>(obfuscator.bitmap).length) {
            stop();
            obfuscator.init();

            // Run provided callback if available
            onRevealComplete && onRevealComplete();
            return;
          }

          obfuscator.decay(revealMode);
        }, interval);
      };

      timer.current = setTimeout(run, delay);
      start();
    },
    [config.speed, obfuscator, start, stop],
  );

  /**
   * Clean up intervals on unmount
   */
  useEffect(() => {
    return () => {
      startInterval.current && clearInterval(startInterval.current);
      revealInterval.current && clearInterval(revealInterval.current);
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return { state, reveal, start, stop };
};
