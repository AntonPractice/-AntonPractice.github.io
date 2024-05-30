import type { Meta, StoryObj } from '@storybook/react';
import { InfinityListParent } from './InfinityListParent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InfinityListParent> = {
  title: 'InfinityListeus',
  component: InfinityListParent,
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    itemHeight: 20,
  },
};
