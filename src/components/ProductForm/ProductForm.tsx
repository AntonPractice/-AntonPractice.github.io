import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as styles from './styles.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
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

const GET_PRODUCT = gql`
  query GetOne($getOneId: ID!) {
    products {
      getOne(id: $getOneId) {
        id
        name
        photo
        desc
        createdAt
        updatedAt
        oldPrice
        price
      }
    }
  }
`;
const EDIT_PRODUCT = gql`
  mutation Mutation($input: ProductUpdateInput!, $putId: ID!) {
    products {
      put(input: $input, id: $putId) {
        name
        photo
        desc
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

export const ProductForm: FC<IProductForm> = ({ id, price, image, description, name, onClose }) => {
  const [editProduct] = useMutation<Pick<Mutation, 'products'>, EditProductVariables>(EDIT_PRODUCT);

  const { data, error, loading } = useQuery(GET_PRODUCT, {
    variables: { getOneId: id },
  });

  const {
    register,
    handleSubmit,
    setValue,
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
  useEffect(() => {
    if (data) {
      setValue('description', data.products.getOne['desc']);
      setValue('price', data.products.getOne['price']);
      setValue('name', data.products.getOne['name']);
      setValue('img', data.products.getOne['photo']);
    }
  }, [data]);

  const customHandleSubmit: SubmitHandler<Inputs> = (values) => {
    const input = {
      name: values.name,
      photo: values.img,
      price: Number(values.price),
      desc: values.description,
      categoryId: '65ba656940505ca249a20f1c',
    };
    const putId = id;
    localStorage.setItem('protectedMode', 'true');

    editProduct({ variables: { input, putId }, refetchQueries: [{ query: GET_PRODUCT, variables: { id } }] })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        localStorage.setItem('protectedMode', '');
      });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <form className={styles.form} onSubmit={handleSubmit(customHandleSubmit)}>
      <h1>Редактирование продукта</h1>
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
