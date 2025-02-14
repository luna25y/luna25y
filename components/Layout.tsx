// Layout

import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* 左侧侧边栏 */}
      <aside className="sidebar">
        <Sidebar />
      </aside>
      {/* 右侧内容区域 */}
      <main className="main-content-scroll">
        <div className="main-content md:pl-64 sm:pl-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

