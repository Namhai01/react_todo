import { Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Container from "./Components/TodoContainer/Container";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" index element={<Container />}></Route>
    </Routes>
  );
}

export default App;
