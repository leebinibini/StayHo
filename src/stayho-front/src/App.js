import logo from './logo.svg';
import './App.css';
import {Routes} from "react-router-dom";
import Insert from "./room/Insert";
import Management from "./room/Management";

function App() {
  return (
    <div className="App">
      <Routes>

      </Routes>
      <Insert/>
        <Management/>
    </div>
  );
}

export default App;
