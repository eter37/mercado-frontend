import { useState, useEffect } from 'react';
import * as productService from '../services/productService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '', providerId: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch {
      setError('Error al cargar productos');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await productService.update(editing, form);
        setEditing(null);
      } else {
        await productService.create(form);
      }
      setForm({ name: '', price: '', stock: '', providerId: '' });
      setError('');
      loadProducts();
    } catch {
      setError('Error al guardar producto');
    }
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({ name: product.name, price: product.price, stock: product.stock, providerId: product.providerId });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await productService.remove(id);
        loadProducts();
      } catch {
        setError('Error al eliminar producto');
      }
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h5>{editing ? 'Editar Producto' : 'Nuevo Producto'}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input name="price" placeholder="Precio" type="number" value={form.price} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input name="providerId" placeholder="ID Proveedor" type="number" value={form.providerId} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary me-2">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', price: '', stock: '', providerId: '' }); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Proveedor ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.providerId}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsPage;