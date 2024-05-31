import React, { FC, useCallback, useEffect, useState } from 'react';
import * as s from './styles.module.scss';
import { ListShopProduct } from 'src/components/ListShopProduct/ListShopProduct';
import { CategoryMenu } from 'src/components/CategoryMenu/CategoryMenu';
import CircularProgress from '@mui/material/CircularProgress';
import { gql, useQuery } from '@apollo/client';

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
const GET_CATEGORIES = gql`
  query Categories($input: CategoryGetManyInput) {
    categories {
      getMany(input: $input) {
        data {
          commandId
          name
          id
        }
      }
    }
  }
`;

const ProductList: FC = () => {
  localStorage.setItem('unTokenMode', 'true');
  const [page, setPage] = useState<number>(1);
  const [nameCategory, setNameCategory] = useState<string>();

  const input = {
    categoryIds: nameCategory,
    pagination: {
      pageSize: 6,
      pageNumber: page,
    },
  };
  const {
    data: dataProducts,
    error: errorProducts,
    loading: loadingProducts,
    refetch,
  } = useQuery(GET_PRODUCTS, {
    variables: { input },
  });

  const listProducts = dataProducts && dataProducts.products.getMany.data;
  const listPagination = dataProducts && dataProducts.products.getMany.pagination;

  const updateData = () => {
    setTimeout(() => {
      refetch();
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
      updateData();
    }, 100);
    return () => {
      setTimeout(() => {
        localStorage.setItem('unTokenMode', '');
      }, 300);
    };
  }, []);

  const { data: dataCategory, error: errorCategory, loading: loadingCategory } = useQuery(GET_CATEGORIES);

  const categories = dataCategory && dataCategory.categories.getMany.data;

  return (
    <div className={s.root}>
      {loadingCategory && <CircularProgress />}
      {errorCategory && <div>{errorCategory.message}</div>}
      {dataCategory && (
        <div style={{ display: 'flex' }}>
          <CategoryMenu categories={categories} setNameCategory={setNameCategory} />
        </div>
      )}
      {loadingProducts && <CircularProgress />}
      {errorProducts && <div>{errorProducts.message}</div>}
      {dataProducts && (
        <ListShopProduct
          data={listProducts}
          page={page}
          setPage={setPage}
          updateData={updateData}
          listPagination={listPagination}
        />
      )}
    </div>
  );
};

export default ProductList;
