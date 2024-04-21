
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions, productSelectors } from 'src/store/products';

import { ShopProductСart } from '../ShopProductСart/ShopProductСart';
import { Button } from '../Button/Button';
import Modal from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';
import { profileActions, profileSelectors } from "src/store/profile";

interface Product {
  price?: number;
  id?: string;
  name?: string;
  image?: string;
  description?: string;
}

export interface ListShopProductProductСartProps {
  products?: Product[];
}

export const createRandomProduct = (createdAt: string): Product => {
  const rundomProductId: string = Math.random().toString(16).slice(-8);
  return {
    id: createdAt,
    name: 'Product_' + rundomProductId,
    image: 'IMG_' + rundomProductId,
    price: Math.floor(Math.random() * 10000),
    description: 'Description' + rundomProductId
  }
};

export const ListShopProduct: FC<ListShopProductProductСartProps> = ({ products }) => {
  const dispatch = useDispatch();
  const listProducts = useSelector(productSelectors.get);
  debugger
  const profile= useSelector(profileSelectors.get)
  const addProduct = () => dispatch(productActions.add());
  const targetRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleCallBackIntersection = function (entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry) => {

        if (entry.isIntersecting) {
          addProduct()
          observer.unobserve(entry.target)
        }
      })
    }
    const observer = new IntersectionObserver(
      handleCallBackIntersection
      ,
      {
        threshold: 1,
        root: rootRef.current
      }
    )

    const target = targetRef.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [targetRef, rootRef, listProducts])

  return (
    <>
      <div ref={rootRef} className='MyRoot' style={{ maxHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {listProducts.map((product, index: number) => {
          return (
            <div ref={index === listProducts.length - 1 ? targetRef : null}>
              <ShopProductСart adminMode={profile[0]['name'] == 'admin'} key={product.id} index={index} id={product.id} price={product.price} name={product.name} description={product.description} image={product.image} addMode />
            </div>

          )
        })}
      </div>
      <div>
     { profile[0]['name'] == 'admin' && <Button size={""} label={"Добавить новый продукт"} onClick={() => setVisible(true)} />}
      </div>
      <Modal visible={visible} onClose={() => setVisible(false)} >
        <ProductForm addAdminMode onClose={() => setVisible(false)} />
      </Modal>
    </>
  );
};