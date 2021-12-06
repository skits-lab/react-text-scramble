# React Text Scramble

Lightweight zero dependency React text scrambler.

Use the provided `TextScramble` component, or build your own component with the
`useScrambleTest` hook.

## Installation

```sh
npm i @skits/react-text-scramble
```

## Usage

#### Basic example

```jsx
import TextScramble from '@skits/react-text-scramble';

export default function App() {
  return (
    <div className="app">
      <TextScramble text="Hello World" />
    </div>
  );
}
```

#### Example usage with props

```jsx
import TextScramble from '@skits/react-text-scramble';

export default function App() {
  return (
    <div className="app">
      <TextScramble
        text="Hello World"
        autostart
        wrappingElement="p" // Wraps the provided text in 'p' tags - <p>{text}</p>
        characters="0123456789" // Scramble text using numbers only
        speed={50}
        delay={100}
        revealText
        revealSpeed={50}
        revealMode="typewriter" // Reveal text from left to right
      />
    </div>
  );
}
```

#### Example custom component with `useTextScramble` hook

```jsx
import { useTextScramble } from '@skits/react-text-scramble';

export const CustomTextScrambler: React.FC<TextScrambleProps> = ({ text }) => {
  const { state, reveal } = useTextScramble(text, {
    characters: '0123456789',
    speed: 50,
  });

  useEffect(() => {
    reveal(100, 0, 'typewriter');
  }, []);

  return <h1>{state.output}</h1>;
};
```

## `<TextScramble />`

### Props

Flexible component API

| Prop              | Type                                                  | Description                                                                                                                                                          | Default                                        |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `text`            | string                                                | The text string to scramble                                                                                                                                          | `-`                                            |
| `autostart`       | boolean                                               | Autostart the text scrambler                                                                                                                                         | `true`                                         |
| `wrappingElement` | React.FunctionComponent, React.ComponentClass, string | Custom wrapper for the provided text<br/>e.g `'h1'`, `MyComponent`                                                                                                   | `-`                                            |
| `characters`      | string                                                | 0                                                                                                                                                                    | `abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}[]` |
| `scrambleSpeed`   | number                                                | The speed used when scrambling the provided text                                                                                                                     | `50`                                           |
| `revealText`      | boolean                                               | Scrambles and reveals the provided text - See reveal settings below to configure                                                                                     | `false`                                        |
| `revealSpeed`     | number                                                | How fast each letter should be revealed                                                                                                                              | `0`                                            |
| `revealDelay`     | number                                                | How long before the text is revealed                                                                                                                                 | `-`                                            |
| `revealMode`      | 'random' or 'typewriter'                              | The mode to use when revealing the text<br/> When set to`random` letters will revealed randomly. When set to `typewriter` letter will be revealed from left to right | `random`                                       |

## `useTextScramble`

```ts
const useTextScramble: (
  text: string,
  options?: TextScrambleOptions | undefined
) => {
  state: BaffleState;
  reveal: (revealSpeed: any, delay: any, revealMode: RevealMode) => void;
  start: () => void;
  stop: () => void;
};
```

### TextScrambleOptions

| Option       | Type     | Description                                       | Default                                        |
| ------------ | -------- | ------------------------------------------------- | ---------------------------------------------- |
| `characters` | string   | The characters used to scramble the provided text | `abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}[]` |
| `exclude`    | string[] | Characters to exclude from the text scrambler     | `[' ']`                                        |
| `speed`      | string   | The speed used when scrambling the provided text  | `50`                                           |

---

License: MIT<br/>
Author: [@samwyness](https://github.com/samwyness)<br/>
Inspired by [baffle.js](https://github.com/camwiegert/baffle)<br/>
