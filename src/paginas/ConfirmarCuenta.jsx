import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { Link } from "react-router-dom";
import Alertas from './../componentes/Alertas';

const ConfirmarCuenta = () => {
  
  // Estado de mensaje
  const [cuentaConfirmada,setCuentaConfirmada] = useState(false);
  const [cargando,setCargando] = useState(true);
  const [alerta,setAlerta] = useState({});


  // Obtener parametro URL
  const params = useParams();
  const {token} = params;
  

  // Enviar url al backend en el momento que cargue la pagina
  useEffect(()=>{
      const confirmarCuenta = async()=>{
        try {
          const url = `http://localhost:4000/api/veterinarios/confirmar?token=${token}`;
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          console.log(resultado.detalle);
          setCuentaConfirmada(true);
          setAlerta({mensaje:resultado.detalle, error:resultado.valido});
        } catch (error) {
          console.log(error);
        }
        setCargando(false);
      }
      confirmarCuenta();
  },[]);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
            Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-xl p-3 rounded-xl'>
        {
          !cargando&&
          <Alertas
            alerta = {alerta}
          />
        }
        {
          cuentaConfirmada&&
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Iniciar Session</Link>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta