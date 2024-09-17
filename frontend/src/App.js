import SignUp from "./pages/SignUp";
import Successl from "./component/SuccessLogin";
import Success from "./component/Success";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/home" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>}/>
      <ForgetPassword path="/forget-password" element={<ForgetPassword/>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
