import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
}

export default App;