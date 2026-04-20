import { useState, useEffect } from 'react';
import * as userService from '../services/userService';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch {
      setError('Error al cargar usuarios');
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await userService.update(editing, form);
        setEditing(null);
      } else {
        await userService.create(form);
      }
      setForm({ name: '', email: '', role: '' });
      setError('');
      loadUsers();
    } catch {
      setError('Error al guardar usuario');
    }
  };

  const handleEdit = (user) => {
    setEditing(user.id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este usuario?')) {
      try {
        await userService.remove(id);
        loadUsers();
      } catch {
        setError('Error al eliminar usuario');
      }
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <h5>{editing ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
        <div className="row g-2">
          <div className="col-md-4">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-4">
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-4">
            <input name="role" placeholder="Rol" value={form.role} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary me-2">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', email: '', role: '' }); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(u)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;