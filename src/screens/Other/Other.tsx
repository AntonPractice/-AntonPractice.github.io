import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import { useSomeModal } from 'src/components/Modals/SomeModal';
import * as s from './styles.module.scss';
import { Button } from 'src/components/Button/Button';
import { ShopProductСart } from 'src/components/ShopProductСart/ShopProductСart';
import { useTokenContext } from 'src/TokenProvider';
import  { cartProductsActions, cartProductsSelectors} from 'src/store/cartProducts';
import { useDispatch, useSelector } from 'react-redux';

const Other: FC = () => {
  const [, { open }] = useSomeModal();
  const [token, { login }] = useTokenContext();
  const dispatch = useDispatch();
debugger
  const listProducts = useSelector(cartProductsSelectors.get);
  const removeProduct = () => dispatch(cartProductsActions.remove());

  console.log('Other screen token', token)
  return (
    <div className={s.root}>
      <Frame>
      Корзина
      <div>
      {listProducts.map((product, index) => {
          return (
            <div>
              <ShopProductСart key={product.id}  id={product.id} price={product.price} name={product.name} description={product.description} image={product.image}/>
            </div>
          )
        })}
      </div>
        <div>
          <Button onClick={() => open('content')} label='Добавить продукт'/>
        </div>
      </Frame>
    </div>
  );
};

export default Other;
