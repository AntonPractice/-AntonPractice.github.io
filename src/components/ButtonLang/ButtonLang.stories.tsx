import type { Meta } from '@storybook/react';
import { ButtonLang } from './ButtonLang';

const meta: Meta<typeof ButtonLang> = {
  title: 'ButtonLang',
  component: ButtonLang,
};

export default meta;

export const Default = {
  args: { primary: true, label: 'ButtonLang' },
};
