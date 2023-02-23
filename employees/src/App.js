import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpList from './components/EmpList';
import EmpEdit from './components/EmpEdit';

function App() {

  return (
    <div className="App container text-center my-4">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<EmpList />} />

          <Route path='employee/edit/:id' element={<EmpEdit />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
