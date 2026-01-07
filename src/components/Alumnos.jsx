import React, { useState } from 'react';
import { User, Phone, Award, Search, Mail, AlertCircle, Plus, X, Pencil, Trash2 } from 'lucide-react';

// AHORA RECIBE LOS DATOS COMO PROPIEDADES (props)
const Alumnos = ({ alumnos, setAlumnos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialFormState = { id: null, nombre: '', nivel: 'Iniciación', telefono: '', email: '', saldo: 0, estado: 'Activo' };
  const [nuevoAlumno, setNuevoAlumno] = useState(initialFormState);
  const [busqueda, setBusqueda] = useState('');

  // --- YA NO HAY DATOS INVENTADOS AQUÍ ---

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nuevoAlumno.nombre) return;

    if (nuevoAlumno.id) {
      const actualizados = alumnos.map(al => al.id === nuevoAlumno.id ? nuevoAlumno : al);
      setAlumnos(actualizados); // Actualiza en App.jsx
    } else {
      // eslint-disable-next-line react-hooks/purity
      const nuevo = { ...nuevoAlumno, id: Date.now() };
      setAlumnos([nuevo, ...alumnos]); // Actualiza en App.jsx
    }
    cerrarModal();
  };

  const handleBorrar = (id) => {
    if (window.confirm('¿Seguro que quieres dar de baja a este alumno?')) {
      setAlumnos(alumnos.filter(a => a.id !== id));
    }
  };

  const abrirModalEditar = (alumno) => { setNuevoAlumno(alumno); setIsModalOpen(true); };
  const abrirModalCrear = () => { setNuevoAlumno(initialFormState); setIsModalOpen(true); };
  const cerrarModal = () => { setIsModalOpen(false); setNuevoAlumno(initialFormState); };

  const alumnosFiltrados = alumnos.filter(alumno => 
    alumno.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    alumno.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Listado de Jinetes</h2>
          <p className="text-gray-500">Gestión de alumnos y matrículas</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar alumno..." className="w-full pl-10 pr-4 py-2 border rounded-full bg-white focus:ring-2 focus:ring-emerald-200 outline-none" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
          <button onClick={abrirModalCrear} className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 flex items-center gap-2 transition shadow-lg whitespace-nowrap">
            <Plus size={20} /> <span className="hidden md:inline">Nuevo Alumno</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumnosFiltrados.map((alumno) => (
          <div key={alumno.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${alumno.estado === 'Activo' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
            <div className="absolute top-3 right-3 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded-lg shadow-sm">
              <button onClick={() => abrirModalEditar(alumno)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Pencil size={16} /></button>
              <button onClick={() => handleBorrar(alumno.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
            </div>
            <div className="flex justify-between items-start mb-4 mt-2">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${alumno.estado === 'Activo' ? 'bg-slate-800' : 'bg-gray-400'}`}>
                  {alumno.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{alumno.nombre}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${alumno.estado === 'Activo' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{alumno.estado}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600"><Award size={16} className="mr-2 text-purple-500" /><span className="font-medium">{alumno.nivel}</span></div>
              <div className="flex items-center text-sm text-gray-500"><Phone size={16} className="mr-2 text-gray-400" />{alumno.telefono || 'Sin teléfono'}</div>
              <div className="flex items-center text-sm text-gray-500"><Mail size={16} className="mr-2 text-gray-400" />{alumno.email || 'Sin email'}</div>
            </div>
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
               <div className={`${alumno.saldo < 0 ? 'text-red-500 font-bold' : 'text-emerald-600 font-medium'}`}>Saldo: {alumno.saldo} €</div>
               {alumno.saldo < 0 && (<span className="flex items-center text-xs text-red-500 bg-red-50 px-2 py-1 rounded"><AlertCircle size={12} className="mr-1"/> Reclamar</span>)}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{nuevoAlumno.id ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
              <button onClick={cerrarModal} className="hover:bg-slate-700 p-1 rounded transition"><X size={20}/></button>
            </div>
            <form onSubmit={handleGuardar} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label><input required type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.nombre} onChange={(e) => setNuevoAlumno({...nuevoAlumno, nombre: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label><select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.nivel} onChange={(e) => setNuevoAlumno({...nuevoAlumno, nivel: e.target.value})}><option value="Iniciación">Iniciación</option><option value="Galope 1">Galope 1</option><option value="Galope 2">Galope 2</option><option value="Galope 3">Galope 3</option><option value="Galope 4">Galope 4</option><option value="Competición">Competición</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Estado</label><select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.estado} onChange={(e) => setNuevoAlumno({...nuevoAlumno, estado: e.target.value})}><option value="Activo">Activo</option><option value="Baja Temporal">Baja Temporal</option><option value="Baja Definitiva">Baja Definitiva</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label><input type="tel" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.telefono} onChange={(e) => setNuevoAlumno({...nuevoAlumno, telefono: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Saldo (€)</label><input type="number" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.saldo} onChange={(e) => setNuevoAlumno({...nuevoAlumno, saldo: Number(e.target.value)})} /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={nuevoAlumno.email} onChange={(e) => setNuevoAlumno({...nuevoAlumno, email: e.target.value})} /></div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={cerrarModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-md font-medium">{nuevoAlumno.id ? 'Guardar Cambios' : 'Crear Alumno'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Alumnos;