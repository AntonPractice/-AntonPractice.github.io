import type { Meta } from '@storybook/react';
import { ButtonTheme } from './ButtonTheme';

const meta: Meta<typeof ButtonTheme> = {
  title: 'ButtonThemeus',
  component: ButtonTheme,
};

export default meta;

export const Default = {
  args: { primary: true, label: 'ButtonTheme2' },
};
