import { useState,useEffect } from "react";
import AdminNav from "../componentes/AdminNav";
import Alertas from "../componentes/Alertas";
import useAuth from "../hooks/useAuth";

const EditarPerfil = () => {

  const {auth,actualizarPerfil} = useAuth();
  
  const [perfil,setPerfil] = useState({});
  const [alerta,setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth.mensaje);
  }, [auth]);

  // submir form
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if ([perfil.nombre,perfil.email].includes('')) {
      setAlerta({mensaje:'Nombre y email son obligatorios',error:true});
      return;
    }
    const resultado = await actualizarPerfil(perfil);
    setAlerta({mensaje:resultado.mensaje,error:resultado.valido});
    console.log(resultado);
  }
  const {mensaje} = alerta;

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Informacion aqui</span>
        </p>
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-5">
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="my-3">
                <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                <input 
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={perfil.nombre || ''}
                  onChange={e=>setPerfil(
                    {
                      ...perfil,
                      [e.target.name] : e.target.value 
                    }
                  )}
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <div className="my-3">
                <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>
                <input 
                  type="text"
                  id="web"
                  name="web"
                  value={perfil.web || ''}
                  onChange={e=>setPerfil(
                    {
                      ...perfil,
                      [e.target.name] : e.target.value 
                    }
                  )}
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <div className="my-3">
                <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                <input 
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={perfil.telefono || ''}
                  onChange={e=>setPerfil(
                    {
                      ...perfil,
                      [e.target.name] : e.target.value 
                    }
                  )}
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <div className="my-3">
                <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={perfil.email || ''}
                  onChange={e=>setPerfil(
                    {
                      ...perfil,
                      [e.target.name] : e.target.value 
                    }
                  )}
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <input 
                type="submit" 
                value={'Guardar Cambios'} 
                className="cursor-pointer bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase
                mt-5 w-full"
              />
            </form>
            {
              mensaje &&
              <Alertas
                alerta={alerta}
              />
            }
          </div>
        </div>
    </>
  )
}

export default EditarPerfil