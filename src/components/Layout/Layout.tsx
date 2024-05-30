import React, { FC, HTMLProps, useContext } from 'react';
import { Header } from '../Header/Header';
import { ThemeContext } from '../Provider/ThemeProvider';
import Container from '@mui/material/Container';

export type ILayout = HTMLProps<HTMLDivElement>;

const Layout: FC<ILayout> = (props: ILayout) => {
  const [theme] = useContext(ThemeContext);
  return (
    <div
      style={
        theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)', minHeight: '1200px' } : { minHeight: '1200px' }
      }
    >
      <Container>
        <div>
          <Header />
          <div style={{ display: 'flex', justifyContent: 'center' }}>{props.children}</div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
