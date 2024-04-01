import React, { useLayoutEffect, useState, ReactNode } from 'react'
import * as styles from './styles.module.scss';

export interface CollapseProps {
  opened: boolean
  children: ReactNode
}

export const Collapse: React.FC<CollapseProps> = ({ opened, children }) => {
  const [height, setHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    setHeight(contentRef.current?.scrollHeight || null)
  }, [opened])

  const contentRef = React.createRef<HTMLDivElement>()

  const handleTransitionEnd = () => {
    if (!opened) {
      setHeight(null)
    }
  }

  return (
    <div
      style={{
        overflow: 'hidden',
        height: opened ? `${height}px` : '0',
        transition: 'height 0.8s ease',
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.collapse} ref={contentRef}>{children}</div>
    </div>
  )
}
