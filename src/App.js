import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import ProvidersPage from './pages/ProvidersPage';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <span className="navbar-brand">MarketSoft</span>
        <div className="navbar-nav">
          <Link className="nav-link" to="/products">Productos</Link>
          <Link className="nav-link" to="/users">Usuarios</Link>
          <Link className="nav-link" to="/providers">Proveedores</Link>
          <Link className="nav-link" to="/sales">Ventas</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;