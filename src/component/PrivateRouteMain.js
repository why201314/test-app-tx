import { useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate,useLocation } from 'react-router-dom';
//import { Main } from "../pages/Main";

const PrivateRouteMain = () => {
  const { state } = useLocation();  
  useAuth(state['user'], state['pass']);
}
export default PrivateRouteMain;
