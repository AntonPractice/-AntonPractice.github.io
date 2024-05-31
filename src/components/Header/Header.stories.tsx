import type { Meta } from '@storybook/react';

import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Headereus',
  component: Header,
};

export default meta;

export const Default = {
  args: {
    size: true,
    label: 'Headereus',
  },
};
