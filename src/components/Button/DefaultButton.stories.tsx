import type { Meta, StoryObj } from '@storybook/react';
import { DefaultButton } from './DefaultButton';

const meta: Meta<typeof DefaultButton> = {
  title: 'Buttoneus',
  component: DefaultButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    primary: true,
    label: 'Buttoneus',
  },
};
