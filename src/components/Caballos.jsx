import React, { useState } from 'react';
import { Award, Heart, Activity, Plus, X, Pencil, Trash2, Save } from 'lucide-react';
import FichaCaballo from './FichaCaballo';

const Caballos = ({ data, setCaballos }) => {
  
  // Estado para ver la ficha detallada (Historial Médico)
  const [selectedHorse, setSelectedHorse] = useState(null);

  // Estado para el Modal de Crear/Editar (Datos Básicos)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const initialFormState = {
    id: null,
    nombre: '',
    raza: '',
    nivel: 'Iniciación',
    estado: 'activo',
    edad: '',
    imagen: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=300&h=200',
    veterinario: [],
    herraje: []
  };

  const [nuevoCaballo, setNuevoCaballo] = useState(initialFormState);

  // --- LÓGICA CRUD (Datos Básicos) ---

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nuevoCaballo.nombre) return;

    if (nuevoCaballo.id) {
      // EDITAR
      const actualizados = data.map(c => 
        c.id === nuevoCaballo.id ? { ...c, ...nuevoCaballo } : c
      );
      setCaballos(actualizados);
    } else {
      // CREAR
      // eslint-disable-next-line react-hooks/purity
      const nuevo = { ...nuevoCaballo, id: Date.now() };
      setCaballos([nuevo, ...data]);
    }
    cerrarModal();
  };

  const handleBorrar = (id, e) => {
    e.stopPropagation(); // Evita que se abra la ficha técnica al borrar
    if (window.confirm('¿Seguro que quieres eliminar este caballo de la cuadra?')) {
      setCaballos(data.filter(c => c.id !== id));
    }
  };

  const abrirModalEditar = (caballo, e) => {
    e.stopPropagation(); // Evita que se abra la ficha técnica al editar
    setNuevoCaballo(caballo);
    setIsModalOpen(true);
  };

  const abrirModalCrear = () => {
    setNuevoCaballo(initialFormState);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNuevoCaballo(initialFormState);
  };

  // --- LÓGICA FICHA TÉCNICA (Historial) ---

  const handleUpdateHorseFromFicha = (caballoActualizado) => {
    const listaActualizada = data.map(c => 
      c.id === caballoActualizado.id ? caballoActualizado : c
    );
    setCaballos(listaActualizada);
    setSelectedHorse(caballoActualizado);
  };

  // Si hay un caballo seleccionado, mostramos su ficha técnica
  if (selectedHorse) {
    return (
      <FichaCaballo 
        caballo={selectedHorse} 
        onBack={() => setSelectedHorse(null)}
        onUpdate={handleUpdateHorseFromFicha}
      />
    );
  }

  // --- VISTA PRINCIPAL (LISTADO) ---
  
  const getStatusColor = (estado) => {
    switch(estado) {
      case 'activo': return 'bg-emerald-100 text-emerald-700';
      case 'descanso': return 'bg-blue-100 text-blue-700';
      case 'lesionado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 relative">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cuadra Principal</h2>
          <p className="text-gray-500">Gestión de estados y perfiles</p>
        </div>
        <button 
          onClick={abrirModalCrear}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition"
        >
          <Plus size={20} /> Nuevo Caballo
        </button>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((caballo) => (
          <div key={caballo.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden group relative">
            
            {/* Imagen y Estado */}
            <div className="h-40 overflow-hidden relative">
              <img src={caballo.imagen} alt={caballo.nombre} className="w-full h-full object-cover" />
              <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(caballo.estado)}`}>
                {caballo.estado}
              </span>

              {/* BOTONES DE EDICIÓN (Aparecen al pasar el mouse) */}
              <div className="absolute top-3 left-3 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => abrirModalEditar(caballo, e)} 
                  className="p-1.5 bg-white/90 text-blue-600 hover:text-blue-700 rounded shadow-sm backdrop-blur-sm" 
                  title="Editar Datos"
                >
                  <Pencil size={16} />
                </button>
                <button 
                  onClick={(e) => handleBorrar(caballo.id, e)} 
                  className="p-1.5 bg-white/90 text-red-500 hover:text-red-600 rounded shadow-sm backdrop-blur-sm" 
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            {/* Información */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{caballo.nombre}</h3>
                <Award size={18} className="text-yellow-500" />
              </div>
              <p className="text-sm text-gray-500 mb-4">{caballo.raza} • {caballo.edad} años</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <Activity size={16} className="mr-2 text-blue-500" />
                  <span>Nivel: {caballo.nivel}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <Heart size={16} className="mr-2 text-red-500" />
                  <span>Salud: {caballo.estado === 'lesionado' ? 'Revisión' : 'Óptima'}</span>
                </div>
              </div>

              {/* Botón principal: Ver Historial Médico */}
              <button 
                onClick={() => setSelectedHorse(caballo)}
                className="w-full mt-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium"
              >
                Ver Historial Médico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (Crear / Editar) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{nuevoCaballo.id ? 'Editar Caballo' : 'Nuevo Caballo'}</h3>
              <button onClick={cerrarModal} className="hover:bg-slate-700 p-1 rounded transition"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleGuardar} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Caballo</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={nuevoCaballo.nombre}
                  onChange={(e) => setNuevoCaballo({...nuevoCaballo, nombre: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={nuevoCaballo.raza}
                    onChange={(e) => setNuevoCaballo({...nuevoCaballo, raza: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={nuevoCaballo.edad}
                    onChange={(e) => setNuevoCaballo({...nuevoCaballo, edad: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={nuevoCaballo.nivel}
                    onChange={(e) => setNuevoCaballo({...nuevoCaballo, nivel: e.target.value})}
                  >
                    <option value="Iniciación">Iniciación</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Competición">Competición</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={nuevoCaballo.estado}
                    onChange={(e) => setNuevoCaballo({...nuevoCaballo, estado: e.target.value})}
                  >
                    <option value="activo">Activo</option>
                    <option value="descanso">Descanso</option>
                    <option value="lesionado">Lesionado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={nuevoCaballo.imagen}
                  onChange={(e) => setNuevoCaballo({...nuevoCaballo, imagen: e.target.value})}
                />
                <p className="text-xs text-gray-400 mt-1">Usa una URL de una imagen pública.</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={cerrarModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-md font-medium flex items-center gap-2"
                >
                  <Save size={18} /> {nuevoCaballo.id ? 'Guardar Cambios' : 'Registrar Caballo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caballos;