import type { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'ProfileFormeus',
  component: ProfileForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    primary: true,
  },
};
