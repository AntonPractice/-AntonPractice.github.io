import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ShopProductСart } from '../ShopProductСart/ShopProductСart';
import { DefaultButton } from '../Button/DefaultButton';
import Modal from '../Modal/Modal';
import { profileSelectors } from 'src/store/profile';
import { AddProductForm } from '../ProductForm/AddProductForm';

interface Product {
  price?: number;
  id?: string;
  name?: string;
  image?: string;
  description?: string;
}

export interface ListShopProductProductСartProps {
  data?: [];
  setPage?: (val: any) => void;
  updateData?: () => void;
  page?: number;
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

export const ListShopProduct: FC<ListShopProductProductСartProps> = ({ data, setPage, updateData, page }) => {
  localStorage.setItem('unTokenMode', 'true');

  const profile = useSelector(profileSelectors.get);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const adminResp = profile[0] ? profile[0]['name'].includes('admin') : false;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <>
        <div
          ref={rootRef}
          className="MyRoot"
          style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}
        >
          {data.map((product: any, index: number) => {
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
                setPage((previousValue: number) => previousValue - 1);
                updateData();
              }}
            />
          )}
          <DefaultButton
            label={'Вперед'}
            onClick={() => {
              setPage((previousValue: number) => previousValue + 1);
              updateData();
            }}
          />
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
