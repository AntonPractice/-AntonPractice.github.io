import type { Meta } from '@storybook/react';
import { AuthorizationForm } from './AuthorizationForm';

const meta: Meta<typeof AuthorizationForm> = {
  title: 'AuthorizationFormeus',
  component: AuthorizationForm,
};

export default meta;

export const Default = {
  args: {
    primary: true,
  },
};
