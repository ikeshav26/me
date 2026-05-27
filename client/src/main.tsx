import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Analytics } from '@vercel/analytics/react';
import "nprogress/nprogress.css";
import "./index.css";

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>
);
