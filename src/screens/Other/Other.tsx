import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import { useSomeModal } from 'src/components/Modals/SomeModal';
import * as s from './styles.module.scss';
import { Button } from 'src/components/Button/Button';
import { ShopProductСart } from 'src/components/ShopProductСart/ShopProductСart';

const Other: FC = () => {
  const [, { open }] = useSomeModal();

  return (
    <div className={s.root}>
      <Frame>
      Корзина
      <div><ShopProductСart price={10000} name={'Товар #1'} description={'Первый товар в корзине'}/></div>
        <div>
          <Button onClick={() => open('content')} label='Добавить продукт'/>
        </div>
      </Frame>
    </div>
  );
};

export default Other;
