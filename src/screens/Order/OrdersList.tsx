import React, { FC } from 'react';
import { CartProducts } from 'src/components/CartProducts/CartProducts';

const OrdersList: FC<{ listProducts: any }> = ({ listProducts }) => {
  return (
    <>
      {listProducts.map((el: any) => {
        return (
          <CartProducts
            noDell
            key={el.product.id}
            id={el.product.id}
            price={el.product.price}
            name={el.product.name}
            description={el.product.description}
            image={el.product.photo}
          />
        );
      })}
    </>
  );
};

export default OrdersList;
