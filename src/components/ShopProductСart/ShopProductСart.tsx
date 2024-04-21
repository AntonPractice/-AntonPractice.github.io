
import React, { FC, useContext, useState } from 'react';
import * as styles from './styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../Provider/ThemeProvider';
import { useDispatch } from 'react-redux';
import { cartProductsActions } from 'src/store/cartProducts';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import EditIcon from '@mui/icons-material/Edit';
import { productActions, productSelectors } from 'src/store/products';
import Modal from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';

export interface ShopProductСartProps {
  id?: string;
  price: number;
  index?: number;
  image?: string;
  name: string;
  description: string;
  addMode?: boolean;
  adminMode?: boolean;
}


export const ShopProductСart: FC<ShopProductСartProps> = ({ id, price, image, description, name, addMode, index ,adminMode}) => {
  const [theme,] = useContext(ThemeContext);
  const dispatch = useDispatch();
  const addCartProduct = () => dispatch(cartProductsActions.set({ id, name, image, price, description }));
  const removeCartProduct = () => { dispatch(cartProductsActions.remove({ id })) }
  const [visible, setVisible] = useState<boolean>(false)
  close
  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)} >
        <ProductForm  id={id} price={price} image={image} description={description} name={name} onClose={() => setVisible(false)} />
      </Modal>
      <div className={styles.shortProductCard} style={theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)' } : {}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F7FF' }} >
          <img height={'70px'} src={image} />
          <div ><h3>{name}</h3>  </div><div ><h3>{price + ' $'}</h3></div>
          {addMode ? <AddIcon style={{ padding: '10px' }} onClick={addCartProduct} /> : <DeleteOutlineSharpIcon style={{ padding: '10px' }} onClick={removeCartProduct} />}
          {adminMode &&  <EditIcon style={{ padding: '10px' }} onClick={() => setVisible(true)} />}
         
        </div>

      </div>
    
    </>
  );
};