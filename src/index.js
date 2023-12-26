import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { Provider } from 'react-redux';
import { persistor, store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <Suspense fallback={<Spin />}>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </Suspense>
    </PersistGate>
  </Provider>
);
