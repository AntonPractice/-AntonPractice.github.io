import React from 'react';
import { Frame } from 'src/components/Frame';
import { Link } from 'react-router-dom';
import * as s from './styles.module.scss';

const NotFound: React.FC = () => (
  <div className={s.root}>
    <Frame>
      <div>404</div>
      <Link to=".">to Page</Link>
    </Frame>
  </div>
);

export default NotFound;
