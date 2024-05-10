import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as styles from './styles.module.scss';
import { gql, useMutation, useQuery } from "@apollo/client";
import { Mutation } from "src/server.types";


export type EditProductVariables = {
  putId?: string;
  price?: number;
  index?: number;
  photo?: string;
  name?: string;
  desc?: string;
  input?: any;
};

const ADD_PRODUCT = gql`
mutation Add($input: ProductAddInput!) {
  products {
    add(input: $input) {
      name
      photo
      desc
      createdAt
      price
    }
  }
}
`;

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

export const AddProductForm: FC<IProductForm> = ({ id, price, image, description, name, addMode, index, onClose, addAdminMode }) => {

  const [addProduct] = useMutation<Pick<Mutation, 'products'>, EditProductVariables>(ADD_PRODUCT);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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


  const customHandleSubmit: SubmitHandler<Inputs> = (values) => {

    if (addAdminMode) {
      const input = {
        "name": values.name,
        "photo": values.img,
        "price": Number(values.price),
        "desc": values.description,
        "categoryId": "65ba656940505ca249a20f1c"
      };
      localStorage.setItem('protectedMode', 'true');

      addProduct({ variables: { input } })
        .then(() => { onClose() })
        .catch((err) => { alert(err.message) })
        .finally(() => {
          localStorage.setItem('protectedMode', '');

        });
    }

  };

  return (<form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
    <h1>Добавление  продукта</h1>
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
    <button type="submit" disabled={!isValid}>Добавить</button>
  </form>);
};

