import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import MonthlyFees from './pages/MonthlyFees';
import YearlyFees from './pages/YearlyFees';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly-fees" element={<MonthlyFees />} />
        <Route path="/yearly-fees" element={<YearlyFees />} />
      </Routes>
    </Layout>
  );
}

export default App;