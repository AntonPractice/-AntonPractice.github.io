import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './FormInput';

const meta: Meta<typeof FormInput> = {
  title: 'Buttoneus',
  component: FormInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    primary: true,
    label: 'Buttoneus',
  },
};
