import { useState,useEffect } from "react";
import AdminNav from "../componentes/AdminNav";
import Alertas from "../componentes/Alertas";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const {guardarPassword} = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password,setPassword] = useState({
    pwd_actual:"",
    pwd_nuevo:"",
    pwd_repetir:""
  });
  
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(Object.values(password).some(valor=>valor === '') === true){
      setAlerta({mensaje:'Todos los campos son obligatorios',error:true});
      return;
    };

    if (password.pwd_nuevo.length < 6) {
      setAlerta({mensaje:'El nuevo password debe contener como monimo 6 caracteres',error:true});
      return;
    }

    if (password.pwd_nuevo !== password.pwd_repetir) {
      setAlerta({mensaje:'Los password deben ser iguales',error:true});
      return;
    }

    const resultado =  await guardarPassword(password);
    setAlerta({mensaje:resultado.mensaje,error:resultado.valido});
  }
  const {mensaje} = alerta;
  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Password aqui</span>
        </p>
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-5">
            <form onSubmit={handleSubmit} className="mb-5">
            <div className="my-3">
                <label htmlFor="Apassword" className="uppercase font-bold text-gray-600">Password Actual</label>
                <input 
                  type="password"
                  id="Apassword"
                  name="pwd_actual"
                  onChange={e=>setPassword({
                    ...password,
                    [e.target.name]:e.target.value
                  })}
                  placeholder="Escribe tu password actual"
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <div className="my-3">
                <label htmlFor="password" className="uppercase font-bold text-gray-600">Password Nuevo</label>
                <input 
                  type="password"
                  id="password"
                  name="pwd_nuevo"
                  onChange={e=>setPassword({
                    ...password,
                    [e.target.name]:e.target.value
                  })}
                  placeholder="Escribe un nuevo password"
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              <div className="my-3">
                <label htmlFor="Npassword" className="uppercase font-bold text-gray-600">Repetir Nuevo Password</label>
                <input 
                  type="password"
                  id="Npassword"
                  name="pwd_repetir"
                  onChange={e=>setPassword({
                    ...password,
                    [e.target.name]:e.target.value
                  })}
                  placeholder=" Pepetir Nuevo Password"
                  className="border bg-gray-200 w-full p-2 mt-5 rounded-lg"
                 />
              </div>
              
              <input 
                type="submit" 
                value={'Actualizar password'} 
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

export default CambiarPassword