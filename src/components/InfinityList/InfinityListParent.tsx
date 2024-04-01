
import React, { FC, useContext, useLayoutEffect, useRef, useState } from 'react';
import { InfinityList, InfinityListRef } from './InfinityList';

export interface IinfinityListProps {
  itemHeight: number;
}

export const InfinityListParent: FC<IinfinityListProps> = ({ itemHeight, ...props }) => {
const count = 100
  const [items, setItems] = useState(() =>
    Array(count)
      .fill('')
      .map((_, i) => i + 1)
  );

  const listElem = useRef<InfinityListRef>();

  useLayoutEffect(() => {
    listElem.current.scrollTo(49);
  }, []);

  return (
    <InfinityList
      innerRef={listElem}
      items={items}
      itemElement={({ data }) => <div>{data}</div>}
      itemHeight={itemHeight}
      setItems={setItems}
      style={{ height: '320px', width: '320px' }}
      count={count}
    />
  );
};