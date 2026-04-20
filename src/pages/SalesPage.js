import { useState, useEffect } from 'react';
import * as saleService from '../services/saleService';

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ userId: '', total: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const loadSales = async () => {
    try {
      const res = await saleService.getAll();
      setSales(res.data);
    } catch {
      setError('Error al cargar ventas');
    }
  };

  useEffect(() => { loadSales(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await saleService.update(editing, form);
        setEditing(null);
      } else {
        await saleService.create(form);
      }
      setForm({ userId: '', total: '' });
      setError('');
      loadSales();
    } catch {
      setError('Error al guardar venta');
    }
  };

  const handleEdit = (sale) => {
    setEditing(sale.id);
    setForm({ userId: sale.userId, total: sale.total });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta venta?')) {
      try {
        await saleService.remove(id);
        loadSales();
      } catch {
        setError('Error al eliminar venta');
      }
    }
  };

  return (
    <div>
      <h2>Ventas</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h5>{editing ? 'Editar Venta' : 'Nueva Venta'}</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <input name="userId" placeholder="ID Usuario" type="number" value={form.userId} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <input name="total" placeholder="Total" type="number" value={form.total} onChange={handleChange} className="form-control" required />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary me-2">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ userId: '', total: '' }); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Usuario ID</th><th>Fecha</th><th>Total</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.userId}</td>
              <td>{new Date(s.date).toLocaleDateString()}</td>
              <td>${s.total}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPage;