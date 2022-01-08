import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Contatos from './pages/contato';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contato" element={<Contatos />} />
    </Routes>
  );
};

export { MainRoutes };
