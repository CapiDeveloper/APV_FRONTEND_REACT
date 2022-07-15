const Alertas = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-500 to-red-600':'from-indigo-500 to-indigo-600'} bg-gradient-to-r p-2 rounded-xl text-center font-bold text-white uppercase text-sm`}>
        {alerta.mensaje}
        
    </div>
  )
}

export default Alertas