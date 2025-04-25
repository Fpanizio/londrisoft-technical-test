import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CompanyList />} />
      <Route path="/edit-company/:id" element={<CompanyForm />} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById('root')!).render(
    <App />
);

export default App;
