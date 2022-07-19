import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import Alertas from './../componentes/Alertas';

const Login = () => {

  // Context API (variables globales)
  const {setAuth} = useAuth();
  // Estados de inputs
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alerta,setAlerta] = useState({});

  // Para redireccionar al usuario
  const navigate = useNavigate();
  
  const handleSubmit = async(e)=>{

    e.preventDefault();
    // Validar credenciales
      if ([email,password].includes('')) {
        setAlerta({mensaje:'Todos los campos son obligatorios',error:true});
        return;
      }
      
      // Peticion a backend de credenciales validas
      const datos = new FormData();
      datos.append('email', email);
      datos.append('password', password)

      try {
        const url = 'https://morning-sierra-05026.herokuapp.com/api/veterinarios/login';
        const respuesta = await fetch(url,{
          method:'POST',
          body:datos
        });
        const resultado = await respuesta.json();
        if (resultado.error === true) {
        setAlerta({mensaje:resultado.mensaje,error:resultado.error});
        return;
        }
        localStorage.setItem('token', resultado.mensaje);
        setAuth(resultado);
        // Redireccionamos a la pagina de admin
        navigate('/admin');
      } catch (error) {
        setAlerta({mensaje:'Algo salio mal :/, intente mas tarde',error:true});
      }
      // Vaciamos la alerta
      setAlerta({});      
  }
  const {mensaje} = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl text-center">
            Inicia Session y Administra tus <span className="text-black">Pacientes</span>
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
            <input type="submit" value="Iniciar Session" className="p-3 bg-indigo-700 w-full text-white
                  uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto rounded-xl"/>
          </form>

          <nav className="mt-10 justify-confirmar md:flex md:justify-around md:gap-2">
            <Link className="block text-center my-5 text-gray-500" to="/registrar-cuenta">¿No tienes una cuenta? Registrate</Link>
            <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login