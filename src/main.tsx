import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './contexts/AppContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </AppProvider>
    </React.StrictMode>,
);
