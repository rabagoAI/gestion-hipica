import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users, LayoutDashboard, Menu, X, Settings, Info } from 'lucide-react';

// Importamos los componentes hijos
import Caballos from './components/Caballos';
import Clases from './components/Clases';
import Alumnos from './components/Alumnos';

// --- COMPONENTE DASHBOARD (Vista Principal) ---
const DashboardView = ({ clasesHoy, caballosActivos, totalAlumnos, proximaClase }) => (
  <>
    <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Panel de Control</h2>
        {/* PUNTO 2: Frase de valor comercial */}
        <p className="text-gray-500 mt-1">Control total de caballos, alumnos y clases en una sola pantalla.</p>
      </div>
      <div className="bg-white p-2 rounded-full shadow-sm flex items-center gap-3 px-4">
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-gray-700">Usuario Demo</p>
          <p className="text-[10px] text-gray-400">Administrador</p>
        </div>
        <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
          AD
        </span>
      </div>
    </header>

    {/* KPIs / Métricas */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Clases Hoy</p>
            <p className="text-2xl font-bold text-gray-800">{clasesHoy}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Caballos Activos</p>
            <p className="text-2xl font-bold text-gray-800">{caballosActivos}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <Award className="text-emerald-500" size={24} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Alumnos Totales</p>
            <p className="text-2xl font-bold text-gray-800">{totalAlumnos}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Users className="text-purple-500" size={24} />
          </div>
        </div>
      </div>
    </div>

    {/* Próxima Clase */}
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <ClockIcon /> Próxima Clase Agendada
      </h3>
      {proximaClase ? (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-lg border border-gray-100">
              {proximaClase.hora}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">{proximaClase.disciplina}</p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-slate-700">{proximaClase.alumno}</span> con 
                <span className="font-medium text-emerald-600"> {proximaClase.caballo}</span>
              </p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${proximaClase.estado === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {proximaClase.estado === 'Pendiente' ? '⏳ Pendiente' : '✅ Completada'}
          </span>
        </div>
      ) : (
          <p className="text-gray-500 italic">No hay clases pendientes próximas.</p>
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
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}>
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-800">
          {/* Nombre genérico o personalizable para la demo */}
          {isSidebarOpen && <h1 className="text-lg font-bold text-emerald-400 tracking-tight">Gestión Hípica</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded text-gray-400 hover:text-white transition">
            {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        
        <nav className="flex-1 mt-6 px-2 space-y-1">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center px-3 py-3 cursor-pointer rounded-lg transition-all duration-200 group ${currentView === item.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <div className={`${currentView === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{item.icon}</div>
              {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.name}</span>}
            </div>
          ))}
        </nav>

        {/* PUNTO 3: Mensaje de Adaptabilidad (Footer del Sidebar) */}
        {isSidebarOpen && (
          <div className="p-4 m-4 rounded-xl bg-slate-800 border border-slate-700">
            <div className="flex items-start gap-3 mb-2">
              <Settings className="text-emerald-400 mt-1" size={16} />
              <p className="text-xs text-gray-300 font-medium">Software Adaptable</p>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              ¿Necesitas funciones extra? Esta plataforma se personaliza según las necesidades de tu club.
            </p>
          </div>
        )}
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* PUNTO 1: Banner "Modo Demo" */}
        <div className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 shadow-sm z-10">
          <Info size={14} className="text-indigo-200" />
          <span>MODO DEMO: Visualización con datos ficticios • Listo para implementar en tu club</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
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
          </div>
        </div>
      </main>
    </div>
  );
}

// Icono auxiliar para el dashboard
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

export default App;