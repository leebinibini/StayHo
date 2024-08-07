import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./member/Auth";
import Register from "./member/Register";
import Update from "./member/Update";
import ShowList from "./hotel/ShowList";
import MyPage from "./member/MyPage";

function App() {
  return (
    <div className="App">
      <header className="App">
       <Routes>
         <Route path="/" element={<Auth/>}/>
         <Route path="/member/register" element={<Register/>}/>
           <Route path="/member/update" element={<Update/>}/>
           <Route path="/hotel/showList" element={<ShowList/>}/>
           <Route path="/member/myPage" element={<MyPage/>}/>
       </Routes>
      </header>
    </div>
  );
}

export default App;
