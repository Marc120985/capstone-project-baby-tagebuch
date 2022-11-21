import React from 'react';
import {Route, Routes} from "react-router";
import Babyoverview from "./Babyoverview";
import styled from "styled-components";


export default function App() {
  return <>
      <SyledHeader>
        <h1>Willkommen bei deinem Baby Tagebuch</h1>
      </SyledHeader>

      <main>
    <Routes>
      <Route path="/babyoverview" element={<Babyoverview/>}/>
    </Routes>

    </main>

    <footer></footer>
  </>;
}


const SyledHeader = styled.header`
display: flex;
justify-content: center;
h1 {font-family: ubuntu,sans-serif;}
`
