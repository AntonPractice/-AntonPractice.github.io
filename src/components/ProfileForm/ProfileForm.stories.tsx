import type { Meta } from '@storybook/react';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'ProfileFormeus',
  component: ProfileForm,
};

export default meta;

export const Default = {
  args: {
    primary: true,
  },
};
