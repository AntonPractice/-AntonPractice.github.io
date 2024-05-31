import type { Meta } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'ProductFormeus',
  component: ProductForm,
};

export default meta;

export const Default = {
  args: {
    primary: true,
  },
};
