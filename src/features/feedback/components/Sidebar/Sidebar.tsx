import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import TagCloud from '../TagCloud/TagCloud';
import Paper from '../../../../app/components/Paper/Paper';
import Header from '../../../../app/components/Header/Header';
import Summary from '../../../roadmap/components/Summary/Summary';
import SideSheet from '../../../../app/components/SideSheet/SideSheet';
import { ReactComponent as Hamburger } from '../../../../app/icons/hamburger.svg';
import Close from '../../../../app/icons/close.svg';
import useMediaQuery from '../../../../app/hooks/useMediaQuery';

type SidebarProps = {
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [isSidesheetOpened, setIsSidesheetOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleToggleSideSheet = () => setIsSidesheetOpened(!isSidesheetOpened);

  const widgets = (
    <>
      <Paper className={styles.filters}>
        <TagCloud />
      </Paper>
      <Paper className={styles.summary}>
        <Summary />
      </Paper>
    </>
  );

  return (
    <div className={styles.sidebar}>
      <Header
        className={styles.header}
        controls={isMobile && (
          <button
            className={styles.headerBtn}
            onClick={handleToggleSideSheet}
          >
            {isSidesheetOpened ? <Close /> : <Hamburger />}
          </button>
        )}
      />

      {isMobile ? (
        <SideSheet opened={isSidesheetOpened} onClose={() => setIsSidesheetOpened(false)}>
          <div className={styles.widgetsWrapper}>
            {widgets}
          </div>
        </SideSheet>
      ) : widgets}
    </div>
  );
};

export default Sidebar;
