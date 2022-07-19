import {useState,useEffect,createContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider =  ({children})=>{
    
    const [cargando,setCargando] = useState(true)
    const [auth,setAuth] = useState({});

    useEffect(() => {
        

        const autenticarUsuario = async()=>{

            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false)
                return;
            };

            const url = 'https://morning-sierra-05026.herokuapp.com/api/veterinarios/perfil';
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await axios(url,config);
                setAuth(data);
                console.log(data);
            } catch (error) {
                console.log('No se logra conectar al backend');
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    // Actualizar perfil
    const actualizarPerfil = async(veterinario)=>{
        let resultado = {
            mensaje:'',
            valido:true
        }
        const url = 'https://morning-sierra-05026.herokuapp.com/api/veterinarios/actualizar-perfil';
        const datos = new FormData();
        datos.append('id', veterinario.id);
        datos.append('nombre', veterinario.nombre);
        datos.append('email', veterinario.email);
        datos.append('telefono', veterinario.telefono);
        datos.append('web', veterinario.web);

        try {
            
            const {data} = await axios.post(url,datos);
                resultado = {
                mensaje:data.mensaje,
                valido:data.valido
            }
        } catch (error) {
                resultado = {
                mensaje:'No se ha podido actualizar su perfil, intentelo mas tarde',
                valido:true
            }
        }
        return resultado;
    }

    const guardarPassword = async(info)=>{

        const url = 'https://morning-sierra-05026.herokuapp.com/api/veterinarios/actualizar-password';

        const datos = new FormData();
        datos.append('actual', info.pwd_actual);
        datos.append('nuevo', info.pwd_nuevo);
        datos.append('id', auth.mensaje.id);

        let resultado = {
            mensaje:'',
            valido:true
        }

        try {
            const {data} = await axios.post(url,datos);
            resultado = {
                mensaje:data.mensaje,
                valido:data.valido
            }
        } catch (error) {
            resultado = {
                mensaje:'Comuniquese con soporte, hubo un problema',
                valido:true
            }
        }
        return resultado;
    }

    // Cerrar sesion
    const cerrarSession = ()=>{
        localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                actualizarPerfil,
                guardarPassword,
                cerrarSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext;