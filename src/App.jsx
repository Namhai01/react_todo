import { Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Home from "./Components/Home/Home";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" index element={<Home />}></Route>
    </Routes>
  );
}

export default App;
