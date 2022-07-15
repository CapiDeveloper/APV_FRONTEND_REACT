import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Layouts
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

// Rutas publicas
import Login from './paginas/login';
import Registrar from './paginas/registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import RecuperarPassword from './paginas/RecuperarPassword';

// Rutas paginas protegidas
import AdministrarPacientes from './admin/AdministrarPacientes';
import EditarPerfil from './admin/EditarPerfil';

// Context API
import {AuthProvider} from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import CambiarPassword from './admin/CambiarPassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas no protegidas */}
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path='registrar-cuenta' element={<Registrar/>} />
              <Route path='olvide-password' element={<OlvidePassword/>} />
              <Route path='recuperar-password/:token' element={<RecuperarPassword/>} />
              <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta/>} />
            </Route>
              {/* Rutas protejidas admin*/}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
          </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
