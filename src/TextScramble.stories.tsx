import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { SYMBOLS } from './constants';
import { TextScramble } from './TextScramble';

export default {
  title: 'TextScramble',
  component: TextScramble,
  argTypes: {
    autostart: { control: 'boolean' },
    wrappingElement: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      control: { type: 'select' },
    },
    characters: { control: 'text' },
    scrambleSpeed: { control: 'number' },
    revealText: { control: 'boolean' },
    revealSpeed: { control: 'number' },
    revealDelay: { control: 'number' },
    revealMode: {
      options: ['random', 'typewriter'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'monospace' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextScramble>;

const Template: ComponentStory<typeof TextScramble> = (args) => <TextScramble {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'MR. ROBOT',
  autostart: true,
  wrappingElement: 'p',
  characters: SYMBOLS,
  scrambleSpeed: 50,
  revealText: false,
  revealSpeed: 50,
  revealDelay: 0,
  revealMode: 'random',
  onRevealComplete: () => console.log('Text revealed!'),
};
