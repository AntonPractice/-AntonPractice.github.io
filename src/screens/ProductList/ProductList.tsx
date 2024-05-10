import React, { FC } from 'react';
import * as s from './styles.module.scss';
import { ListShopProduct } from 'src/components/ListShopProduct/ListShopProduct';
import { useTokenContext } from 'src/TokenProvider';

const ProductList: FC = () => {

const [token, { login }] = useTokenContext();
console.log('ProductList screen token', token)

  return(
    <div className={s.root}>
      <ListShopProduct products={[]} />
    </div>
    )
};

export default ProductList;
