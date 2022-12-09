import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import Babyoverview from "./baby/Babyoverview";
import NewBaby from "./baby/NewBaby";
import BabyPage from "./baby/BabyPage";
import axios from "axios";
import Homepage from "./Homepage";
import styled from "styled-components";
import BabyGallery from "./baby/BabyGallery";


export default function App() {

    const [babies, setBabies] = React.useState([]);


    const getAllBabies = () => {
        axios.get("/api/babies")
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setBabies(data)
            })
            .catch((error) => {
                console.error("No Babies found! : " + error)
            })
    }
    useEffect(getAllBabies, [])
    console.log(babies)

    return <>
        <main>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/babyoverview"} element={<Babyoverview babies={babies}/>}/>
                <Route path={"/newbaby"} element={<NewBaby getAllBabies={getAllBabies}/>}/>
                <Route path={"/baby/:id"} element={<BabyPage babies={babies} getAllBabies={getAllBabies}/>}/>
                <Route path={"/babygallery/:id"} element={<BabyGallery babies={babies} getAllBabies={getAllBabies}/>}/>
            </Routes>
        </main>
        <footer><StyledP>© 2022 by Marc</StyledP></footer>

    </>;
}

const StyledP = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: var(--color-white);
`