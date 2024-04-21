import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { productActions, productSelectors } from 'src/store/products';

// типизация полей
type Inputs = {
  name: string;
  description: string;
  price: number;
  img: string;
};
export interface IProductForm {
  id?: string;
  price?: number;
  index?: number;
  image?: string;
  name?: string;
  description?: string;
  addMode?: boolean;
  addAdminMode?: boolean;
  onClose?: () => void;
}

// валидация полей
const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    img: yup.string(),
  })
  .required();

export const ProductForm: FC<IProductForm> = ({ id, price, image, description, name, addMode, index, onClose, addAdminMode }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      name: name || '',
      description: description || '',
      price: price || 0,
      img: image || '',
    },
  });
  const dispatch = useDispatch();

  const editProduct = (id: any, name: any, image: any, price: any, description: any) => { dispatch(productActions.edit({ id, name, image, price, description })) }
  const addProduct = ( name: any, image: any, price: any, description: any) => dispatch(productActions.addNew({  name, image, price, description }));

  const customHandleSubmit = (values: any) => {
    debugger
    if (addAdminMode) {
      addProduct( values.name, values.image, values.price, values.description)
    } else {
      editProduct(id, values.name, values.image, values.price, values.description)
    }
    reset();
    onClose()
  };

  return (<>
    <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
      <h1>Добавление/Редактирование продукта</h1>

      <div className={styles.formInput}>
        <label htmlFor="name">Наименование</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: true,
            minLength: {
              value: 3,
              message: "Минумум 3 символа!",
            },
          })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="description">Описание</label>
        <input id="description"
          type="text"
          {...register("description", {
            required: true,
            minLength: {
              value: 3,
              message: "Минумум 3 символа!",
            },
          })} />
        {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="price">Цена</label>
        <input id="price"
          type="number"
          {...register("price", {
            required: true,
          })} />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="img">Ссылка на иллюстрацию</label>
        <input id="img"
          type="text"
          {...register("img")} />
        {errors.img && <p style={{ color: "red" }}>{errors.img.message}</p>}
      </div>
      <hr />
      <button type="submit" disabled={!isValid}>Отправить</button>
    </form>
  </>
  );
};

