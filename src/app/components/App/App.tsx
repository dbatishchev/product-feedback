import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import SuggestionsPage from '../../../features/feedback/pages/SuggestionsPage/SuggestionsPage';
import Sidebar from '../../../features/feedback/components/Sidebar/Sidebar';
import RoadmapPage from '../../../features/roadmap/pages/RoadmapPage';
import DetailsModal from '../../../features/feedback/components/DetailsModal/DetailsModal';
import CreateModal from '../../../features/feedback/components/CreateModal/CreateModal';
import EditModal from '../../../features/feedback/components/EditModal/EditModal';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <Layout aside={(<Sidebar />)}>
          <SuggestionsPage />
        </Layout>
      )}
    >
      <Route
        path="feedback"
      >
        <Route path="create" element={<CreateModal />} />
        <Route path=":id/edit" element={<EditModal />} />
        <Route path=":id" element={<DetailsModal />} />
      </Route>
    </Route>
    <Route
      path="/roadmap"
      element={(
        <Layout>
          <RoadmapPage />
        </Layout>
      )}
    />
  </Routes>
);

export default App;
