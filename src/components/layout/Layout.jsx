import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * @component Layout
 * Scaffolds the responsive shell: sidebar, fixed header, and scrollable content area.
 */
export function Layout({ children, onReload, isReloading }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="app-main">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onReload={onReload}
          isReloading={isReloading}
        />
        {children}
      </div>
    </div>
  );
}

