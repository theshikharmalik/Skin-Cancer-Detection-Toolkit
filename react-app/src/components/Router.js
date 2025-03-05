import React from "react";
import { Routes ,Route } from 'react-router-dom';
import Pyodide from "../python/pyodide";
import Dashboard from "./Dashboard";
import FileUpload from "./FileUpload"

import Login from "./Login";
import Register from './Register';
import Result from "./Result";
import ResultNew from "./ResultNew";
// import SimpleMap from "./SimpleMap";

export default function RouteTree() {
  return (
   
      <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/enroll' element={<Register/>} />
            {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
            <Route path='/dashboard' element={<FileUpload />} />
            <Route path='/result' element={<Result/>} />
            {/* <Route path='/result-new' element={<ResultNew/>} /> */}
            {/* <Route path='/g-map' element={<SimpleMap />} /> */}
          </Routes>
       
      </div>

  );
}

