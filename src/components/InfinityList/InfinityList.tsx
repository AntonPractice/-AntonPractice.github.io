import React, { MutableRefObject, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import cn from 'clsx';
import * as s from './styles.module.scss';

export type InfinityListRef = {
  scrollTo: (index: number) => void;
};

export type InfinityListProps<T, P extends { data: T } = { data: T }> = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  items: T[];
  itemElement: React.ComponentType<P>;
  itemHeight: number;
  innerRef?: MutableRefObject<InfinityListRef>;
  reserve?: number;
  count?: number;
  setItems: (v: any) => void;
};

export type InfinityListVisibleItemType<T> = {
  index: number;
  value: T;
};

const stringifyItems = (items: InfinityListVisibleItemType<unknown>[]) => items.map((i) => i.index).join('_');
const isEqualItems = (a: InfinityListVisibleItemType<unknown>[], b: InfinityListVisibleItemType<unknown>[]) =>
  a.length === b.length && stringifyItems(a) === stringifyItems(b);

export const InfinityList = <T, P extends { data: T } = { data: T }>({
  className,
  items,
  itemElement: ItemElement,
  itemHeight,
  innerRef,
  setItems,
  count,
  ...props
}: InfinityListProps<T>) => {
  const root = useRef<HTMLDivElement>();
  const holder = useRef<HTMLDivElement>();
  const prevScrollTop = useRef<number>(null);
  const reserve = 100
  const [visibleItems, setVisibleItems] = useState<InfinityListVisibleItemType<T>[]>(() =>
    items.map((value, index) => ({ value, index }))
  );

  const calcVisibleItems = () => {
    const newVisibleItems: InfinityListVisibleItemType<T>[] = [];
    const rootRect = root.current.getBoundingClientRect();
    const topSide = root.current.scrollTop - reserve;
    const bottomSide = topSide + rootRect.height + reserve;
    items.forEach((value, i) => {
      const itemTop = i * itemHeight;
      const itemBottom = (i + 1) * itemHeight;
      if (itemTop < topSide && itemBottom < topSide) return;
      if (itemTop > bottomSide && itemBottom > bottomSide) return;

      newVisibleItems.push({ value, index: i });
    });

    setVisibleItems((v) => (isEqualItems(v, newVisibleItems) ? v : newVisibleItems));
  };

  const onStart = () => {
    return new Promise((resolve) => {
      setTimeout(() => {

        setItems((v: any[]) => {
          const min = v[0];
          return [
            ...Array(count)
              .fill('')
              .map((_, i) => min - i - 1)
              .reverse(),
            ...v,
          ];
        });
        setTimeout(resolve);
      }, 200);
    });
  }
  const applied = useRef<{ end: boolean; start: boolean }>({ end: false, start: false });

  const handleInfinityScroll = () => {
    const rootRect = root.current.getBoundingClientRect();
    const holderRect = holder.current.getBoundingClientRect();
    const bottomDiff = holderRect.bottom - rootRect.bottom;
    const topDiff = rootRect.top - holderRect.top;
    if (prevScrollTop.current !== null) {
      if (prevScrollTop.current < root.current.scrollTop && bottomDiff <= reserve) {
        if (applied.current.end) return;
        applied.current.end = true;
        setItems((v: string | any[]) => {
          const max = v[v.length - 1];
          return [
            ...v,
            ...Array(count)
              .fill('')
              .map((_, i) => max + i + 1),
          ];
        })
        applied.current.end = false;
      } else if (prevScrollTop.current > root.current.scrollTop && topDiff <= reserve) {
        if (applied.current.end) return;

        applied.current.end = true;
        onStart().then(() => {
          applied.current.end = false;
          root.current.scrollBy({ top: holder.current.getBoundingClientRect().height - holderRect.height });

        })

      }
    }
    prevScrollTop.current = root.current.scrollTop;
  };

  const commonCalc = useCallback(() => {
    calcVisibleItems();
    handleInfinityScroll();
  }, [visibleItems]);

  useLayoutEffect(commonCalc, [items, itemHeight, commonCalc]);


  useLayoutEffect(() => {
    let timeoutId: number;
    const fn = () => {
      cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(commonCalc);
    };
    const observer = new ResizeObserver(fn);

    observer.observe(root.current);

    return () => observer.disconnect();
  }, [commonCalc]);

  useImperativeHandle(innerRef, () => ({
    scrollTo: (index: number) => root.current.scrollTo({ top: index * itemHeight }),
  }));

  return (
    <div {...props} ref={root} className={cn(s.root, 'InfinityList', className)} onScroll={commonCalc}>
      <div ref={holder} style={{ height: itemHeight * items.length }} className={cn(s.holder, 'InfinityList__holder')}>
        {visibleItems.map((item) => {
          return (
            <div className={cn(s.item, 'InfinityList__item')} style={{ height: itemHeight, top: itemHeight * item.index }} key={item.index}>
              <ItemElement data={item.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};