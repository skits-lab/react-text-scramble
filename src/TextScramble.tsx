import React, { useCallback, useEffect } from 'react';
import { SYMBOLS } from './constants';
import { RevealMode } from './obfuscator';
import { useTextScramble } from './useTextScramble';

type TextScrambleProps = {
  text: string;
  wrappingElement?: React.FunctionComponent | React.ComponentClass | string;
  characters?: string;
  autostart?: boolean;
  scrambleSpeed?: number;
  revealText?: boolean;
  revealDelay?: number;
  revealSpeed?: number;
  revealMode?: RevealMode;
};

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  wrappingElement,
  characters = SYMBOLS,
  autostart = true,
  scrambleSpeed = 50,
  revealDelay = 500,
  revealText = false,
  revealSpeed,
  revealMode = 'random',
}) => {
  const { state, reveal, start, stop } = useTextScramble(text, {
    characters,
    speed: scrambleSpeed,
  });

  const handleRevealText = useCallback(
    () => reveal(revealSpeed, revealDelay, revealMode),
    [revealDelay, reveal, revealMode, revealSpeed],
  );

  useEffect(() => {
    if (autostart) {
      revealText ? handleRevealText() : start();
    } else {
      stop();
    }
  }, [autostart, handleRevealText, revealText, start, stop]);

  if (wrappingElement) {
    return React.createElement(
      wrappingElement,
      {
        // @ts-expect-error: Because wrapping element may not always allow these events
        // onMouseEnter: restartOnHover ? scramble : undefined,
        onClick: state.isRunning ? stop : () => (revealText ? handleRevealText() : start()),
      },
      state.output,
    );
  }

  return <React.Fragment>{state.output}</React.Fragment>;
};
