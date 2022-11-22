import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import Babyoverview from "./Babyoverview";
import styled from "styled-components";
import NewBaby from "./NewBaby";
import { Link } from 'react-router-dom';
import BabyPage from "./BabyPage";
import axios from "axios";


export default function App() {

    const [babies, setBabies] = React.useState([]);

    useEffect(() => {
        axios.get("/api/baby")
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setBabies(data)
            })
            .catch((error) => {console.error("No Babies found! : " + error)
            })
    } , [])



  return <>
      <SyledHeader>
        <h1>Willkommen bei deinem Baby Tagebuch</h1>
      </SyledHeader>

      <main>
    <Routes>
      <Route path="/babyoverview" element={<Babyoverview babies={babies}/>}/>
        <Route path={"/newbaby"} element={<NewBaby/>}/>
        <Route path={"/baby/:id"} element={<BabyPage babies={babies}/>}/>
    </Routes>
    <Link to={"/babyoverview"}>Auswahl Baby</Link>
    </main>

    <footer></footer>
  </>;
}


const SyledHeader = styled.header`
display: flex;
justify-content: center;
h1 {font-family: ubuntu,sans-serif;}
`
