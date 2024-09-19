import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { PhotoProvider } from './context';

const root = createRoot(document.querySelector('#root'));
root.render(
  <PhotoProvider>
    <App />
  </PhotoProvider>,
);
