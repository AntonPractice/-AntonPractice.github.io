import React, { FC, useCallback, useEffect } from 'react';
import { Frame } from 'src/components/Frame';
import * as s from './styles.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DefaultButton } from 'src/components/Button/DefaultButton';
import { useSelector } from 'react-redux';
import { Mutation } from 'src/server.types';
import { profileSelectors } from 'src/store/profile';
import OrdersList from './OrdersList';
import { useTranslation } from 'react-i18next';

export type EditProductVariables = {
  putId?: string;
  input?: any;
  removeId?: string;
};

const GET_ORDERS = gql`
  query Query($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        data {
          id
          products {
            product {
              id
              name
              photo
              desc
              price
            }
          }
        }
      }
    }
  }
`;

const REMOVE_ORDER = gql`
  mutation Mutation($removeId: ID!) {
    orders {
      remove(id: $removeId) {
        products {
          _id
        }
      }
    }
  }
`;
const Order: FC = () => {
  const profile = useSelector(profileSelectors.get);
  const userId = profile && profile[0] ? profile[0]['id'] : '';
  const { t } = useTranslation();

  const [removeOrderProduct] = useMutation<Pick<Mutation, 'orders'>, EditProductVariables>(REMOVE_ORDER);

  const { data, error, loading, refetch } = useQuery(GET_ORDERS, {
    variables: {
      input: {
        userId: userId,
      },
    },
  });

  const listOrders = data && data.orders.getMany.data;
  const updateData = () => {
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const updateCallback = useCallback(updateData, [updateData]);

  useEffect(() => {
    setTimeout(() => {
      updateCallback();
    }, 100);
  }, [updateCallback]);

  const removeCartProduct: any = (order: any) => {
    const removeId = order;
    removeOrderProduct({ variables: { removeId } })
      .then((res) => {
        console.log({ res });
        updateData();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const removeAll: any = (listOrders: any) => {
    listOrders.forEach((el: any) => {
      removeCartProduct(el.id);
    });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className={s.root}>
      <Frame>
        <h1>{t('orders.label')}</h1>
        <div>
          {listOrders.map((order: any) => {
            return (
              <div
                key={order.id}
                style={{ backgroundColor: 'rgb(128 171 255 / 30%)', borderRadius: '10px', marginBottom: '5px' }}
              >
                <div>{t('orders.identificator')+' --' + order.id}</div>
                <OrdersList key={order.id} listProducts={order.products} />
                <DefaultButton onClick={() => removeCartProduct(order.id)} label= {t('orders.del')} />
              </div>
            );
          })}
        </div>
        <div>
          <DefaultButton onClick={() => updateData()} label={t('orders.refresh')} />
          <DefaultButton onClick={() => removeAll(listOrders)} label={t('orders.dell')} />
        </div>
      </Frame>
    </div>
  );
};

export default Order;
