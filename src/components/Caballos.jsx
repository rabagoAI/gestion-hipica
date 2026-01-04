import React from 'react';
import { Award, Heart, Activity } from 'lucide-react';

// AHORA RECIBE LOS CABALLOS DESDE EL PADRE
const Caballos = ({ data }) => {
  const getStatusColor = (estado) => {
    switch(estado) {
      case 'activo': return 'bg-emerald-100 text-emerald-700';
      case 'descanso': return 'bg-blue-100 text-blue-700';
      case 'lesionado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div><h2 className="text-2xl font-bold text-gray-800">Cuadra Principal</h2><p className="text-gray-500">Gestión de estados y perfiles</p></div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition">+ Nuevo Caballo</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((caballo) => (
          <div key={caballo.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
            <div className="h-40 overflow-hidden relative">
              <img src={caballo.imagen} alt={caballo.nombre} className="w-full h-full object-cover" />
              <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(caballo.estado)}`}>{caballo.estado}</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold text-gray-800">{caballo.nombre}</h3><Award size={18} className="text-yellow-500" /></div>
              <p className="text-sm text-gray-500 mb-4">{caballo.raza}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded"><Activity size={16} className="mr-2 text-blue-500" /><span>Nivel: {caballo.nivel}</span></div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded"><Heart size={16} className="mr-2 text-red-500" /><span>Salud: {caballo.estado === 'lesionado' ? 'Revisión necesaria' : 'Óptima'}</span></div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium">Ver Ficha Técnica</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Caballos;