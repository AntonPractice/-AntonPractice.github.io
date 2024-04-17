import React, { FC } from 'react';
import * as s from './styles.module.scss';
import { ShopProductСart } from 'src/components/ShopProductСart/ShopProductСart';
import { ListShopProduct } from 'src/components/ListShopProduct/ListShopProduct';

const ProductList: FC = () => {

  const products = [  {
    image: 'https://img2.freepng.ru/20180806/siu/kisspng-laptop-asus-zenbook-3-intel-core-i5-cebrac-5b67cb65470759.909331961533528933291.jpg',
    price: 123456,
    name: 'Товар №1',
    id: 'Товар№1',
    description:'sdfsdfdsf'
  },
  {
    image: 'https://express-china.ru/upload/iblock/f41/full_QsU2Pvti.jpg',
    price: 1000,
    name: 'Товар №2',
    id: 'Товар №2',
    description:'sdfsdfdsf'
  },
  {
    image: 'https://static.tildacdn.com/tild3063-3234-4263-b835-373962653933/mobile_2.jpg',
    price: 7777,
    name: 'Товар №3',
    id: 'Товар №3',
    description:'/runtime~main.iframe.bundle.js'

  },
  {
    image: 'https://express-china.ru/upload/iblock/f41/full_QsU2Pvti.jpg',
    price: 888,
    name: 'Товар №4',
    id: 'Товар №4',
    description:'sdfsdfdsf'
  },
];

  return(
    <div className={s.root}>
      <ListShopProduct products={products} />
    </div>
    )
};

export default ProductList;
