import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/notesstate";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <div className="container">
            <Alert alert={alert} />

            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route
                path="/about"
                element={<About showAlert={showAlert} />}
              ></Route>
            </Routes>
            <Routes>
              <Route
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
