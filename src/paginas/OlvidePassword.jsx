import { useState } from "react";
import { Link } from "react-router-dom";
import Alertas from './../componentes/Alertas';

const OlvidePassword = () => {

  const [email,setEmail] = useState('');
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (email === '') {
      setAlerta({mensaje:'El email es obligatorio',error:true});
      return;
    }
    const url = 'http://localhost:4000/api/veterinarios/olvide-password';
    const datos = new FormData();
    datos.append('email', email)
    try {
      const respuesta = await fetch(url,{
        method:'POST',
        body:datos
      });
      const resultado = await respuesta.json();
      setAlerta({mensaje:resultado.mensaje,error:resultado.error});
    } catch (error) {
      console.log('error');
    }
  }
  const {mensaje} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
            Recupera tu acceso y no pierdas tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl p-3 rounded-xl">
          {
            mensaje&&
            <Alertas
              alerta = {alerta}
            />
          }
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase block text-gray-600 text-xl font-bold">
                Email
              </label>
              <input 
                value={email}
                type="email" 
                placeholder="Tu correo" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Recuperar Cuenta" className="p-3 bg-indigo-700 w-full text-white
                  uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto rounded-xl"/>
          </form>

          <nav className="mt-10 justify-confirmar md:flex md:justify-around md:gap-2">
            <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Iniciar Session</Link>
            <Link className="block text-center my-5 text-gray-500" to="/registrar-cuenta">¿No tienes una cuenta? Registrate</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword