import type { Meta } from '@storybook/react';
import { OrdersCart } from './OrdersCart';

const meta: Meta<typeof OrdersCart> = {
  title: 'ShopProduct Сarteus',
  component: OrdersCart,
};

export default meta;

export const Default = {
  args: {
    image:
      'https://img2.freepng.ru/20180806/siu/kisspng-laptop-asus-zenbook-3-intel-core-i5-cebrac-5b67cb65470759.909331961533528933291.jpg',
    price: 123456,
    name: 'Товар №1',
  },
};
