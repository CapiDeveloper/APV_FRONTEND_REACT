import { useState,useEffect } from "react"
import Alertas from "../componentes/Alertas";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    // Inputs
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [id,setId] = useState(null);
    // alerta
    const [alerta,setAlerta] = useState({});

    // Paciente Provider
    const {guardarPaciente,paciente} = usePacientes();

    
    useEffect(() => {
        if (paciente?.id) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setTelefono(paciente.telefono);
            setFecha(paciente.fecha);
            setHora(paciente.hora);
            setSintomas(paciente.sintomas);
            setId(paciente.id);
        }
    }, [paciente])


    // Submit form
    const handle = (e)=>{
        
        e.preventDefault();
        if ([nombre,propietario,email,telefono,fecha,hora,sintomas].includes('')) {
            setAlerta({mensaje:'Todos los campos son obligatorios',error:true});
            return;
        }
        setAlerta({});

        guardarPaciente({id,nombre,propietario,email,telefono,fecha,hora,sintomas});
        
    }
    const {mensaje} = alerta;
    return (
    <>
        <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
        <p className="text-xl mt-2 mb-10 text-center">Añade tus pacientes y <span className="font-bold text-indigo-600"> administralos</span></p>
        
        <form 
            className="bg-white py-10 px-5 mb-10 md:mb-5 shadow-2xl rounded-md"
            onSubmit={handle}
        >
            <div className="mb-5 pt-5">
                <label 
                    htmlFor="mascota" 
                    className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                    type="text" 
                    id="mascota"
                    autoComplete="off"
                    placeholder="Nombre de la mascota"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="propietario" 
                    className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input 
                    value={propietario}
                    onChange={e=>setPropietario(e.target.value)}
                    type="text" 
                    id="propietario"
                    autoComplete="off"
                    placeholder="Nombre del propietario"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email" 
                    className="text-gray-700 uppercase font-bold">Email Propietario</label>
                <input 
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    type="email" 
                    id="email"
                    autoComplete="off"
                    placeholder="Email"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div> 
            <div className="mb-5">
                <label 
                    htmlFor="telefono" 
                    className="text-gray-700 uppercase font-bold">Telefono</label>
                <input 
                    value={telefono}
                    onChange={e=>setTelefono(e.target.value)}
                    type="tel" 
                    id="telefono"
                    autoComplete="off"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fecha" 
                    className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input 
                    value={fecha}
                    onChange={e=>setFecha(e.target.value)}
                    type="date" 
                    id="fecha"
                    autoComplete="off"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="hora" 
                    className="text-gray-700 uppercase font-bold">Hora</label>
                <input 
                    value={hora}
                    onChange={e=>setHora(e.target.value)}
                    type="time"
                    id="hora"
                    autoComplete="off"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas" 
                    className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea 
                    value={sintomas}
                    onChange={e=>setSintomas(e.target.value)}
                    id="sintomas"
                    autoComplete="off"
                    placeholder="Describe los sintomas"
                    className="border-2 p-2 w-full mt-2 rounded-md border-indigo-300 placeholder-gray-400"
                />
            </div>
            <input type="submit" value={id?'Guardar cambios':'Crear Paciente'} className="bg-indigo-600 text-white p-3 w-full uppercase font-bold cursor-pointer hover:bg-indigo-800 transition-colors" />
        </form>
        {
            mensaje&&
                <Alertas 
                alerta={alerta}
            />
        }
    </>
  )
}

export default Formulario