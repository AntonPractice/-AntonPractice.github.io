import type { Meta, StoryObj } from '@storybook/react';

import { Collapse } from './Collapse';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Collapse> = {
  title: 'Collapseus',
  component: Collapse,
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    children:
      'Это компонент Collapse. Он принимает только opened и children.Это компонент Collapse. Он принимает только opened и children. Это компонент Collapse. Он принимает только opened и children.Это компонент Collapse. Он принимает только opened и children.Это компонент Collapse. Он принимает только opened и children.Это компонент Collapse. Он принимает только opened и children.',
    opened: true,
  },
};
