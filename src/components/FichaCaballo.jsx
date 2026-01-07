import React, { useState } from 'react';
import { ArrowLeft, Activity, Syringe, Hammer, Calendar, Save, Plus } from 'lucide-react';

const FichaCaballo = ({ caballo, onBack, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('veterinario'); // 'veterinario' o 'herraje'
  
  // Estado para nuevos registros
  const [nuevoRegistro, setNuevoRegistro] = useState({ fecha: '', tipo: '', notas: '' });

  const handleAgregarRegistro = (e) => {
    e.preventDefault();
    if (!nuevoRegistro.fecha || !nuevoRegistro.tipo) return;

    // Creamos una copia del caballo para modificarla
    const caballoActualizado = { ...caballo };

    const item = {
      id: Date.now(),
      fecha: nuevoRegistro.fecha,
      tipo: nuevoRegistro.tipo,
      notas: nuevoRegistro.notas
    };

    if (activeTab === 'veterinario') {
      caballoActualizado.veterinario = [item, ...(caballo.veterinario || [])];
    } else {
      caballoActualizado.herraje = [item, ...(caballo.herraje || [])];
    }

    onUpdate(caballoActualizado); // Guardamos en el estado global
    setNuevoRegistro({ fecha: '', tipo: '', notas: '' }); // Limpiamos formulario
  };

  return (
    <div className="animate-fade-in">
      {/* Botón Volver */}
      <button onClick={onBack} className="mb-4 flex items-center text-gray-500 hover:text-slate-900 transition">
        <ArrowLeft size={20} className="mr-2" /> Volver al listado
      </button>

      {/* Cabecera del Caballo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 h-64 rounded-lg overflow-hidden relative">
          <img src={caballo.imagen} alt={caballo.nombre} className="w-full h-full object-cover" />
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/90 backdrop-blur-sm shadow-sm ${caballo.estado === 'activo' ? 'text-emerald-600' : 'text-red-500'}`}>
            {caballo.estado}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{caballo.nombre}</h2>
              <p className="text-gray-500 text-lg">{caballo.raza} • {caballo.nivel}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg text-center">
              <span className="block text-xs text-gray-400 uppercase">Edad</span>
              <span className="font-bold text-xl text-slate-700">{caballo.edad || 8} años</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                   <Syringe size={18}/> Última Vacuna
                </h4>
                <p className="text-sm text-gray-600">
                  {caballo.veterinario && caballo.veterinario.length > 0 
                    ? caballo.veterinario[0].fecha 
                    : 'Sin registros'}
                </p>
             </div>
             <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <h4 className="flex items-center gap-2 text-orange-700 font-bold mb-2">
                   <Hammer size={18}/> Último Herraje
                </h4>
                <p className="text-sm text-gray-600">
                   {caballo.herraje && caballo.herraje.length > 0 
                    ? caballo.herraje[0].fecha 
                    : 'Sin registros'}
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Pestañas de Historial */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('veterinario')}
            className={`flex-1 p-4 font-medium flex items-center justify-center gap-2 transition ${activeTab === 'veterinario' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Activity size={18} /> Historial Veterinario
          </button>
          <button 
            onClick={() => setActiveTab('herraje')}
            className={`flex-1 p-4 font-medium flex items-center justify-center gap-2 transition ${activeTab === 'herraje' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Hammer size={18} /> Registro de Herrajes
          </button>
        </div>

        <div className="p-6">
          {/* Formulario Rápido */}
          <form onSubmit={handleAgregarRegistro} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase">
              {activeTab === 'veterinario' ? 'Añadir Visita Veterinaria / Vacuna' : 'Registrar Cambio de Herraduras'}
            </h4>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="date" required 
                className="p-2 border rounded-md focus:ring-2 focus:ring-slate-200 outline-none"
                value={nuevoRegistro.fecha}
                onChange={e => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})}
              />
              <input 
                type="text" required placeholder={activeTab === 'veterinario' ? "Ej: Vacuna Gripe y Tétanos" : "Ej: Herraje completo con widia"}
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-slate-200 outline-none"
                value={nuevoRegistro.tipo}
                onChange={e => setNuevoRegistro({...nuevoRegistro, tipo: e.target.value})}
              />
              <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 flex items-center justify-center gap-2">
                <Plus size={18} /> Añadir
              </button>
            </div>
          </form>

          {/* Línea de Tiempo (Timeline) */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {caballo[activeTab] && caballo[activeTab].map((item) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Icono Central */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {activeTab === 'veterinario' ? <Syringe size={16}/> : <Hammer size={16}/>}
                </div>
                
                {/* Tarjeta de Datos */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-800">{item.tipo}</span>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.fecha}</span>
                  </div>
                  {item.notas && <p className="text-sm text-gray-500 mt-2">{item.notas}</p>}
                </div>
              </div>
            ))}

            {(!caballo[activeTab] || caballo[activeTab].length === 0) && (
              <div className="text-center py-10 text-gray-400 italic">
                No hay registros en el historial.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaCaballo;