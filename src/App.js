import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { useEffect } from "react";
import { checkLoginExpiration } from "./utils/auth";


function App() {
  useEffect(()=>{
    checkLoginExpiration();
  },[])
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
