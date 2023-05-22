import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import './App.css'
function App() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
