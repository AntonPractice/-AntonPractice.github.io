import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ShopProductСart } from '../ShopProductСart/ShopProductСart';
import { DefaultButton } from '../Button/DefaultButton';
import Modal from '../Modal/Modal';
import { profileSelectors } from 'src/store/profile';
import { gql, useQuery } from '@apollo/client';
import { AddProductForm } from '../ProductForm/AddProductForm';
import { CircularProgress } from '@mui/material';

const GET_PRODUCTS = gql`
  query Data($input: ProductGetManyInput) {
    products {
      getMany(input: $input) {
        data {
          id
          name
          photo
          desc
          createdAt
          updatedAt
          price
        }
        pagination {
          pageSize
          pageNumber
        }
      }
    }
  }
`;

interface Product {
  price?: number;
  id?: string;
  name?: string;
  image?: string;
  description?: string;
}

export interface ListShopProductProductСartProps {
  unTokenMode?: boolean;
}

export const createRandomProduct = (createdAt: string): Product => {
  const rundomProductId: string = Math.random().toString(16).slice(-8);
  return {
    id: createdAt,
    name: 'Product_' + rundomProductId,
    image: 'IMG_' + rundomProductId,
    price: Math.floor(Math.random() * 10000),
    description: 'Description' + rundomProductId,
  };
};

export const ProfileShopProducts: FC<ListShopProductProductСartProps> = ({ unTokenMode }) => {
  const [page, setPage] = useState<number>(1);
  const input = {
    pagination: {
      pageSize: 5,
      pageNumber: page,
    },
  };
  const { data, error, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: { input },
  });

  const listProducts = data && data.products.getMany.data;
  localStorage.setItem('unTokenMode', '');
  const profile = useSelector(profileSelectors.get);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const adminResp = profile[0] ? profile[0]['name'].includes('admin') : false;
  const [visible, setVisible] = useState<boolean>(false);
  const updateData = () => {
    setTimeout(() => {
      refetch();
    }, 100);
  };
  if (loading) return <CircularProgress />;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <div
        ref={rootRef}
        className="MyRoot"
        style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}
      >
        {listProducts.map((product: any, index: number) => {
          return (
            <div ref={index === listProducts.length - 1 ? targetRef : null} key={product.id + index}>
              <ShopProductСart
                adminMode={adminResp}
                key={product.id}
                index={index}
                id={product.id}
                price={product.price}
                name={product.name}
                description={product.desc}
                image={product.photo}
                addMode
                refetch={updateData}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex' }}>
        {page > 1 && (
          <DefaultButton
            label={'Назад'}
            onClick={() => {
              setPage((previousValue) => previousValue - 1);
              updateData();
            }}
          />
        )}
        <DefaultButton
          label={'Вперед'}
          onClick={() => {
            setPage((previousValue) => previousValue + 1);
            updateData();
          }}
        />
      </div>
      {adminResp && <DefaultButton label={'Добавить новый продукт'} onClick={() => setVisible(true)} />}
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <AddProductForm
          addAdminMode
          onClose={() => {
            setVisible(false);
            updateData();
          }}
        />
      </Modal>
    </>
  );
};
