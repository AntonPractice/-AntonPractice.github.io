import type { Meta, StoryObj } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'ProductFormeus',
  component: ProductForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    primary: true,
  },
};
