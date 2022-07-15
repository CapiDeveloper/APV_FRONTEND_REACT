import {useState,useEffect,createContext} from "react";
import axios from "axios";

const PacientesContext = createContext();

export const PacientesProvider = ({children})=>{

    const [pacientes,setPacientes] = useState([]);
    const [paciente,setPaciente] = useState({});

    // Cuando cargue el DOM se cargaran los registros de pacientes
    useEffect(() => {
        const obtenerPacientes = async()=>{
            try {
               
                const token = localStorage.getItem('token');
                if(!token) return;

                // ** Realizar la consulta
                // Configuracion de permiso header
                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const url = 'http://localhost:4000/api/pacientes/listar';
                const {data} = await axios.get(url,config);

                setPacientes(data.mensaje);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [])
    

    // Funcion para guardar paciente
    const guardarPaciente = async({id,nombre,propietario,email,telefono,fecha,hora,sintomas})=>{

        const token = localStorage.getItem('token');

        const info = new FormData();
        info.append('nombre', nombre);
        info.append('propietario', propietario);
        info.append('email', email);
        info.append('telefono', telefono);
        info.append('fecha', fecha);
        info.append('hora', hora);
        info.append('sintomas', sintomas);

        if (id) {
            console.log(id);
            info.append('id', id);
        }else{
            info.append('id', '')
        }
        
        // Configuracion de permiso header
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const url = 'http://localhost:4000/api/pacientes/agregar';
            const {data} = await axios.post(url,info,config);

            if (data.actualizado === false) {
                setPacientes([data.mensaje,...pacientes]);
            }else{
                const pacientesActualizado = pacientes.map(pacienteState=> pacienteState.id === data.mensaje.id ? data.mensaje:pacienteState);
                setPacientes(pacientesActualizado);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // ActualizarPaciente
    const actualizarPaciente = (paciente)=>{
        setPaciente(paciente);
    }

    // Eliminar Paciente
    const eliminarPaciente = async(id)=>{
        const url = 'http://localhost:4000/api/pacientes/eliminar';
        const datos = new FormData();
        datos.append('id', id)

        const confirmar = confirm('¿Deseas eliminar la cita?');
        if(!confirmar)return;

        try {
            const resultado = await fetch(url,{
                method:'POST',
                body:datos
            });
            const respuesta = await resultado.json();
            if (respuesta.valido === true) {
                const pacienteseliminados = pacientes.filter(statePaciente=> statePaciente.id !== id );
                setPacientes(pacienteseliminados);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                paciente,
                guardarPaciente,
                actualizarPaciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}
export default PacientesContext;