import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserList from "./pages/UserList";



function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/users" element={<UserList/>}/>
     </Routes>
    </>
  );
}

export default App;
