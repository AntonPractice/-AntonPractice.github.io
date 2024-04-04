import React from 'react';
import './App.css';
import { TokenProvider } from './TokenProvider';
import { Navigation } from './navigation';
import { Modals } from './components/Modals';
import { ThemeProvider } from '../src/components/Provider/ThemeProvider';
import { I18nextProvider } from "react-i18next";
import i18n from '../src/localization/i18next_settings'

function App() {

  return (
    <TokenProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <Navigation>
            <Modals />
          </Navigation>
        </ThemeProvider>
      </I18nextProvider>
    </TokenProvider>
  );
}

export default App;
