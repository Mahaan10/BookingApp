import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col border rounded-2xl w-96 mx-auto mt-8">
      <h2 className="font-bold text-xl mx-4 my-2">Login</h2>
      <form action="" className="mx-4 mb-2" onSubmit={submitHandler}>
        <div className="">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border p-2 rounded-lg w-full bg-slate-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="border p-2 rounded-lg w-full bg-slate-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className="w-full py-2 rounded-lg bg-sky-800 text-white hover:bg-sky-900">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
