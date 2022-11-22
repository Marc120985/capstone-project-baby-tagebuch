import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Babyoverview() {
    const [babies, setBabies] = useState([])

    useEffect(() => {
        getAllBabys()
    }, [])


    const getAllBabys = () => {
        axios.get("/api/baby")
            .then((response) => {
                setBabies(response.data)
            })
            .catch((e) => console.log("GET ERROR: " + e))}



        return <>
            <h1>Baby Overview</h1>
            <section>
                <ul>{babies.map((baby: any) => <li><Link to={"/baby/" + baby.id}>{baby.name}</Link></li>)}</ul>
            </section>
            <Link to={"/newbaby"}>Neues Baby anlegen</Link><br/>
            <Link to={"/"}>Zurück zur Übersicht</Link><br/>
            </>;
    }


