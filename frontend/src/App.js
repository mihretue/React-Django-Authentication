import SignUp from "./pages/SignUp";
import Successl from "./component/Successl";
import Success from "./component/Success";
import ProtectedRoute from "./component/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/successl" element={
          <ProtectedRoute>
            <Successl/>
          </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
