import Axios from "../services/apirest";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleLog from "../components/correoGoogle";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username)
      navigate("/admin")

    } catch (e) {
      setMessage(e.response?.data?.error || "Error en el inicio de sesion");
    }
  };

  return (
    <>
      <section className="bg-black min-h-screen flex items-center justify-center ">
        {/* Contenedor del  login */}
        <div className="inset-0 bg-white/10 backdrop-blur-md flex rounded-2xl shadow-lg max-w-3x1 p-5 w-4/5">
          <div className="sm:w-1/2 px-16 text-center">
            <h2 className="font-bold text-[40px] text-red-700">Login</h2>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4"
              action=""
            >
              <input
                className="bg-white p-2 mt-8 rounded-xl border text-gray-500"
                type="email"
                value={username}
                placeholder="username electrónico"
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="relative">
                <input
                  className="bg-white text-gray-500 p-2 mt-8 rounded-xl border w-full"
                  type="password"
                  value={password}
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <GoogleLog/>
              <button
                type="submit"
                className="bg-red-700 rounded-xl text-white py-2"
              >
                Ingresar
              </button>
            </form>

            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center ">or</p>
              <hr className="border-gray-500" />
            </div>
            <p className="text-sm mt-4 text-red-700">
              ¿Aun no tienes una cuenta? <Link to="/registro" className="text-red-700 underline">Registrarse</Link>
            </p>
            {message && <p className=" text-blue-500">{message}</p>}
          </div>

          <div className="w-1/2 sm:block hidden">
            <img
              className="rounded-2xl"
              src="https://i.pinimg.com/736x/9b/21/59/9b2159f63abe4b918c097db2ccff9308.jpg"
            ></img>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
