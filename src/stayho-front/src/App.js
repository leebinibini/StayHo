import './App.css';
import {Route, Routes} from "react-router-dom";
import ReservationAll from "./Reservation/user/ReservationAll";
import ReservationOne from "./Reservation/user/ReservationOne";
import ReservationInsert from "./Reservation/user/ReservationInsert";

function App() {
  return (
    <div>
        <Routes>
          <Route path={"/reservation/showAll"} element={<ReservationAll/>}/>
          <Route path={"/reservation/showOne/:id"} element={<ReservationOne/>}/>
          <Route path={"/reservation/insert"} element={<ReservationInsert/>}/>
        </Routes>
    </div>
  );
}

export default App;