import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Todo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import { Routes } from "react-router-dom";
// import QRScanner from "./QRScanner";
// import BarScanner from "./BarcodeScanner";
// import BarcodeScannerComponent from "./BarcodeScannerComponent";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Todo />}></Route>
        {/* <Route path="/qrscanner" element={<QRScanner />}></Route>
        <Route path="/barScanner" element={<BarcodeScannerComponent />}></Route> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
