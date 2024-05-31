import React, { FC, useContext, useState } from 'react';
import * as styles from './styles.module.scss';
import { ThemeContext } from '../Provider/ThemeProvider';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import Modal from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';
import { useDispatch } from 'react-redux';
import { cartProductsActions } from 'src/store/cartProducts';
import { IconButton } from '@mui/material';

export type EditProductVariables = {
  putId?: string;
  input?: any;
  removeId?: string;
};

export interface ShopProductСartProps {
  id?: string;
  price: number;
  index?: number;
  image?: string;
  name: string;
  description: string;
  addMode?: boolean;
  adminMode?: boolean;
  noDell?: boolean;
  refetch?: () => void;
}

export const CartProducts: FC<ShopProductСartProps> = ({ id, price, image, description, name, noDell, refetch }) => {
  const [theme] = useContext(ThemeContext);

  const dispatch = useDispatch();
  const removeCartProduct = () => {
    dispatch(cartProductsActions.remove({ id }));
  };
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <ProductForm
          id={id}
          price={price}
          image={image}
          description={description}
          name={name}
          onClose={() => {
            setVisible(false);
            refetch();
          }}
        />
      </Modal>
      <div
        className={styles.shortProductCard}
        style={theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)' } : {}}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F7FF' }}
        >
          <img height={'70px'} src={image} />
          <div>
            <h3>{name}</h3>{' '}
          </div>
          <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <div>
              <h3>{price + ' $'}</h3>
            </div>
            {noDell ? null : (
              <IconButton color="primary">
                {' '}
                <DeleteOutlineSharpIcon style={{ padding: '10px' }} onClick={removeCartProduct} />{' '}
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
