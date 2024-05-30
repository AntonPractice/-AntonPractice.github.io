import React, { FC, useContext, useEffect, useState } from 'react';

import { DefaultButton } from '../Button/DefaultButton';
import { ThemeContext } from '../Provider/ThemeProvider';
import ModalPortal from '../ModalPortal/ModalPortal';

const ModalPortalButtoneus: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [val, setVal] = useState<string>('');
  const handleChahge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };
  const [theme] = useContext(ThemeContext);

  return (
    <div style={theme === 'dark' ? { backgroundColor: 'rgb(177, 189, 230)' } : {}}>
      <input value={val} onChange={(e) => handleChahge(e)} style={{ maxWidth: '200px' }} />
      <DefaultButton label={'Откройте модальное окно в портале'} onClick={() => setVisible(!visible)} />
      {visible && (
        <ModalPortal theme={theme} onClose={() => setVisible(!visible)}>
          <p>{val}</p>
        </ModalPortal>
      )}
    </div>
  );
};

export default ModalPortalButtoneus;
