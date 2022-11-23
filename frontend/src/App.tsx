import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import Babyoverview from "./Babyoverview";
import NewBaby from "./NewBaby";
import BabyPage from "./BabyPage";
import axios from "axios";
import Homepage from "./Homepage";


export default function App() {

    const [babies, setBabies] = React.useState([]);


    const getAllBabies = () => {
        axios.get("/api/baby")
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


    return <>
        <main>
            <Routes>
                <Route path={"/"} element={<Homepage/>}/>
                <Route path={"/babyoverview"} element={<Babyoverview babies={babies}/>}/>
                <Route path={"/newbaby"} element={<NewBaby getAllBabies={getAllBabies}/>}/>
                <Route path={"/baby/:id"} element={<BabyPage babies={babies}/>}/>
            </Routes>
        </main>

    </>;
}
