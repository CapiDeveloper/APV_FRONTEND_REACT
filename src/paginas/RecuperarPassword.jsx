import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alertas from '../componentes/Alertas';

const RecuperarPassword = () => {

  const [password,setPassword] = useState('')
  const [alerta, setAlerta] = useState({});
  const [tokenValido,setTokenValido] = useState(false);
  const [passwordModificado,setPasswordModificado] = useState(false);

  //Leer parametro url
  const parametro = useParams();
  console.log(parametro.token);  

  useEffect(() => {
    const enviarToken = async()=>{
      const datos = new FormData();
      datos.append('token', parametro.token);
      const url = `http://localhost:4000/api/veterinarios/establecer-password?token=${parametro.token}`;
      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setAlerta({mensaje:resultado.mensaje,error:resultado.error});
        if (resultado.error === false) {
          setTokenValido(true);
          setPasswordModificado(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    enviarToken();
  }, [])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({mensaje:'El password debe ser minimo de 6 caracteres',error:true});
      return;
    }

    const data = new FormData();
    data.append('password', password);
    data.append('token', parametro.token);
    const enlace = 'http://localhost:4000/api/veterinarios/nuevo-password';
    
    try {
      const respuesta = await fetch(enlace,{
        method:'POST',
        body:data
      });
      const resultado = await respuesta.json();
      setAlerta({mensaje:resultado.mensaje,error:resultado.error});
    } catch (error) {
      setAlerta({mensaje:'No se logro cambiar la nueva contraseña',error:true});  
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
          {
            tokenValido&&(
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="uppercase block text-gray-600 text-xl font-bold">
                    Nuevo password
                  </label>
                  <input 
                    value={password}
                    type="password" 
                    placeholder="Tu nuevo password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    onChange={e=>setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Registrar nuevo password" className="p-3 bg-indigo-700 w-full text-white
                      uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto rounded-xl"/>
              </form>
            )
          }
          {passwordModificado&&
            <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Iniciar Session</Link>
          }
        </div>       
    </>
  )
}

export default RecuperarPassword