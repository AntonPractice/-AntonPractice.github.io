import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import * as s from './styles.module.scss';
import { gql, useMutation } from '@apollo/client';
import { DefaultButton } from 'src/components/Button/DefaultButton';
import { useSelector } from 'react-redux';
import { cartProductsSelectors } from 'src/store/cartProducts';
import { CartProducts } from 'src/components/CartProducts/CartProducts';
import { Mutation } from 'src/server.types';
import { profileSelectors } from 'src/store/profile';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';

export type EditProductVariables = {
  putId?: string;
  input?: any;
  removeId?: string;
};

const ADD_ORDER = gql`
  mutation Add($input: OrderAddInput!) {
    orders {
      add(input: $input) {
        id
        user {
          id
          commandId
        }
        status
        commandId
      }
    }
  }
`;
const Basket: FC = () => {
  const listProducts = useSelector(cartProductsSelectors.get);
  const [createOrder] = useMutation<Pick<Mutation, 'orders'>, EditProductVariables>(ADD_ORDER);

  const profile = useSelector(profileSelectors.get);
  const LoginName = profile && profile[0] ? profile[0]['name'] : '';

  const getdata = () => {
    const list = listProducts.map((el) => {
      return {
        id: el.id,
        quantity: 1,
      };
    });
    return {
      products: list,
    };
  };
  const input = getdata();

  const addProduct = () => {
    createOrder({ variables: { input } })
      .then((res) => {
        localStorage.setItem('orderId', res.data.orders.add.id);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        localStorage.setItem('protectedMode', '');
      });
  };

  return (
    <div className={s.root}>
      <Frame>
        <h1>Товары в корзине</h1>
        <div>
          {listProducts.map((product: any) => {
            return (
              <CartProducts
                key={product.id}
                id={product.id}
                price={product.price}
                name={product.name}
                description={product.description}
                image={product.image}
              />
            );
          })}
        </div>
        {LoginName ? (
          <DefaultButton label={'Оформить заказ'} onClick={addProduct} />
        ) : (
          <Tooltip
            title="Для оформления заказа необходимо зарегистрироваться"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -14],
                    },
                  },
                ],
              },
            }}
          >
            <Button>Оформить заказ</Button>
          </Tooltip>
        )}
      </Frame>
    </div>
  );
};

export default Basket;
