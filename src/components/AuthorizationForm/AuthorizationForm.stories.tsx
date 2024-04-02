import type { Meta,StoryObj } from '@storybook/react';
import  { AuthorizationForm } from './AuthorizationForm';


const meta: Meta<typeof AuthorizationForm> = {
  title: 'AuthorizationFormeus',
  component: AuthorizationForm
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    primary: true
  },
};

