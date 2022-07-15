import { useState } from "react";
import Formulario from "./Formulario";
import ListadoPacientes from "./ListadoPacientes";

const AdministrarPacientes = () => {
  

  const [mostrarFormulario,setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
      <button 
        className="bg-indigo-600 mb-8 text-white uppercase font-bold w-fit mx-auto
                  p-2 rounded-md hover:bg-indigo-800 md:hidden"
                  onClick={()=>setMostrarFormulario(!mostrarFormulario)}
                  >
          {`${mostrarFormulario? 'Ocultar Formulario': 'Mostrar Formulario'}`}
      </button>
      <div className={`${mostrarFormulario? 'block': 'hidden'} md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes;