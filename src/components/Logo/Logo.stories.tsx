import type { Meta } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Logoneus',
  component: Logo,
};

export default meta;

export const Default = {
  args: {
    size: true,
    label: 'Logoneus',
  },
};
