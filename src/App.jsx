import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users, LayoutDashboard, Menu, X } from 'lucide-react';

// Importamos los componentes hijos
import Caballos from './components/Caballos';
import Clases from './components/Clases';
import Alumnos from './components/Alumnos';

// --- 1. MOVIDO FUERA: El componente DashboardView ahora vive fuera de App ---
// Recibe los datos necesarios como "props" en lugar de leerlos de variables locales
const DashboardView = ({ clasesHoy, caballosActivos, totalAlumnos, proximaClase }) => (
  <>
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Bienvenido de nuevo</h2>
        <p className="text-gray-500">Resumen de la actividad del club hoy</p>
      </div>
      <div className="bg-white p-2 rounded-full shadow-sm">
        <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
          AD
        </span>
      </div>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Clases Hoy</p>
            <p className="text-2xl font-bold">{clasesHoy}</p>
          </div>
          <Calendar className="text-blue-500" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Caballos Activos</p>
            <p className="text-2xl font-bold">{caballosActivos}</p>
          </div>
          <Award className="text-emerald-500" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Alumnos Totales</p>
            <p className="text-2xl font-bold">{totalAlumnos}</p>
          </div>
          <Users className="text-purple-500" />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Próxima Clase Agendada</h3>
      {proximaClase ? (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {proximaClase.hora}
            </div>
            <div>
              <p className="font-bold text-gray-800">{proximaClase.disciplina} - {proximaClase.caballo}</p>
              <p className="text-sm text-gray-500">Alumno: {proximaClase.alumno} • {proximaClase.fecha}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${proximaClase.estado === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {proximaClase.estado}
          </span>
        </div>
      ) : (
          <p className="text-gray-500">No hay clases pendientes próximas.</p>
      )}
    </div>
  </>
);

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  // --- DATOS INICIALES ---
  const initialCaballos = [
    { 
      id: 1, nombre: 'Trueno', raza: 'Pura Raza Española', nivel: 'Avanzado', estado: 'activo', edad: 9, 
      imagen: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=300&h=200',
      veterinario: [
        { id: 101, fecha: '2023-10-01', tipo: 'Vacuna Influenza', notas: 'Todo correcto' },
        { id: 102, fecha: '2023-06-15', tipo: 'Desparasitación', notas: 'Pasta oral' }
      ],
      herraje: [
        { id: 201, fecha: '2023-11-20', tipo: 'Herraje completo', notas: 'Cascos delanteros un poco secos' }
      ]
    },
    { id: 2, nombre: 'Galleta', raza: 'Pony Shetland', nivel: 'Iniciación', estado: 'descanso', edad: 14, imagen: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=300&h=200', veterinario: [], herraje: [] },
    { id: 3, nombre: 'Spirit', raza: 'Mustang', nivel: 'Intermedio', estado: 'lesionado', edad: 7, imagen: 'https://images.unsplash.com/photo-1534008453488-5c42a2754641?auto=format&fit=crop&q=80&w=300&h=200', veterinario: [], herraje: [] },
    { id: 4, nombre: 'Duque', raza: 'Hannoveriano', nivel: 'Salto Competición', estado: 'activo', edad: 10, imagen: 'https://images.unsplash.com/photo-1551884831-bbf3ddd77535?auto=format&fit=crop&q=80&w=300&h=200', veterinario: [], herraje: [] },
  ];

  const hoy = new Date().toISOString().split('T')[0];
  const initialClases = [
    { id: 1, fecha: hoy, hora: '16:00', alumno: 'Sofía Martín', caballo: 'Trueno', disciplina: 'Doma', estado: 'Completada' },
    { id: 2, fecha: hoy, hora: '17:00', alumno: 'Javi Ruiz', caballo: 'Duque', disciplina: 'Salto', estado: 'Completada' },
    { id: 3, fecha: '2025-12-25', hora: '10:00', alumno: 'Elena V.', caballo: 'Galleta', disciplina: 'Paseo', estado: 'Pendiente' },
  ];

  const initialAlumnos = [
    { id: 1, nombre: 'Ana García', nivel: 'Galope 4', telefono: '600 123 456', email: 'ana@email.com', saldo: 20, estado: 'Activo' },
    { id: 2, nombre: 'Carlos Ruiz', nivel: 'Principiante', telefono: '611 222 333', email: 'carlos@email.com', saldo: -45, estado: 'Activo' },
    { id: 3, nombre: 'Lucía M.', nivel: 'Competición', telefono: '699 888 777', email: 'lucia@email.com', saldo: 0, estado: 'Baja Temporal' },
  ];

  // --- PERSISTENCIA ---
  const loadData = (key, initial) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  };

  const [caballos, setCaballos] = useState(() => loadData('caballos', initialCaballos));
  const [clases, setClases] = useState(() => loadData('clases', initialClases));
  const [alumnos, setAlumnos] = useState(() => loadData('alumnos', initialAlumnos));

  useEffect(() => { localStorage.setItem('caballos', JSON.stringify(caballos)); }, [caballos]);
  useEffect(() => { localStorage.setItem('clases', JSON.stringify(clases)); }, [clases]);
  useEffect(() => { localStorage.setItem('alumnos', JSON.stringify(alumnos)); }, [alumnos]);

  // --- CÁLCULOS DEL DASHBOARD ---
  const clasesHoy = clases.filter(c => c.fecha === hoy).length;
  const caballosActivos = caballos.filter(c => c.estado === 'activo').length;
  const totalAlumnos = alumnos.length;
  const proximaClase = clases.filter(c => c.estado === 'Pendiente').sort((a,b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora))[0];

  const menuItems = [
    { id: 'dashboard', name: 'Panel Principal', icon: <LayoutDashboard size={20} /> },
    { id: 'caballos', name: 'Mis Caballos', icon: <Award size={20} /> },
    { id: 'alumnos', name: 'Alumnos', icon: <Users size={20} /> },
    { id: 'calendario', name: 'Calendario Clases', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold text-emerald-400">Club Hípico</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${currentView === item.id ? 'bg-slate-800 border-r-4 border-emerald-400' : 'hover:bg-slate-800'}`}
            >
              <div className={currentView === item.id ? 'text-emerald-400' : 'text-gray-400'}>{item.icon}</div>
              {isSidebarOpen && <span className="ml-4 font-medium">{item.name}</span>}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* CORRECCIÓN: Ahora pasamos los datos como props */}
        {currentView === 'dashboard' && (
          <DashboardView 
            clasesHoy={clasesHoy}
            caballosActivos={caballosActivos}
            totalAlumnos={totalAlumnos}
            proximaClase={proximaClase}
          />
        )}
        
        {currentView === 'caballos' && <Caballos data={caballos} setCaballos={setCaballos} />}
        {currentView === 'alumnos' && <Alumnos alumnos={alumnos} setAlumnos={setAlumnos} />}
        {currentView === 'calendario' && <Clases clases={clases} setClases={setClases} />}
      </main>
    </div>
  );
}

export default App;