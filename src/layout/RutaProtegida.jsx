import { Outlet, Navigate } from "react-router-dom"
import Footer from "../componentes/Footer";
import Header from "../componentes/Header";
import useAuth from "./../hooks/useAuth"

const RutaProtegida = () => {

  const {auth, cargando} = useAuth();

  
  if (cargando) return 'cargando...';
  
  return (
    <>
      <Header />
      {
        auth?.valido? (
          <main className="container mt-10 mx-auto">
            <Outlet />
          </main>
        ):<Navigate to="/" />
      }
      <Footer />
    </>
  )
}

export default RutaProtegida