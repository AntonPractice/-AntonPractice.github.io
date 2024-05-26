
import React, { FC, useContext, useState } from 'react';
import * as styles from './styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../Provider/ThemeProvider';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../Modal/Modal';
import { ProductForm } from '../ProductForm/ProductForm';
import { gql, useMutation, useQuery } from "@apollo/client";
import { Mutation } from "src/server.types";


export type EditProductVariables = {
  putId?: string;
  input?: any;
  removeId?: string;
};

const ADD_ORDER = gql`
mutation Add($input: OrderAddInput!) {
  orders {
    add(input: $input) {
      id
    }
  }
}
`;
const REMOVE_ORDER = gql`
mutation Mutation($removeId: ID!) {
  orders {
    remove(id: $removeId) {
      products {
        _id
      }
    }
  }
}
`;
const UPDATE_ORDER = gql`
mutation Put($putId: ID!, $input: OrderUpdateInput!) {
  orders {
    put(id: $putId, input: $input) {
      id
    }
  }
}
`;
export interface ShopProductСartProps {
  id?: string;
  price: number;
  index?: number;
  image?: string;
  name: string;
  description: string;
  addMode?: boolean;
  adminMode?: boolean;
  refetch?: () => void;
}


export const ShopProductСart: FC<ShopProductСartProps> = ({ id, price, image, description, name, addMode, index, adminMode, refetch }) => {
  const [theme,] = useContext(ThemeContext);

  const [addCartProduct] = useMutation<Pick<Mutation, 'orders'>, EditProductVariables>(ADD_ORDER);
  const [updateCartProduct] = useMutation<Pick<Mutation, 'orders'>, EditProductVariables>(UPDATE_ORDER);
  const [removeOrderProduct] = useMutation<Pick<Mutation, 'orders'>, EditProductVariables>(REMOVE_ORDER);

  const [visible, setVisible] = useState<boolean>(false)

  const createOrder: any = () => {

    localStorage.setItem('protectedMode', 'true');
    const order = localStorage.getItem('orderId')
    if (!order) {
      const input = {
        "products": [
          {
            "id": id,
            "quantity": 1
          }
        ]
      };

      addCartProduct({ variables: { input } }).then((res) => {
        localStorage.setItem('orderId', res.data.orders.add.id);

      })
        .catch((err) => { alert(err.message) })
        .finally(() => {
          localStorage.setItem('protectedMode', '');

        });

    } else {
      const input = {
        "products": [
          {
            "id": id,
            "quantity": 1
          }
        ],
        "status": "Processing"
      };
      const putId = order;
      updateCartProduct({ variables: { input, putId } }).then((res) => {
        alert("Успешно добавлен в заказ!")
      })
        .catch((err) => { alert(err.message) })
        .finally(() => {
          localStorage.setItem('protectedMode', '');
        });;

    }
  }
  const removeCartProduct: any = () => {
    localStorage.setItem('protectedMode', 'true');
    const order = localStorage.getItem('orderId')
    const removeId = order;
    removeOrderProduct({ variables: { removeId } }).then((res) => {
      console.log({ res })
      alert('Успешно удален')
      localStorage.setItem('orderId', '');
      refetch()
    })
      .catch((err) => { alert(err.message) })
      .finally(() => {
        localStorage.setItem('protectedMode', '');
      });;


  }

  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)} >
        <ProductForm id={id} price={price} image={image} description={description} name={name} onClose={() => { setVisible(false); refetch() }} />
      </Modal>
      <div className={styles.shortProductCard} style={theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)' } : {}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5F7FF' }} >
          <img height={'70px'} src={image} />
          <div ><h3>{name}</h3>  </div><div ><h3>{price + ' $'}</h3></div>
          {addMode ? <AddIcon style={{ padding: '10px' }} onClick={createOrder} /> : <DeleteOutlineSharpIcon style={{ padding: '10px' }} onClick={removeCartProduct} />}
          {adminMode && <EditIcon style={{ padding: '10px' }} onClick={() => { setVisible(true) }} />}

        </div>

      </div>
    </>
  );
};