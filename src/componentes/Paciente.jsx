import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
  
  const {id,nombre,propietario,email,fecha,hora,sintomas,telefono,veterinarioId} = paciente;

  // Formato de fecha
  const formatearFecha = (fechaBD)=>{
    const arrayFecha = fechaBD.split('-');
    const nuevaFecha = new Date(arrayFecha[0],arrayFecha[1],arrayFecha[2]);
    return new Intl.DateTimeFormat('es-ES',{dateStyle:'long'}).format(nuevaFecha);
  }
  
    const {actualizarPaciente,eliminarPaciente} = usePacientes();
    return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">

        <p className="font-bold uppercase text-indigo-800 my-2">Nombre:
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Propietario:
            <span className="font-normal normal-case text-black"> {propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Email Contacto:
            <span className="font-normal normal-case text-black"> {email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Fecha:
            <span className="font-normal normal-case text-black"> {fecha&&formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Sintomas:
            <span className="font-normal normal-case text-black"> {sintomas}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-5 my-5">
            <button 
            type="button"
            onClick={()=>actualizarPaciente(paciente)}
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg"
            >
                Editar
            </button>
            <button 
            type="button"
            onClick={()=>eliminarPaciente(id)}
            className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white font-bold uppercase rounded-lg"
            >
                Eliminar
            </button>
        </div>

    </div>
  )
}

export default Paciente