import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import './styles/index.css';
import './styles/components.css';
import './styles/dashboard.css';

/**
 * @component App
 * Root application entrypoint connecting theme, layout, and views.
 */
export function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const [isReloading, setIsReloading] = useState(false);

  const handleGlobalReload = () => {
    setIsReloading(true);
    setReloadKey((prev) => prev + 1);
    setTimeout(() => {
      setIsReloading(false);
    }, 700);
  };

  return (
    <Layout onReload={handleGlobalReload} isReloading={isReloading}>
      {/* Changing key causes clean hook remount and fresh network fetch */}
      <DashboardPage key={reloadKey} />
    </Layout>
  );
}

export default App;

