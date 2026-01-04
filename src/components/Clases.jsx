import React, { useState } from 'react';
import { Calendar, Clock, Save, X, CheckCircle, Pencil, Trash2, Plus } from 'lucide-react';

// RECIBE LAS CLASES Y LA FUNCIÓN PARA ACTUALIZARLAS
const Clases = ({ clases, setClases }) => {
  const [showForm, setShowForm] = useState(false);

  const initialFormState = { id: null, alumno: '', caballo: '', disciplina: 'Doma', fecha: '', hora: '', estado: 'Pendiente' };
  const [nuevaClase, setNuevaClase] = useState(initialFormState);

  // --- LOGICA MODIFICADA PARA USAR PROPS ---
  const handleGuardar = (e) => {
    e.preventDefault();
    if(!nuevaClase.alumno || !nuevaClase.caballo) return;

    if (nuevaClase.id) {
      const clasesActualizadas = clases.map(clase => clase.id === nuevaClase.id ? nuevaClase : clase);
      setClases(clasesActualizadas); // Actualiza App.jsx
    } else {
      const claseRegistrada = { ...nuevaClase, id: Date.now(), estado: 'Pendiente' };
      setClases([claseRegistrada, ...clases]); // Actualiza App.jsx
    }
    handleCancelar();
  };

  const handleBorrar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este registro?')) {
      const listaFiltrada = clases.filter(clase => clase.id !== id);
      setClases(listaFiltrada); // Actualiza App.jsx
    }
  };

  const handleEditar = (clase) => { setNuevaClase(clase); setShowForm(true); };
  const handleCancelar = () => { setShowForm(false); setNuevaClase(initialFormState); };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div><h2 className="text-2xl font-bold text-gray-800">Diario de Clases</h2><p className="text-gray-500">Registro de actividad y alumnos</p></div>
        <button onClick={() => { setShowForm(!showForm); setNuevaClase(initialFormState); }} className={`${showForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg`}>
          {showForm ? <><X size={18}/> Cerrar</> : <><Plus size={18}/> Nueva Clase</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500 mb-8 animate-fade-in-down">
          <h3 className="font-bold text-lg mb-4 text-gray-700">{nuevaClase.id ? 'Editar Clase' : 'Registrar Nueva Actividad'}</h3>
          <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm text-gray-500 mb-1">Alumno</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none" value={nuevaClase.alumno} onChange={(e) => setNuevaClase({...nuevaClase, alumno: e.target.value})} /></div>
            <div><label className="block text-sm text-gray-500 mb-1">Caballo Asignado</label><select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none" value={nuevaClase.caballo} onChange={(e) => setNuevaClase({...nuevaClase, caballo: e.target.value})}><option value="">Seleccionar Caballo...</option><option value="Trueno">Trueno</option><option value="Galleta">Galleta</option><option value="Spirit">Spirit</option><option value="Duque">Duque</option></select></div>
            <div><label className="block text-sm text-gray-500 mb-1">Disciplina</label><select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none" value={nuevaClase.disciplina} onChange={(e) => setNuevaClase({...nuevaClase, disciplina: e.target.value})}><option value="Doma">Doma Clásica</option><option value="Salto">Salto de Obstáculos</option><option value="Cross">Cross Country</option><option value="Paseo">Paseo / Ruta</option></select></div>
            <div className="grid grid-cols-2 gap-2">
              <div><label className="block text-sm text-gray-500 mb-1">Fecha</label><input type="date" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none" value={nuevaClase.fecha} onChange={(e) => setNuevaClase({...nuevaClase, fecha: e.target.value})} /></div>
              <div><label className="block text-sm text-gray-500 mb-1">Hora</label><input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none" value={nuevaClase.hora} onChange={(e) => setNuevaClase({...nuevaClase, hora: e.target.value})} /></div>
            </div>
            <div className="md:col-span-2 mt-4 flex justify-end gap-2">
              <button type="button" onClick={handleCancelar} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition">Cancelar</button>
              <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2 font-medium"><Save size={18} /> {nuevaClase.id ? 'Actualizar Cambios' : 'Guardar Registro'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr><th className="p-4 font-medium">Fecha / Hora</th><th className="p-4 font-medium">Alumno</th><th className="p-4 font-medium">Disciplina</th><th className="p-4 font-medium">Caballo</th><th className="p-4 font-medium">Estado</th><th className="p-4 font-medium text-right">Acciones</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clases.map((clase) => (
              <tr key={clase.id} className="hover:bg-gray-50 transition group">
                <td className="p-4"><div className="flex flex-col"><span className="font-bold text-gray-700 flex items-center gap-2"><Calendar size={14}/> {clase.fecha}</span><span className="text-sm text-gray-400 flex items-center gap-2"><Clock size={14}/> {clase.hora}</span></div></td>
                <td className="p-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{clase.alumno.charAt(0)}</div><span className="font-medium text-gray-700">{clase.alumno}</span></div></td>
                <td className="p-4"><span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{clase.disciplina}</span></td>
                <td className="p-4 text-emerald-600 font-medium">{clase.caballo}</td>
                <td className="p-4">{clase.estado === 'Completada' ? (<span className="text-green-600 flex items-center gap-1 text-sm"><CheckCircle size={14}/> Completada</span>) : (<span className="text-orange-500 flex items-center gap-1 text-sm">● Pendiente</span>)}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditar(clase)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Editar"><Pencil size={18} /></button>
                    <button onClick={() => handleBorrar(clase.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Borrar"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {clases.length === 0 && (<div className="p-8 text-center text-gray-500">No hay clases registradas. ¡Añade una nueva!</div>)}
      </div>
    </div>
  );
};
export default Clases;