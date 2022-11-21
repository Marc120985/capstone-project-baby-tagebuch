import React from 'react';
import {Route, Routes} from "react-router";
import Babyoverview from "./Babyoverview";


export default function App() {
  return (
    <main >
    <Routes>
      <Route path="/babyoverview" element={<Babyoverview/>}/>


    </Routes>

    </main>
  );
}

