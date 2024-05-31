import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as styles from './styles.module.scss';
import { gql, useMutation } from '@apollo/client';
import { Mutation } from 'src/server.types';
import { FormInput } from '../FormInput/FormInput';
import { DefaultButton } from '../Button/DefaultButton';

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

export const AddProductForm: FC<IProductForm> = ({ price, image, description, name, onClose, addAdminMode }) => {
  const [addProduct] = useMutation<Pick<Mutation, 'products'>, EditProductVariables>(ADD_PRODUCT);

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onBlur',
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
        name: values.name,
        photo: values.img,
        price: Number(values.price),
        desc: values.description,
        categoryId: '65ba656940505ca249a20f1c',
      };

      addProduct({ variables: { input } })
        .then(() => {
          onClose();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
      <h1>Добавление продукта</h1>
      <FormInput
        {...register('name', {
          required: true,
          minLength: {
            value: 3,
            message: 'Минумум 3 символа!',
          },
        })}
        id="name"
        type="text"
        label="Наименование"
        name="name"
        error={errors.name && !!errors.name}
        helperText={errors.name && errors?.name?.message}
      />
      <FormInput
        {...register('description', {
          required: true,
          minLength: {
            value: 3,
            message: 'Минумум 3 символа!',
          },
        })}
        id="description"
        type="text"
        label="Описание"
        name="description"
        error={errors.description && !!errors.description}
        helperText={errors.description && errors?.description?.message}
      />
      <FormInput
        {...register('price', {
          required: true,
        })}
        id="price"
        type="number"
        label="Цена"
        name="price"
        error={errors.price && !!errors.price}
        helperText={errors.price && errors?.price?.message}
      />
      <FormInput
        {...register('img', {
          required: true,
        })}
        id="img"
        type="text"
        label="Ссылка на иллюстрацию"
        name="img"
        error={errors.img && !!errors.img}
        helperText={errors.img && errors?.img?.message}
      />
      <hr />
      <DefaultButton type="submit" disabled={!isValid}>
        Добавить
      </DefaultButton>
    </form>
  );
};
