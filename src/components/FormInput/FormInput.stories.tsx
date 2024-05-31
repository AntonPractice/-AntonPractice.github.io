import type { Meta } from '@storybook/react';
import { FormInput } from './FormInput';

const meta: Meta<typeof FormInput> = {
  title: 'Buttoneus',
  component: FormInput,
};

export default meta;

export const Default = {
  args: {
    primary: true,
    label: 'Buttoneus',
  },
};
