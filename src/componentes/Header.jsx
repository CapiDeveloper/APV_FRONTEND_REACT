import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

  const {cerrarSession} = useAuth();

  return (
     <>
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row gap-4">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de pacientes de <span className="text-white font-black"> Veterinaria</span></h1>
                <nav className="flex flex-col lg:flex-row gap-4 items-center mt-4 lg:mt-0">
                    <Link className="text-white text-sm uppercase font-bold" to='/admin'>Pacientes</Link>
                    <Link className="text-white text-sm uppercase font-bold" to='/admin/perfil'>Perfil</Link>
                    <button onClick={cerrarSession} className="text-white text-sm uppercase font-bold bg-red-600 p-1 rounded-xl" type="button">Cerrar Session</button>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Header