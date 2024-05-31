import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ShopProductСart } from '../ShopProductСart/ShopProductСart';
import { DefaultButton } from '../Button/DefaultButton';
import Modal from '../Modal/Modal';
import { profileSelectors } from 'src/store/profile';
import { gql, useQuery } from '@apollo/client';
import { AddProductForm } from '../ProductForm/AddProductForm';
import { CircularProgress, Pagination } from '@mui/material';
import { Product } from 'src/server.types';

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
          total
        }
      }
    }
  }
`;

export const ProfileShopProducts: FC = () => {
  const [page, setPage] = useState<number>(1);

  const input = {
    pagination: {
      pageSize: 5,
      pageNumber: page,
    },
  };
  localStorage.setItem('unTokenMode', '');

  const { data, error, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: { input },
  });

  const listProducts = data && data.products.getMany.data;
  const listPagination = data && data.products.getMany.pagination;
  const total_pages = listPagination && Math.ceil(listPagination.total / 6);

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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
        {listProducts.map((product: Product, index: number) => {
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
        <Pagination count={total_pages} page={page} onChange={handleChange} />
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
