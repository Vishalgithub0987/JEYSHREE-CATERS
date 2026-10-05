import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { SelectionProvider } from './context/SelectionContext';
import { WebSocketProvider } from './context/WebSocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SelectionProvider>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
      </SelectionProvider>
    </AuthProvider>
  </React.StrictMode>
);
