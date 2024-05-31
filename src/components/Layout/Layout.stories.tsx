import type { Meta } from '@storybook/react';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Layouteus',
  component: Layout,
};

export default meta;

export const Default = {
  args: {
    label: 'Layouteus',
  },
};
