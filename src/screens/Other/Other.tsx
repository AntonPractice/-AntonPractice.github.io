import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import * as s from './styles.module.scss';
import { Button } from 'src/components/Button/Button';
import { ShopProductСart } from 'src/components/ShopProductСart/ShopProductСart';
import { gql, useQuery } from '@apollo/client';

const GET_ORDERS = gql`
query Query($getOneId: ID!) {
  orders {
    getOne(id: $getOneId) {
      id
      products {
        _id
        product {
          name
          photo
          desc
          id
          price
        }
      }
    }
  }
}
`;
const Other: FC = () => {
  const orderId = localStorage.getItem('orderId')
  if (!orderId) return (<div className={s.root}>
    <Frame>
      Корзина
      <div>
        <Button onClick={() => alert('Добавьте книгу в корзину')} label='Обновить' />
      </div>
    </Frame>
  </div>)

  const { data, error, loading, refetch } = useQuery(GET_ORDERS, {
    variables: { getOneId: orderId },
  });
  const listProducts = data && data.orders.getOne.products;
  const updateData = () => {
    setTimeout(() => { refetch() }, 100)
  }

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className={s.root}>
      <Frame>
        Корзина
        <div>
          {listProducts.map((order: any, index: any) => {
            return (
              <div>
                <ShopProductСart key={order.product.id} id={order.product.id} price={order.product.price} name={order.product.name} description={order.product.desc} image={order.product.photo} refetch={updateData} />
              </div>
            )
          })}
        </div>
        <div>
          <Button onClick={() => updateData()} label='Обновить' />
        </div>
      </Frame>
    </div>
  );
};

export default Other;
