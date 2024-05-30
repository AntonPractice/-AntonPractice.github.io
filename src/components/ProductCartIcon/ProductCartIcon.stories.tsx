import type { Meta } from '@storybook/react';

import { ProductCartIcon } from './ProductCartIcon';

const meta: Meta<typeof ProductCartIcon> = {
  title: 'Product Cart Buttoneus',
  component: ProductCartIcon,
};

export default meta;

export const Default = {
  args: {
    count: 0,
  },
};
