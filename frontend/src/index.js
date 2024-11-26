// src/index.js (Cập nhật file cũ)
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux'; // Thêm dòng này
import App from './App';
import store from './redux/store'; // Thêm dòng này

import { createRoot } from 'react-dom/client';

// Tạo root mới
const root = createRoot(document.getElementById('root'));

// Sử dụng root.render thay vì ReactDOM.render
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
