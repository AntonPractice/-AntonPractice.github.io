import React from 'react';
import './App.css';
import { TokenProvider } from './TokenProvider';
import { Navigation } from './navigation';
import { Modals } from './components/Modals';
import { ThemeProvider } from '../src/components/Provider/ThemeProvider';
import { I18nextProvider } from "react-i18next";
import i18n from '../src/localization/i18next_settings'
import { Provider } from 'react-redux';
import { store } from './store';
import { ClientProvider } from './client/ClientProvider';

function App() {

  return (
    <Provider store={store}>
      <TokenProvider>
        <ClientProvider>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider>
              <Navigation>
                <Modals />
              </Navigation>
            </ThemeProvider>
          </I18nextProvider>
        </ClientProvider>
      </TokenProvider>
    </Provider>
  );
}

export default App;
