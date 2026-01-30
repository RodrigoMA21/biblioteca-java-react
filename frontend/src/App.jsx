import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Biblioteca from "./pages/Biblioteca";

function App() {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  });

  const [telaCadastro, setTelaCadastro] = useState(false);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ token: null, role: null });
  }

  if (!user.token) {
    return telaCadastro ? (
      <Register onRegisterSuccess={() => setTelaCadastro(false)} />
    ) : (
      <Login setUser={setUser} irCadastro={() => setTelaCadastro(true)} />
    );
  }

  return <Biblioteca user={user} sair={sair} />;
}

export default App;
