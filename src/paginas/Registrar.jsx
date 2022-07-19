import {useState} from 'react';
import { Link } from "react-router-dom";
import Alertas from './../componentes/Alertas';
import axios from 'axios';

const Registrar = () => {

  const [nombre,setNombre] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [repetirPassword,setRepetirPassword] = useState('');

  const [alerta,setAlerta] = useState({});

  const handleSubmit = async (e)=>{
    e.preventDefault();
    

    if ([nombre,email,password,repetirPassword].includes('')) {
      setAlerta({mensaje:'Todos los campos son obligatorios',error:true});
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({mensaje:'Los password no son iguales',error:true});
      return;
    }
    if (password.length < 6) {
      setAlerta({mensaje:'El password es muy corto',error:true});
      return;
    }
    // Vaciamos el objeto
    setAlerta({});

    // Enviar datos
    const datos = new FormData();
    datos.append('nombre', nombre);
    datos.append('email', email);
    datos.append('password', password);
    try {
      const url = 'https://morning-sierra-05026.herokuapp.com/api/veterinarios';
      const respuesta = await fetch(url,{
        method:"POST",
        body:datos
      });
  
      const resultado = await respuesta.json();
      console.log(resultado.tipo);
      // Mensaje exito
      setAlerta({mensaje:resultado.mensaje,error:resultado.tipo});
    } catch (error) {
      console.log(error);
    }

  }

  const {mensaje} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
            Confirma tu cuenta y empieza a administrar tus pacientes <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-xl p-3 rounded-xl">
      {mensaje&&
        <Alertas
        alerta = {alerta}
        />
      }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className='uppercase block text-gray-600 text-xl font-bold'>Nombre</label>
            <input 
              value={nombre} 
              type="text" 
              placeholder="Tu nombre" 
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
              onChange={e=>setNombre(e.target.value)}
            />
          </div>
            <div className="my-5">
              <label className="uppercase block text-gray-600 text-xl font-bold">
                Email
              </label>
              <input 
                value={email}
                type="email" 
                placeholder="Tu email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase block text-gray-600 text-xl font-bold">
                Password
              </label>
              <input 
                value={password} 
                type="password" 
                placeholder="Tu password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase block text-gray-600 text-xl font-bold">
                Repetir Password
              </label>
              <input  
                value={repetirPassword} 
                type="password" 
                placeholder="Repetir password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                onChange={e=>setRepetirPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Iniciar Session" className="p-3 bg-indigo-700 w-full text-white
                  uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto rounded-xl"/>
          </form>
          <nav className="mt-10 justify-confirmar md:flex md:justify-around md:gap-2">
            <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Iniciar Session</Link>
            <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
          </nav>
      </div>
    </>
  )
}

export default Registrar