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
  onRevealComplete?: () => void;
};

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  wrappingElement,
  characters = SYMBOLS,
  autostart = true,
  scrambleSpeed = 30,
  revealText = false,
  revealSpeed = 100,
  revealDelay = 1000,
  revealMode = 'random',
  onRevealComplete,
}) => {
  const { state, reveal, start, stop } = useTextScramble(text, {
    characters,
    speed: scrambleSpeed,
  });

  const handleRevealText = useCallback(
    () => reveal(revealSpeed, revealDelay, revealMode, onRevealComplete),
    [reveal, revealSpeed, revealDelay, revealMode, onRevealComplete],
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
