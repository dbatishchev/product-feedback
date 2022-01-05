import React from 'react';
import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode,
  aside?: React.ReactNode
};

const Layout: React.FC<LayoutProps> = ({ aside, children }) => (
  <div className={`${styles.layout} ${aside ? styles.twoColumn : ''}`}>
    {aside && (
      <aside className={styles.aside}>
        {aside}
      </aside>
    )}
    <main className={styles.content}>
      {children}
    </main>
  </div>
);

export default Layout;
