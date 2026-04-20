import { useState, useEffect } from 'react';
import * as providerService from '../services/providerService';

function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const loadProviders = async () => {
    try {
      const res = await providerService.getAll();
      setProviders(res.data);
    } catch {
      setError('Error al cargar proveedores');
    }
  };

  useEffect(() => { loadProviders(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await providerService.update(editing, form);
        setEditing(null);
      } else {
        await providerService.create(form);
      }
      setForm({ name: '', phone: '', email: '', city: '' });
      setError('');
      loadProviders();
    } catch {
      setError('Error al guardar proveedor');
    }
  };

  const handleEdit = (provider) => {
    setEditing(provider.id);
    setForm({ name: provider.name, phone: provider.phone, email: provider.email, city: provider.city });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este proveedor?')) {
      try {
        await providerService.remove(id);
        loadProviders();
      } catch {
        setError('Error al eliminar proveedor');
      }
    }
  };

  return (
    <div>
      <h2>Proveedores</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h5>{editing ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3">
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3">
            <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary me-2">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', phone: '', email: '', city: '' }); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Ciudad</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {providers.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>{p.email}</td>
              <td>{p.city}</td>
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

export default ProvidersPage;