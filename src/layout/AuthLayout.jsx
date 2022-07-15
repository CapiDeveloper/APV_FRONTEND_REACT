import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <main className="mt-8 container mx-auto md:grid md:grid-cols-2 gap-10 items-center overflow-hidden h-full">
            <Outlet />
        </main>
    </>
    
  )
}

export default AuthLayout