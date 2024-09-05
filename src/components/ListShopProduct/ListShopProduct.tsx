import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ShopProductСart } from '../ShopProductСart/ShopProductСart';
import Modal from '../Modal/Modal';
import { profileSelectors } from 'src/store/profile';
import { AddProductForm } from '../ProductForm/AddProductForm';
import { Pagination } from '@mui/material';
import { Product } from 'src/server.types';

export interface ListShopProductProductСartProps {
  data?: [];
  setPage?: (val: any) => void;
  updateData?: () => void;
  page?: number;
  listPagination?: any;
}

export const ListShopProduct: FC<ListShopProductProductСartProps> = ({
  data,
  setPage,
  updateData,
  page,
  listPagination,
}) => {
  localStorage.setItem('unTokenMode', 'true');

  const profile = useSelector(profileSelectors.get);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const adminResp = profile[0] ? profile[0]['name'].includes('admin') : false;
  const [visible, setVisible] = useState<boolean>(false);
  const total_pages = Math.ceil(listPagination.total / 6);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <>
        <div ref={rootRef} className="MyRoot" style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          {data.map((product: Product, index: number) => {
            return (
              <div ref={index === data.length - 1 ? targetRef : null} key={product.id + index}>
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
                  noEdit
                  refetch={updateData}
                />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '30px' }}>
          <Pagination count={total_pages} page={page} onChange={handleChange} />
        </div>
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
    </>
  );
};
